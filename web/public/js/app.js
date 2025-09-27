// web/public/js/app.js

function loadView(view) {
  fetch(view)
    .then(res => {
      if (!res.ok) throw new Error(`Erro ao carregar view: ${view}`);
      return res.text();
    })
    .then(html => {
      const appDiv = document.getElementById('app');
      appDiv.innerHTML = html;

      // Executa scripts embutidos na view carregada
      const scripts = appDiv.querySelectorAll('script');
      scripts.forEach(script => {
        eval(script.innerText);
      });
    })
    .catch(err => {
      console.error(err);
      document.getElementById('app').innerHTML = `
        <div class="text-danger p-3">
          Erro ao carregar a página: ${err.message}
        </div>`;
    });
}

// Verifica se o usuário está logado
const isLoggedIn = !!localStorage.getItem('token');

// Carrega a view correta
if (isLoggedIn) {
  loadView('/views/dashboard/dashboard.html');
} else {
  loadView('/views/auth/login.html');
}
