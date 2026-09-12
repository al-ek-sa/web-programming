const canvas = document.getElementById('coordinatePlane');
const width = canvas.width;
const height = canvas.height;

const ctx = canvas.getContext('2d');

function coordinateSystem() {
  ctx.clearRect(0, 0, width, height);
  ctx.save();

  const centerX = Math.floor(width / 2) + 0.5;
  const centerY = Math.floor(height / 2) + 0.5;

  ctx.translate(centerX, centerY);

  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 1;

  ctx.beginPath();
  ctx.moveTo(0, centerY);
  ctx.lineTo(0, -centerY);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0, -centerY);
  ctx.lineTo(-3, -centerY+3);
  ctx.moveTo(0, -centerY);
  ctx.lineTo(3, -centerY+3);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(-centerX, 0);
  ctx.lineTo(centerX, 0);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(centerX, 0);
  ctx.lineTo(centerX-2, 2);
  ctx.moveTo(centerX, 0);
  ctx.lineTo(centerX-2, -2);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(-50, 0);
  ctx.lineTo(0, -60);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0, 35);
  ctx.lineTo(40, 35);
  ctx.moveTo(40, 35);
  ctx.lineTo(40, 0);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(0, 0, 60, 1.5*Math.PI, 2*Math.PI);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(50, 10, 0.5, 0, Math.PI * 2);
  ctx.stroke();


  ctx.restore();
}

coordinateSystem();
