document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Validate input
            if (username === '' || password === '') {
                alert('Por favor, preencha todos os campos.');
                return;
            }

            // Call the API for login
            fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao fazer login. Verifique suas credenciais.');
                }
                return response.json();
            })
            .then(data => {
                // Handle successful login
                localStorage.setItem('token', data.token);
                window.location.href = 'dashboard.html';
            })
            .catch(error => {
                alert(error.message);
            });
        });
    }
});