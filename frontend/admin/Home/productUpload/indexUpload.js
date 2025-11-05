function fileImage() {
  const fileLabel = document.getElementById('image-input');
  const fileInput = document.querySelector('.image-input');
  const fileName = document.getElementById('fileName');

  fileLabel.addEventListener('click', () => {
    fileInput.click();
  });

  fileInput.addEventListener('change', () => {
    fileName.textContent = fileInput.files[0]?.name || '';
  });
}

fileImage();

document.getElementById('form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData();

  const input1 = document.querySelector('.input1');
  const input2 = document.querySelector('.input2');
  const text = document.querySelector('.text');
  const image = document.querySelector('.image');

  const file = image.files[0];

  formData.append('image', file);

  const data = {
    productName: input1.value,
    productPrice: input2.value,
    productDescription: text.value
  }

  formData.append('details', JSON.stringify(data));

  const response = await fetch('http://localhost:3000/api/project/product', {
    method: 'POST',
    body: formData
  });

  const result = await response.json();
  console.log(result);
});