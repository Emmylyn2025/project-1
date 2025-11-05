const password = document.querySelector('.js-input');
const username = document.querySelector('.js-input-1');


function showPassword() {
  const box = document.getElementById('check');

  box.addEventListener('click', () => {
    if(box.checked === true) {
      password.type = 'text';
    } else{
      password.type = 'password';
    }
  });
}

showPassword();

document.getElementById('form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    username: username.value,
    password: password.value
  }

  try{

    const response = await fetch('http://localhost:3000/api/project/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    const result = await response.json();
    localStorage.setItem('token', result.token);


    const token = localStorage.getItem('token');
    const response2 = await fetch('http://localhost:3000/api/project/admin', {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    const result2 = await response2.json();
    localStorage.setItem('realtoken', JSON.stringify(result2.data));

    alert(`1.)${result.message}, 2.)${result2.message}`);

    username.value = '';
    password.value = '';


    if(result2.success === true) {
      window.location.href = '../Home/index.html';
    } else {
      window.location.href = './indexAdmin.html';
    }

    console.log(result2);
  } catch(error) {
    console.log(error);
  }
})