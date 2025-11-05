function showPassword() {
  const box = document.getElementById('check');
  const password = document.querySelector('.js-input');

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

  const input2 = document.querySelector('.js-input-2');
  const input1 = document.querySelector('.js-input');

  const data = {
    username: input2.value,
    password: input1.value
  }

  //Send data to backend
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
    alert(`${result.message}`);


    const token = localStorage.getItem('token');


    //Get decoded token from the backend
    const response2 = await fetch('http://localhost:3000/api/project/home', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    const result2 = await response2.json();

    localStorage.setItem('realtoken', JSON.stringify(result2.data));
    
    if(result2.success === true) {
      window.location.href = "../home/indexHome.html"
    } else {
      window.location.href = "./index.html"
    }
      

    input2.value = '';
    input1.value = '';
  } catch(error){
    console.log('Error', error);
  }
});
