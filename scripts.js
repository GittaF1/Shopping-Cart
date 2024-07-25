document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const products = [
        { id: 1, name: 'Succulent 1', price: 10, img: 'images/succulent1.jpg' },
        { id: 2, name: 'Succulent 2', price: 12, img: 'images/succulent2.jpg' },
        { id: 3, name: 'Fern 1', price: 15, img: 'images/fern1.jpg' },
        { id: 4, name: 'Fern 2', price: 18, img: 'images/fern2.jpg' },
        { id: 5, name: 'Cactus 1', price: 20, img: 'images/cactus1.jpg' },
        { id: 6, name: 'Cactus 2', price: 22, img: 'images/cactus2.jpg' }
    ];

    const cartCountElement = document.getElementById('cart-count');

    if (document.body.contains(document.querySelector('.product-list'))) {
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', () => {
                const productId = parseInt(button.parentElement.dataset.id);
                const product = products.find(p => p.id === productId);
                cart.push(product);
                button.disabled = true;
                updateCartCount();
            });
        });
    }

    if (document.body.contains(document.getElementById('cart-items'))) {
        updateCart();
    }

    function updateCartCount() {
        cartCountElement.textContent = cart.length;
    }

    function updateCart() {
        const cartItemsElement = document.getElementById('cart-items');
        cartItemsElement.innerHTML = '';
        const cartSummary = cart.reduce((summary, product) => {
            const productSummary = summary.find(item => item.id === product.id);
            if (productSummary) {
                productSummary.quantity++;
            } else {
                summary.push({ ...product, quantity: 1 });
            }
            return summary;
        }, []);

        cartSummary.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            cartItemElement.innerHTML = `
                <img src="${item.img}" alt="${item.name}">
                <h4>${item.name}</h4>
                <p>$${item.price}</p>
                <p>Quantity: ${item.quantity}</p>
                <button class="increase" data-id="${item.id}">+</button>
                <button class="decrease" data-id="${item.id}">-</button>
                <button class="delete" data-id="${item.id}">Delete</button>
            `;
            cartItemsElement.appendChild(cartItemElement);
        });

        updateCartSummary();

        const increaseButtons = document.querySelectorAll('.increase');
        const decreaseButtons = document.querySelectorAll('.decrease');
        const deleteButtons = document.querySelectorAll('.delete');

        increaseButtons.forEach(button => {
            button.addEventListener('click', () => {
                const productId = parseInt(button.dataset.id);
                cart.push(products.find(p => p.id === productId));
                updateCart();
            });
        });

        decreaseButtons.forEach(button => {
            button.addEventListener('click', () => {
                const productId = parseInt(button.dataset.id);
                const productIndex = cart.findIndex(p => p.id === productId);
                if (productIndex > -1) {
                    cart.splice(productIndex, 1);
                }
                updateCart();
            });
        });

        deleteButtons.forEach(button => {
            button.addEventListener('click', () => {
                const productId = parseInt(button.dataset.id);
                const productIndex = cart.findIndex(p => p.id === productId);
                while (productIndex > -1) {
                    cart.splice(productIndex, 1);
                }
                updateCart();
            });
        });
    }

    function updateCartSummary() {
        const totalItemsElement = document.getElementById('total-items');
        const totalCostElement = document.getElementById('total-cost');

        totalItemsElement.textContent = cart.length;
        totalCostElement.textContent = cart.reduce((total, product) => total + product.price, 0).toFixed(2);
    }

    const checkoutButton = document.getElementById('checkout-button');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            alert('Coming Soon');
        });
    }
});
