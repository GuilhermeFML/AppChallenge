document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('farmacia-form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const endereco = document.getElementById('endereco').value;
        const horario = document.getElementById('horario').value;
        const produtos = document.getElementById('produtos').value;

        const novaFarmacia = {
            nome,
            endereco,
            horario,
            produtos
        };

        const farmacias = JSON.parse(localStorage.getItem('farmacias')) || [];
        farmacias.push(novaFarmacia);
        localStorage.setItem('farmacias', JSON.stringify(farmacias));

        alert('Farmácia cadastrada com sucesso!');
        window.location.href = 'index.html';
    });
});
