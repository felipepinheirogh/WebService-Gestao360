// web/public/js/app.js
function loadView(view) {
  fetch(view)
    .then(res => {
      if (!res.ok) throw new Error(`Erro ao carregar view: ${view}`);
      return res.text();
    })
    .then(html => {
      document.getElementById('app').innerHTML = html;
      // Executa scripts embutidos na view carregada
      const scripts = document.getElementById('app').querySelectorAll('script');
      scripts.forEach(script => {
        eval(script.innerText);
      });
    })
    .catch(err => {
      console.error(err);
      document.getElementById('app').innerHTML = `<div class="text-danger p-3">Erro ao carregar a página.</div>`;
    });
}

// Verifica se o usuário está logado
const isLoggedIn = !!localStorage.getItem('token');

// Ajuste de paths: /views/ corresponde à pasta views servida pelo Express
if (isLoggedIn) {
  loadView('/views/dashboard/dashboard.html');
} else {
  loadView('/views/auth/login.html');
}
