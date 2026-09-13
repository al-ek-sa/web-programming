const canvas = document.getElementById('coordinatePlane');
const form = document.getElementById('form-data');
const output = document.getElementById('resultOutput');
const tbody = document.getElementById('resultBody');
const prevBtn = document.getElementById('prevPage');
const nextBtn = document.getElementById('nextPage');
const width = canvas.width;
const height = canvas.height;
let arr = [];
let count = 0;
const PAGE_SIZE = 10;

const ctx = canvas.getContext('2d');

function coordinateSystem() {
  ctx.clearRect(0, 0, width, height);
  ctx.save();

  const centerX = Math.floor(width / 2) + 0.5;
  const centerY = Math.floor(height / 2) + 0.5;

  ctx.translate(centerX, centerY);
  ctx.scale(1, -1);

  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 1;

  ctx.beginPath();
  ctx.moveTo(0, centerY);
  ctx.lineTo(0, -centerY);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(-centerX, 0);
  ctx.lineTo(centerX, 0);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(centerX-4, 0);
  ctx.lineTo(centerX-6, 4);
  ctx.moveTo(centerX-4, 0);
  ctx.lineTo(centerX-6, -4);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0, centerY);
  ctx.lineTo(-4, centerY-4);
  ctx.moveTo(0, centerY);
  ctx.lineTo(4, centerY-4);
  ctx.stroke();

  ctx.restore();
}

coordinateSystem();

function drawFigure(x, y, r) {
  ctx.save();
  const centerX = Math.floor(width / 2) + 0.5;
  const centerY = Math.floor(height / 2) + 0.5;

  ctx.translate(centerX, centerY);
  ctx.scale(1, -1);

  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 1;
  const a = Math.max(Math.max(Math.abs(x), Math.abs(y)), r);
  const lengthX = (centerX - 10) / a;
  const lengthY = (centerY - 10) / a;

  ctx.beginPath();
  ctx.moveTo(0, lengthY * r);
  ctx.lineTo(lengthX * r, lengthY * r);
  ctx.lineTo(lengthX * r, 0);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0, -lengthY * r);
  ctx.lineTo(-lengthX * r /2, 0);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(0, 0, lengthX * r, -Math.PI/2, 0);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(lengthX*x, lengthY*y, 2.75, 2*Math.PI, 0);
  ctx.fillStyle = 'white';
  ctx.fill();
  ctx.stroke();

  ctx.restore();
}

function addTable(r, x, y, result) {
  const now = new Date();

  const date = now.toLocaleDateString('ru-RU');
  const time = now.toLocaleTimeString('ru-RU');

  arr.unshift({
            r,
            x,
            y,
            result,
            time,
            date
  });
  count = 0;
  renderPage();
}

function renderPage(){
  tbody.innerHTML = '';

  const start = count * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const pageItems = arr.slice(start, end);

  for(const row of pageItems){
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${row.x}</td>
      <td>${row.y}</td>
      <td>${row.r}</td>
      <td>${row.result ? 'TRUE' : 'FALSE'}</td>
      <td>${row.time}</td>
      <td>${row.date}</td>
    `;
    tbody.appendChild(tr);
  }

  for(let i = pageItems.length; i < PAGE_SIZE; i++) {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>&nbsp;</td><td></td><td></td><td></td><td></td><td></td>`;
    tbody.appendChild(tr);
  }

  prevBtn.addEventListener('click', () => {
    if(count > 0) {
      count--;
      renderPage();
    }
  });

  nextBtn.addEventListener('click', () => {
    if ((count + 1) * PAGE_SIZE < arr.length) {
      count++;
      renderPage();
    }
  })
}

renderPage();

form.addEventListener('submit', function(event) {
  event.preventDefault();
  coordinateSystem();

  const formData = new FormData(form);

  const object = Object.fromEntries(formData);
  if(object['x-coordinate'].trim() === '' ||
    object['y-coordinate'].trim() === '' ||
    object['r-coordinate'].trim() === ''){
    output.textContent = 'Not all data has been entered';
    return;
  }

  const x = Number(object['x-coordinate']);
  const y = Number(object['y-coordinate']);
  const r = Number(object['r-coordinate']);

  let result = false;

  if(r < 0){
    output.textContent = 'The radius cannot be negative';
    return;
  }

  if(!Number.isFinite(x) ||
    !Number.isFinite(y) || !Number.isFinite(r)) {
    output.textContent = 'invalid data'
    return;
  }

  if (x >= 0 && y >= 0){
    result = (x <= r && y <= r);
  } else if (x > 0 && y < 0) {
    result = (x * x + y * y) <= r * r;
  } else if (x <= 0 && y <= 0){
    result = (2 * x + y) >= -r;
  }

  output.textContent = 'RESULT: ' + (result ? 'TRUE' : 'FALSE');
  drawFigure(x, y, r);
  addTable(r, x, y, result);
});
