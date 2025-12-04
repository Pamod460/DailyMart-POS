
let cart = [];

function initCart() {
    const savedCart = localStorage.getItem('currentCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
    updateCartUI();
}

function addToCart(productId) {
    const product = getProductById(productId);
    if (!product) return;
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        if (existingItem.quantity >= product.stock) {
            Swal.fire({
                icon: 'warning',
                title: 'Stock Limit',
                text: `Only ${product.stock} units available`,
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000
            });
            return;
        }
        existingItem.quantity++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            stock: product.stock,
            image: product.image
        });
    }

    saveCart();
    updateCartUI();

    refreshProducts();

    Swal.fire({
        icon: 'success',
        title: 'Added to Cart',
        text: `${product.name} added to cart`,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500
    });
}

function updateCartQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    const newQuantity = item.quantity + change;

    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }

    if (newQuantity > item.stock) {
        Swal.fire({
            icon: 'warning',
            title: 'Stock Limit',
            text: `Only ${item.stock} units available`,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000
        });
        return;
    }

    item.quantity = newQuantity;
    saveCart();
    updateCartUI();

    refreshProducts();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();

    refreshProducts();
}

function clearCart() {
    if (cart.length === 0) return;

    Swal.fire({
        title: 'Clear Cart?',
        text: 'Are you sure you want to remove all items?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#4169E1',
        cancelButtonColor: '#6B7280',
        confirmButtonText: 'Yes, clear it'
    }).then((result) => {
        if (result.isConfirmed) {
            cart = [];
            saveCart();
            updateCartUI();

            refreshProducts();
            Swal.fire({
                icon: 'success',
                title: 'Cart Cleared',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500
            });
        }
    });
}

function saveCart() {
    localStorage.setItem('currentCart', JSON.stringify(cart));
}
function calculateTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    return { subtotal, tax, total };
}
function updateCartUI() {
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const { subtotal, tax, total } = calculateTotals();
    document.getElementById('cartCount').textContent = cartCount;
    document.getElementById('cartCountHeader').textContent = cartCount;
    document.getElementById('floatingCartBadge').textContent = cartCount;

    document.getElementById('cartSubtotal').textContent = formatPrice(subtotal);
    document.getElementById('cartTax').textContent = formatPrice(tax);
    document.getElementById('cartTotal').textContent = formatPrice(total);
    const checkoutBtn = document.getElementById('btnCheckout');
    checkoutBtn.disabled = cart.length === 0;

    renderCartItems();
}

function renderCartItems() {
    const container = document.getElementById('cartItems');

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="cart-empty">
                <i class="bi bi-cart-x"></i>
                <p>Your cart is empty</p>
            </div>
        `;
        return;
    }

    container.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}" onerror="this.src='https://picsum.photos/60/60?grayscale'">
            </div>
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${formatPrice(item.price)}</div>
                <div class="cart-item-controls">
                    <button class="btn-qty" onclick="updateCartQuantity('${item.id}', -1)">
                        <i class="bi bi-dash"></i>
                    </button>
                    <span class="cart-item-qty">${item.quantity}</span>
                    <button class="btn-qty" onclick="updateCartQuantity('${item.id}', 1)">
                        <i class="bi bi-plus"></i>
                    </button>
                    <button class="btn-remove" onclick="removeFromCart('${item.id}')">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function toggleCart() {
    const cartPanel = document.getElementById('cartPanel');
    cartPanel.classList.toggle('open');
}

function checkout() {
    if (cart.length === 0) return;

    Swal.fire({
        title: 'Select Customer',
        html: `
            <select id="customerSelect" class="swal2-input" style="width: 80%;">
                <option value="">Guest</option>
                ${getAllCustomers().map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
            </select>
        `,
        showCancelButton: true,
        confirmButtonColor: '#4169E1',
        confirmButtonText: 'Complete Order',
        preConfirm: () => {
            const customerId = document.getElementById('customerSelect').value;
            return customerId;
        }
    }).then((result) => {
        if (result.isConfirmed) {
            completeCheckout(result.value);
        }
    });
}

function completeCheckout(customerId) {
    const { total } = calculateTotals();
    const customer = customerId ? getCustomerById(customerId) : null;

    const order = {
        customer: customer ? customer.name : 'Guest',
        customerId: customerId || null,
        items: [...cart],
        itemsCount: cart.reduce((sum, item) => sum + item.quantity, 0),
        total: total
    };

    const savedOrder = addOrder(order);

    cart = [];
    saveCart();
    updateCartUI();

    toggleCart();

    Swal.fire({
        icon: 'success',
        title: 'Order Completed!',
        html: `
            <p><strong>Order ID:</strong> ${savedOrder.id}</p>
            <p><strong>Total:</strong> ${formatPrice(total)}</p>
        `,
        confirmButtonColor: '#4169E1'
    }).then(() => {
        if (document.getElementById('productsPage').classList.contains('active')) {
            initProducts();
        }
    });
}
