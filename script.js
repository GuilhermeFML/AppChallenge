document.addEventListener("DOMContentLoaded", function () {
    // Verificar autenticação
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
        alert('Você precisa estar logado para acessar esta página.');
        window.location.href = 'login.html';
        return;
    }

    const form = document.getElementById('product-form');
    const productList = document.getElementById('product-list');

    function loadProducts() {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        products.forEach((product, index) => addProductToDOM(product, index));
    }

    function addProductToDOM(product, index) {
        const li = document.createElement('li');
        li.classList.add('product-item');

        const ul = document.createElement('ul');
        ul.classList.add('product-details');

        const nameLi = document.createElement('li');
        nameLi.textContent = `Nome: ${product.name}`;
        ul.appendChild(nameLi);

        const emailLi = document.createElement('li');
        emailLi.textContent = `Email: ${product.email}`;
        ul.appendChild(emailLi);

        const productToTradeLi = document.createElement('li');
        productToTradeLi.textContent = `Produto que vai trocar: ${product.productToTrade}`;
        ul.appendChild(productToTradeLi);

        const productNeededLi = document.createElement('li');
        productNeededLi.textContent = `Produto que precisa: ${product.productNeeded}`;
        ul.appendChild(productNeededLi);

        const messageLi = document.createElement('li');
        messageLi.textContent = `Mensagem: ${product.message}`;
        ul.appendChild(messageLi);

        const statusSpan = document.createElement('span');
        statusSpan.textContent = `Status: ${product.status}`;
        ul.appendChild(statusSpan);

        const toggleStatusButton = document.createElement('button');
        toggleStatusButton.textContent = product.status === 'Recebido' ? 'Finalizar' : 'Reverter';
        toggleStatusButton.addEventListener('click', function () {
            toggleStatus(index);
        });
        ul.appendChild(toggleStatusButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Apagar';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', function () {
            deleteProduct(index);
        });
        ul.appendChild(deleteButton);

        li.appendChild(ul);
        productList.appendChild(li);
    }

    function toggleStatus(index) {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        products[index].status = products[index].status === 'Recebido' ? 'Finalizado' : 'Recebido';
        localStorage.setItem('products', JSON.stringify(products));
        renderProducts();
    }

    function deleteProduct(index) {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        products.splice(index, 1);
        localStorage.setItem('products', JSON.stringify(products));
        renderProducts();
    }

    function renderProducts() {
        productList.innerHTML = '';
        loadProducts();
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const address = formData.get('address');
        const productToTrade = formData.get('product-to-trade');
        const productNeeded = formData.get('product-needed');
        const message = formData.get('message');
        const receipt = formData.get('receipt');

        if (!name || !email || !productToTrade || !productNeeded || !message) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        const newProduct = {
            name,
            email,
            address,
            productToTrade,
            productNeeded,
            message,
            receipt: receipt ? receipt.name : '',
            status: 'Recebido'
        };

        const products = JSON.parse(localStorage.getItem('products')) || [];
        products.push(newProduct);
        localStorage.setItem('products', JSON.stringify(products));
        renderProducts();
        alert('Formulário enviado com sucesso!');
        form.reset();
    });

    loadProducts();
});
