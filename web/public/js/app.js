// web/public/js/app.js
function loadView(view) {
  fetch(view)
    .then(res => res.text())
    .then(html => {
      document.getElementById('app').innerHTML = html;
      // Executa scripts embutidos na view carregada
      const scripts = document.getElementById('app').querySelectorAll('script');
      scripts.forEach(script => {
        eval(script.innerText);
      });
    });
}

const isLoggedIn = !!localStorage.getItem('token');
if (isLoggedIn) {
  loadView('/web/views/dashboard/dashboard.html');
} else {
  loadView('/web/views/auth/login.html');
}