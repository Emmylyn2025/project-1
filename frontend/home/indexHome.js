const data = JSON.parse(localStorage.getItem('realtoken'));

document.getElementById('header-home').innerText = `${data.username}, welcome to starlite home page`;