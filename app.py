import os
from flask import Flask, render_template, request, redirect
import sqlite3

app = Flask(__name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATABASE = os.path.join(BASE_DIR, "database.db")

def init_db():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS marketing (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            mes TEXT,
            ventas INTEGER,
            crecimiento INTEGER,
            instagram INTEGER,
            tiktok INTEGER,
            facebook INTEGER
        )
    """)

    conn.commit()
    conn.close()

init_db()

# ---------------------------
# DASHBOARD
# ---------------------------
@app.route("/")
def dashboard():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM marketing")
    datos = cursor.fetchall()

    conn.close()

    return render_template("dashboard.html", datos=datos)


# ---------------------------
# ADMIN
# ---------------------------
@app.route("/admin", methods=["GET", "POST"])
def admin():
    if request.method == "POST":
        mes = request.form["mes"]
        ventas = request.form["ventas"]
        crecimiento = request.form["crecimiento"]
        instagram = request.form["instagram"]
        tiktok = request.form["tiktok"]
        facebook = request.form["facebook"]

        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()

        cursor.execute("""
            INSERT INTO marketing (mes, ventas, crecimiento, instagram, tiktok, facebook)
            VALUES (?, ?, ?, ?, ?, ?)
        """, (mes, ventas, crecimiento, instagram, tiktok, facebook))

        conn.commit()
        conn.close()

        return redirect("/")

    return render_template("admin.html")


if __name__ == "__main__":
    app.run(debug=True)
