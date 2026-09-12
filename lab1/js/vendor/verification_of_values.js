const form = document.getElementById('form-data');
const output = document.getElementById('resultOutput');

form.addEventListener('submit', function(event){
  event.preventDefault();

  const formData = new FormData(form);

  const object = Object.fromEntries(formData);

  var x = object['x-coordinate'];
  var y = object['y-coordinate'];
  var r = object['r-coordinate'];

  let result = false;

  if(x >= 0 && y >= 0){
    result = (x <= r && y <= r);
  } else if (x > 0 && y < 0) {
    result = (x * x + y * y) <= r * r;
  } else if (x <= 0 && y <= 0){
    result = (2 * x + y) >= -r;
  }

  output.textContent = 'RESULT: ' + (result ? 'TRUE' : 'FALSE');
});
