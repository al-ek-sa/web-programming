const form = document.getElementById('form-data');
const output = document.getElementById('resultOutput');

form.addEventListener('submit', function(event) {
  event.preventDefault();

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
});
