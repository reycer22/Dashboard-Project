const canvas = document.getElementById("ventasChart");
const ctx = canvas.getContext("2d");

// Datos ficticios (marketing)
const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"];
const ventas = [12000, 15000, 18000, 16000, 21000, 25000];

// Configuración
const maxVenta = Math.max(...ventas);
const chartHeight = 200;
const chartWidth = 700;
const barWidth = 80;
const gap = 30;

// Limpiar canvas
ctx.clearRect(0, 0, canvas.width, canvas.height);

// Dibujar ejes
ctx.beginPath();
ctx.moveTo(50, 20);
ctx.lineTo(50, 250);
ctx.lineTo(750, 250);
ctx.stroke();

// Dibujar barras
ventas.forEach((venta, index) => {
  const barHeight = (venta / maxVenta) * chartHeight;
  const x = 80 + index * (barWidth + gap);
  const y = 250 - barHeight;

  ctx.fillStyle = "#F2B705";
  ctx.fillRect(x, y, barWidth, barHeight);

  // Texto de ventas
  ctx.fillStyle = "#000";
  ctx.fillText(`$${venta}`, x + 10, y - 10);

  // Mes
  ctx.fillText(meses[index], x + 5, 270);
});

// ----------- GRÁFICA CIRCULAR PÚBLICO -----------


window.onload = function() {

const publicoCanvas = document.getElementById("publicoChart");
const publicoCtx = publicoCanvas.getContext("2d");

const mujeres = 60;
const hombres = 40;

const total = mujeres + hombres;

const anguloMujeres = (mujeres / total) * 2 * Math.PI;
const anguloHombres = (hombres / total) * 2 * Math.PI;

// Mujeres
publicoCtx.beginPath();
publicoCtx.moveTo(200, 150);
publicoCtx.fillStyle = "#F2B705";
publicoCtx.arc(200, 150, 100, 0, anguloMujeres);
publicoCtx.fill();

// Hombres
publicoCtx.beginPath();
publicoCtx.moveTo(200, 150);
publicoCtx.fillStyle = "#333333";
publicoCtx.arc(200, 150, 100, anguloMujeres, anguloMujeres + anguloHombres);
publicoCtx.fill();


// ------------------------
// GRÁFICA DE CRECIMIENTO (LÍNEA)
// ------------------------

const crecimientoCanvas = document.getElementById("crecimientoChart");
const crecimientoCtx = crecimientoCanvas.getContext("2d");

const crecimiento = [5, 8, 12, 10, 15, 18];

crecimientoCtx.beginPath();
crecimientoCtx.moveTo(50, 250 - crecimiento[0] * 10);

crecimiento.forEach((valor, index) => {
    const x = 50 + index * 90;
    const y = 250 - valor * 10;

    crecimientoCtx.lineTo(x, y);
});

crecimientoCtx.strokeStyle = "#F2B705";
crecimientoCtx.lineWidth = 3;
crecimientoCtx.stroke();

// Dibujar puntos
crecimiento.forEach((valor, index) => {
    const x = 50 + index * 90;
    const y = 250 - valor * 10;

    crecimientoCtx.beginPath();
    crecimientoCtx.arc(x, y, 5, 0, 2 * Math.PI);
    crecimientoCtx.fillStyle = "#333";
    crecimientoCtx.fill();

    crecimientoCtx.fillStyle = "#000";
    crecimientoCtx.fillText(valor + "%", x - 10, y - 10);
});

// ------------------------
// GRÁFICA REDES SOCIALES (BARRAS MÚLTIPLES)
// ------------------------

const redesCanvas = document.getElementById("redesChart");
const redesCtx = redesCanvas.getContext("2d");

const redes = [
    { nombre: "Instagram", seguidores: 80 },
    { nombre: "TikTok", seguidores: 65 },
    { nombre: "Facebook", seguidores: 50 }
];

const baseY = 300;
const startX = 100;
const barWidth = 80;
const espacio = 150;

redes.forEach((red, index) => {
    const altura = red.seguidores * 2;  // Escala visual
    const x = startX + index * espacio;
    const y = baseY - altura;

    // Barra
    redesCtx.fillStyle = "#F2B705";
    redesCtx.fillRect(x, y, barWidth, altura);

    // Texto porcentaje
    redesCtx.fillStyle = "#000";
    redesCtx.fillText(red.seguidores + "%", x + 20, y - 10);

    // Nombre red
    redesCtx.fillText(red.nombre, x + 5, baseY + 20);
});

};