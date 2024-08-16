document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            if (!email || !password) {
                alert('Por favor, preencha todos os campos.');
                return;
            }

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(user => user.email === email && user.password === password);

            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                alert('Login bem-sucedido!');
                window.location.href = 'index.html'; // Redireciona para a página principal após login
            } else {
                alert('Email ou senha incorretos.');
            }
        });
    }
});
