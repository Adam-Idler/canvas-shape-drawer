const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight;
ctx.shadowOffsetX = 5;
ctx.shadowOffsetY = 5;
let hue = 0;
let drawing = false;

function drawShape(item) {
    // console.log(item);
    const {
      x, 
      y, 
      fillColor, 
      radius, 
      n, 
      inset, 
      lineWidth, 
      strokeColor, 
      shadowColor, 
      shadowBlur
    } = item;

    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = lineWidth;
    ctx.fillStyle = fillColor;
    ctx.shadowBlur = shadowBlur;
    ctx.shadowColor = shadowColor;

    ctx.beginPath();
    ctx.save();
    ctx.translate(x, y);
    ctx.moveTo(0, 0 - radius);

    for (let i = 0; i < n; i++) {
      ctx.rotate(Math.PI / n);
      ctx.lineTo(0, 0 - radius * inset);
      ctx.rotate(Math.PI / n);
      ctx.lineTo(0, 0 - radius);
    }

    ctx.restore();
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
}

ctx.save();
ctx.translate(canvas.width - 50 - settings[0].radius * settings[0].inset, 50 + settings[0].radius * settings[0].inset);
settings.forEach(item => {
  drawShape(item);
});
ctx.restore();

document.addEventListener('changesettings', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.translate(canvas.width - 50 - settings[0].radius * settings[0].inset, 50 + settings[0].radius * settings[0].inset);
  settings.forEach(item => {
    drawShape(item);
  });
  ctx.restore();
})


let angle = 0;
document.addEventListener('mousemove', (e) => {
  if (!drawing) return;
  ctx.save();
  ctx.translate(e.x, e.y);
  ctx.rotate(angle);
  // hue++;
  angle += 0.2;
  settings.forEach(item => {
    drawShape(item);
  });

  ctx.restore();
});

document.addEventListener('mousedown', () => {
  drawing = true;
});

document.addEventListener('mouseup', () => {
  drawing = false
});
