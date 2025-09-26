// URL base da API
const API_BASE = '/api';

// Login
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simulação de login (substituir por JWT real)
    if (username && password) {
      localStorage.setItem('user', username);
      window.location.href = 'dashboard.html';
    } else {
      document.getElementById('message').innerText = 'Usuário ou senha inválidos';
    }
  });
}

// Dashboard
const btnLoad = document.getElementById('btnLoadExamples');
if (btnLoad) {
  btnLoad.addEventListener('click', async () => {
    const list = document.getElementById('list');
    list.innerHTML = '';
    try {
      const res = await fetch(`${API_BASE}/examples`);
      const data = await res.json();
      if (data.success) {
        data.items.forEach(item => {
          const li = document.createElement('li');
          li.textContent = JSON.stringify(item);
          list.appendChild(li);
        });
      } else {
        alert('Erro ao carregar exemplos');
      }
    } catch (err) {
      console.error(err);
      alert('Erro de conexão com a API');
    }
  });
}

// Logout
const btnLogout = document.getElementById('btnLogout');
if (btnLogout) {
  btnLogout.addEventListener('click', () => {
    localStorage.removeItem('user');
    window.location.href = 'index.html';
  });
}
