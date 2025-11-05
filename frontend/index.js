
document.getElementById('form').addEventListener('submit', async (e) => {

  e.preventDefault();

  const username = document.querySelector('.input-1');
  const email = document.querySelector('.input-2');
  const password = document.querySelector('.input-3');

  const data = {
    username: username.value,
    email: email.value,
    password: password.value
  }

  try{
  const res = await fetch('http://localhost:3000/api/project/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  const result = await res.json();
  alert(`${result.message}`);
  } catch(error) {
    console.log("Error", error);
  }

  username.value = '';
  email.value = '';
  password.value = '';
});



function showPassword() {
const box = document.getElementById('box');
const password = document.querySelector('.input-3');

box.addEventListener('click', () => {
  if(box.checked === true) {
    password.type = 'text';
  } else{
    password.type = 'password';
  }
})
}

showPassword();

