document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById('register-form');

    if (registerForm) {
        registerForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;

            if (!email || !password) {
                alert('Por favor, preencha todos os campos.');
                return;
            }

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const existingUser = users.find(user => user.email === email);

            if (existingUser) {
                alert('Email já cadastrado.');
                return;
            }

            const newUser = { email, password };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            alert('Registro bem-sucedido!');
            window.location.href = 'login.html'; // Redireciona para a página de login após o registro
        });
    }
});
