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
