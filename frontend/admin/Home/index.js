const data = JSON.parse(localStorage.getItem('realtoken'));

document.getElementById('header-welcome').innerText = `Admin ${data.username}, you are welcome`