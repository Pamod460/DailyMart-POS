let currentCategory = 'All Products';
let allProducts = [];
function initProducts() {
    allProducts = getAllProducts();
    renderCategories();
    renderProducts(allProducts);
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            if (query) {
                const results = searchProducts(query);
                renderProducts(results);
            } else {
                filterByCategory(currentCategory);
            }
        });
    }
}

function renderCategories() {
    const categories = getCategories();
    const container = document.getElementById('categoryFilters');

    container.innerHTML = categories.map(cat => `
        <button class="category-btn ${cat === currentCategory ? 'active' : ''}" 
                onclick="filterByCategory('${cat}')">
            ${cat}
        </button>
    `).join('');
}

function filterByCategory(category) {
    currentCategory = category;
    const products = getProductsByCategory(category);
    renderProducts(products);
    renderCategories();

    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.value = '';
}

function renderProducts(products) {
    const container = document.getElementById('productsGrid');

    if (products.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--gray-400);">
                <i class="bi bi-inbox" style="font-size: 4rem; display: block; margin-bottom: 1rem;"></i>
                <p>No products found</p>
            </div>
        `;
        return;
    }

    container.innerHTML = products.map(product => {
        const availableStock = getAvailableStock(product.id, product.stock);
        const isLowStock = availableStock < 20;
        const isOutOfStock = availableStock === 0;

        return `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                ${isLowStock && !isOutOfStock ? `<span class="product-badge">Stock: ${availableStock}</span>` : ''}
                ${isOutOfStock ? `<span class="product-badge" style="background: #EF4444;">Out of Stock</span>` : ''}
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <div class="product-name">${product.name}</div>
                <div class="product-footer">
                    <div>
                        <div class="product-price">${formatPrice(product.price)}</div>
                        <div class="product-stock ${isLowStock ? 'low' : ''}">
                            ${availableStock} available
                        </div>
                    </div>
                </div>
                <button class="btn-add-cart" onclick="addToCart('${product.id}')" 
                        ${isOutOfStock ? 'disabled' : ''}>
                    <i class="bi bi-cart-plus"></i> ${isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                </button>
            </div>
        </div>
    `;
    }).join('');
}

function getAvailableStock(productId, totalStock) {
    const savedCart = localStorage.getItem('currentCart');
    if (!savedCart) return totalStock;

    const cart = JSON.parse(savedCart);
    const cartItem = cart.find(item => item.id === productId);

    if (!cartItem) return totalStock;

    return totalStock - cartItem.quantity;
}

function formatPrice(price) {
    return `${price.toFixed(2)} LKR`;
}
function refreshProducts() {
    const productsPage = document.getElementById('productsPage');
    if (productsPage && productsPage.classList.contains('active')) {
        const products = getProductsByCategory(currentCategory);
        renderProducts(products);
    }
}

function showAddProductModal() {
    const modal = document.getElementById('addProductModal');
    modal.classList.add('active');
}

function closeAddProductModal() {
    const modal = document.getElementById('addProductModal');
    modal.classList.remove('active');
    document.getElementById('addProductForm').reset();
}

function handleAddProduct(event) {
    event.preventDefault();

    const name = document.getElementById('productName').value;
    const category = document.getElementById('productCategory').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const stock = parseInt(document.getElementById('productStock').value);
    const image = document.getElementById('productImage').value;

    const newProduct = {
        name,
        category,
        price,
        stock,
        image
    };

    try {
        addProduct(newProduct);

        allProducts = getAllProducts();
        if (currentCategory === 'All Products' || currentCategory === category) {
            renderProducts(currentCategory === 'All Products' ? allProducts : getProductsByCategory(currentCategory));
        }
        renderCategories();

        Swal.fire({
            icon: 'success',
            title: 'Product Added',
            text: `${name} has been added successfully!`,
            timer: 1500,
            showConfirmButton: false
        });

        closeAddProductModal();
    } catch (error) {
        console.error('Error adding product:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to add product. Please try again.'
        });
    }
}

window.onclick = function (event) {
    const modal = document.getElementById('addProductModal');
    if (event.target === modal) {
        closeAddProductModal();
    }
}
