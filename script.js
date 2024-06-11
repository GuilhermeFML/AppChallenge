document.addEventListener("DOMContentLoaded", function() {
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

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Apagar';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', function() {
            deleteProduct(index);
        });
        
        li.appendChild(ul);
        li.appendChild(deleteButton);
        productList.appendChild(li);
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

    form.addEventListener('submit', function(event) {
        event.preventDefault(); 
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const productToTrade = formData.get('product-to-trade');
        const productNeeded = formData.get('product-needed');
        const message = formData.get('message');
     
        if (!name || !email || !productToTrade || !productNeeded || !message) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        
        const newProduct = { name, email, productToTrade, productNeeded, message };   
        const products = JSON.parse(localStorage.getItem('products')) || [];
        products.push(newProduct);
        localStorage.setItem('products', JSON.stringify(products));
        renderProducts();
        alert('Formulário enviado com sucesso!');       
        form.reset();
    }); 

    loadProducts();
});
