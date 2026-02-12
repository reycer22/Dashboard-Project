window.addEventListener("load", () => {
  console.log("JS cargado");
  console.log("Datos recibidos:", datosBackend);

  if (Array.isArray(datosBackend) && datosBackend.length > 0) {
    const ventasArray = datosBackend.map(f => f[2]);
    const crecimientoArray = datosBackend.map(f => f[3]);

    const totalVentas = ventasArray.reduce((a,b)=>a+b,0);
    const promedioCrecimiento = Math.round(
      crecimientoArray.reduce((a,b)=>a+b,0) / crecimientoArray.length
    );

    document.getElementById("totalVentas").innerText =
      "$" + totalVentas.toLocaleString();
    document.getElementById("promCrecimiento").innerText =
      "+" + promedioCrecimiento + "%";
  } else {
    console.warn("datosBackend vacío o indefinido");
  }

  initVentasChart();
  initPublicoChart();
  initCrecimientoChart();
  initRedesChart();
});



// ------------------------
// BARRAS VENTAS ANIMADAS
// ------------------------
function initVentasChart() {
  const canvas = document.getElementById("ventasChart");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

 if (!datosBackend || datosBackend.length === 0) return;

const meses = datosBackend.map(f => f[1]);
const ventas = datosBackend.map(f => f[2]);


  const maxVenta = Math.max(...ventas);
  const chartHeight = 200;
  const barWidth = 80;
  const gap = 30;

  let progress = 0;          // 0–1
  let startTime = null;
  const duration = 5000;     // 5 segundos para animar
  const pause = 2000;        // 2 segundos de pausa al final

  function draw(p) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Ejes
    ctx.beginPath();
    ctx.moveTo(50, 20);
    ctx.lineTo(50, 250);
    ctx.lineTo(750, 250);
    ctx.stroke();

    // Barras
    ventas.forEach((venta, index) => {
      const barHeightFull = (venta / maxVenta) * chartHeight;
      const barHeight = barHeightFull * p;
      const x = 80 + index * (barWidth + gap);
      const y = 250 - barHeight;

      ctx.fillStyle = "#F2B705";
      ctx.fillRect(x, y, barWidth, barHeight);

      ctx.fillStyle = "#000";
      if (p > 0.1) {
        ctx.fillText(`$${venta}`, x + 10, y - 10);
      }
      ctx.fillText(meses[index], x + 5, 270);
    });
  }

  function animate(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    progress = elapsed / duration;

    if (progress >= 1) {
      // Deja el gráfico completo visible
      draw(1);

      // Pausa y reinicio del ciclo
      setTimeout(() => {
        startTime = null;
        progress = 0;
        requestAnimationFrame(animate);
      }, pause);

      return; // Salimos de este frame para que no siga
    }

    draw(progress);
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

// Llama a esto cuando cargue la página
window.addEventListener("load", () => {
  initVentasChart();
});
// ------------------------
// PASTEL PÚBLICO ANIMADO
// ------------------------
function initPublicoChart() {
  const publicoCanvas = document.getElementById("publicoChart");
  if (!publicoCanvas) return;
  const publicoCtx = publicoCanvas.getContext("2d");

  const mujeres = 60;
  const hombres = 40;
  const total = mujeres + hombres;

  const anguloMujeres = (mujeres / total) * 2 * Math.PI;
  const anguloHombres = (hombres / total) * 2 * Math.PI;

  let progress = 0;
  let startTime = null;
  const duration = 5000;
  const pause = 2000;
  
  function draw(progress) {
    publicoCtx.clearRect(0, 0, publicoCanvas.width, publicoCanvas.height);

    const cx = 200;
    const cy = 150;
    const r = 100;

    const mujeresEnd = anguloMujeres * progress;
    const hombresEnd = anguloMujeres + anguloHombres * progress;

    // Mujeres
    publicoCtx.beginPath();
    publicoCtx.moveTo(cx, cy);
    publicoCtx.fillStyle = "#F2B705";
    publicoCtx.arc(cx, cy, r, 0, mujeresEnd);
    publicoCtx.fill();

    // Hombres
    if (progress > 0) {
      publicoCtx.beginPath();
      publicoCtx.moveTo(cx, cy);
      publicoCtx.fillStyle = "#333333";
      publicoCtx.arc(cx, cy, r, anguloMujeres, hombresEnd);
      publicoCtx.fill();
    }
  }

  function animate(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    progress = Math.min(elapsed / duration, 1);

    draw(progress);

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }

  function drawLabels() {
    const cx = 200;
    const cy = 150;

    // Mujeres 60%
    publicoCtx.save();
    publicoCtx.fillStyle = "#3d2f06";
    publicoCtx.font = "bold 18px Arial";
    publicoCtx.textAlign = "center";
    publicoCtx.textBaseline = "middle";
    publicoCtx.fillText("60%", cx - 45, cy - 25);
    
    // Hombres 40%
    publicoCtx.fillStyle = "#333333";
    publicoCtx.fillText("40%", cx + 45, cy + 25);
    publicoCtx.restore();

    // Etiquetas
    publicoCtx.save();
    publicoCtx.fillStyle = "#000";
    publicoCtx.font = "14px Arial";
    publicoCtx.textAlign = "center";
    publicoCtx.textBaseline = "middle";
    
    publicoCtx.fillText("Mujeres", cx - 45, cy + 45);
    publicoCtx.fillText("Hombres", cx + 45, cy - 45);
    publicoCtx.restore();
  }

  // Dibuja etiquetas cuando termine la animación
  setTimeout(() => {
    drawLabels();
    // Redibuja las etiquetas cada 30 segundos para que no se borren
    setInterval(drawLabels, 30000);
  }, 5200);

  requestAnimationFrame(animate);
}


// ------------------------
// LÍNEA CRECIMIENTO ANIMADA
// ------------------------
function initCrecimientoChart() {
  const crecimientoCanvas = document.getElementById("crecimientoChart");
  if (!crecimientoCanvas) return;
  const crecimientoCtx = crecimientoCanvas.getContext("2d");

  const crecimiento = datosBackend.map(f => f[3]);

  let progress = 0;          // 0–1
  let startTime = null;
  const duration = 5000;     // 5 segundos para animar
  const pause = 2000;        // 2 segundos de pausa al final

  function draw(progress) {
    crecimientoCtx.clearRect(0, 0, crecimientoCanvas.width, crecimientoCanvas.height);

    crecimientoCtx.beginPath();

    const totalSegments = crecimiento.length - 1;
    const totalProgress = progress * totalSegments;
    const currentSegment = Math.floor(totalProgress);
    const segmentProgress = totalProgress - currentSegment;

    const x0 = 50;
    const stepX = 90;

    let xPrev = x0;
    let yPrev = 250 - crecimiento[0] * 10;
    crecimientoCtx.moveTo(xPrev, yPrev);

    for (let i = 1; i <= currentSegment; i++) {
      const x = x0 + i * stepX;
      const y = 250 - crecimiento[i] * 10;
      crecimientoCtx.lineTo(x, y);
      xPrev = x;
      yPrev = y;
    }

    if (currentSegment < totalSegments) {
      const nextIndex = currentSegment + 1;
      const xNext = x0 + nextIndex * stepX;
      const yNext = 250 - crecimiento[nextIndex] * 10;

      const xPartial = xPrev + (xNext - xPrev) * segmentProgress;
      const yPartial = yPrev + (yNext - yPrev) * segmentProgress;
      crecimientoCtx.lineTo(xPartial, yPartial);
    }

    crecimientoCtx.strokeStyle = "#F2B705";
    crecimientoCtx.lineWidth = 3;
    crecimientoCtx.stroke();

    if (progress >= 1) {
      crecimiento.forEach((valor, index) => {
        const x = x0 + index * stepX;
        const y = 250 - valor * 10;

        crecimientoCtx.beginPath();
        crecimientoCtx.arc(x, y, 5, 0, 2 * Math.PI);
        crecimientoCtx.fillStyle = "#333";
        crecimientoCtx.fill();

        crecimientoCtx.fillStyle = "#000";
        crecimientoCtx.fillText(valor + "%", x - 10, y - 10);
      });
    }
  }

  function animate(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    progress = Math.min(elapsed / duration, 1);

    draw(progress);

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}

// ------------------------
// BARRAS REDES ANIMADAS
// ------------------------
function initRedesChart() {
  const redesCanvas = document.getElementById("redesChart");
  if (!redesCanvas) return;
  const redesCtx = redesCanvas.getContext("2d");

 const instagram = promedio(datosBackend.map(f => f[4]));
const tiktok = promedio(datosBackend.map(f => f[5]));
const facebook = promedio(datosBackend.map(f => f[6]));

const presenciaEl = document.getElementById("presenciaRedes");
  if (presenciaEl) {
    const promedioTotal = Math.round((instagram + tiktok + facebook) / 3);
    presenciaEl.innerText = promedioTotal + "% promedio";
  }

function promedio(arr){
    return Math.round(arr.reduce((a,b)=>a+b,0)/arr.length);
}

const redes = [
  { nombre: "Instagram", seguidores: instagram },
  { nombre: "TikTok", seguidores: tiktok },
  { nombre: "Facebook", seguidores: facebook }
];


  const baseY = 300;
  const startX = 100;
  const barWidth = 80;
  const espacio = 150;

  let progress = 0;          // 0–1
  let startTime = null;
  const duration = 5000;     // 5 segundos para animar
  const pause = 2000;        // 2 segundos de pausa al final

  function draw(progress) {
    redesCtx.clearRect(0, 0, redesCanvas.width, redesCanvas.height);

    redes.forEach((red, index) => {
      const alturaFull = red.seguidores * 2;
      const altura = alturaFull * progress;
      const x = startX + index * espacio;
      const y = baseY - altura;

      redesCtx.fillStyle = "#F2B705";
      redesCtx.fillRect(x, y, barWidth, altura);

      redesCtx.fillStyle = "#000";
      if (progress > 0.1) {
        redesCtx.fillText(red.seguidores + "%", x + 20, y - 10);
      }
      redesCtx.fillText(red.nombre, x + 5, baseY + 20);
    });
  }

  function animate(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    progress = Math.min(elapsed / duration, 1);

    draw(progress);

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}

// ------------------------
// INICIALIZAR TODO
// ------------------------
window.addEventListener("load", () => {
  initVentasChart();
  initPublicoChart();
  initCrecimientoChart();
  initRedesChart();
});
