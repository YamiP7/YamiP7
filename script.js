document.addEventListener('DOMContentLoaded', function () {
    const productForm = document.getElementById('product-form');

    // Manejo del formulario para agregar productos
    productForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('product-name').value;
        const price = document.getElementById('product-price').value;
        const stock = document.getElementById('product-stock').value;
        const imageFile = document.getElementById('product-image').files[0];
        const category = document.getElementById('product-category').value;

        if (!imageFile) return;

        const reader = new FileReader();
        reader.onload = function (event) {
            const imageUrl = event.target.result;
            addProduct(name, price, stock, imageUrl, category);
        };
        reader.readAsDataURL(imageFile);

        productForm.reset();
    });

    // Función para agregar un producto a la categoría correspondiente
    function addProduct(name, price, stock, imageUrl, category) {
        const productGrid = document.getElementById(`${category}-grid`);
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');

        productItem.innerHTML = `
            <img src="${imageUrl}" alt="${name}">
            <h3>${name}</h3>
            <p>Precio: $${price}</p>
            <p>Stock: ${stock}</p>
            <button class="delete-button">Eliminar</button>
        `;

        // Agregar funcionalidad de eliminación
        productItem.querySelector('.delete-button').addEventListener('click', function () {
            productGrid.removeChild(productItem);
        });

        productGrid.appendChild(productItem);
    }
});
