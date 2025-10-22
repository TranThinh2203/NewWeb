document.addEventListener('DOMContentLoaded', () => {
    const LOGGED_IN_USER_KEY = 'loggedInUser';
    const PRODUCTS_KEY = 'products';
    const CART_KEY = 'shoppingCart';

    const loggedInUser = JSON.parse(localStorage.getItem(LOGGED_IN_USER_KEY));
    if (!loggedInUser || loggedInUser.role !== 'user') {
        window.location.href = 'login.html';
        return;
    }

    const logoutBtn = document.getElementById('logoutBtn');
    const productList = document.getElementById('product-list');
    const cartCountEl = document.getElementById('cart-count');
    const toastMessage = document.getElementById('toast-message');

    function getCart() {
        return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    }

    function saveCart(cart) {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
        updateCartCount();
    }

    function updateCartCount() {
        const cart = getCart();
        const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartCountEl) {
            cartCountEl.textContent = totalCount;
        }
    }

    function showToast() {
        toastMessage.classList.add('show');
        setTimeout(() => {
            toastMessage.classList.remove('show');
        }, 2000);
    }

    function addToCart(productId) {
        let cart = getCart();
        const products = JSON.parse(localStorage.getItem(PRODUCTS_KEY)) || [];
        
        const itemIndex = cart.findIndex(item => item.id === productId);

        if (itemIndex > -1) {
            cart[itemIndex].quantity++;
        } else {
            const productToAdd = products.find(p => p.id === productId);
            if (productToAdd) {
                cart.push({ ...productToAdd, quantity: 1 });
            }
        }
        
        saveCart(cart);
        showToast();
    }

    function displayProducts() {
        const products = JSON.parse(localStorage.getItem(PRODUCTS_KEY)) || [];
        
        if (!productList) return;

        if (products.length === 0) {
            productList.innerHTML = '<p class="no-products-message">Hiện tại chưa có sản phẩm nào.</p>';
            return;
        }

        productList.innerHTML = products.map(product => `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" onerror="this.onerror=null;this.src='https://placehold.co/600x400/cccccc/ffffff?text=Image+Not+Found';">
                <div class="product-card-content">
                    <h3>${product.name}</h3>
                    <p class="price">${product.price.toLocaleString('vi-VN')} VNĐ</p>
                    <p>${product.description}</p>
                    <button class="btn btn-add-cart" data-id="${product.id}">Thêm vào giỏ</button>
                </div>
            </div>
        `).join('');
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem(LOGGED_IN_USER_KEY);
            window.location.href = 'login.html';
        });
    }

    if (productList) {
        productList.addEventListener('click', e => {
            if (e.target.classList.contains('btn-add-cart')) {
                const productId = parseInt(e.target.dataset.id);
                addToCart(productId);
            }
        });
    }

    displayProducts();
    updateCartCount();
});

