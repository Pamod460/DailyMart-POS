function initializeDatabase() {
    if (!localStorage.getItem('products')) {
        localStorage.setItem('products', JSON.stringify(getSampleProducts()));
    }
    if (!localStorage.getItem('customers')) {
        localStorage.setItem('customers', JSON.stringify(getSampleCustomers()));
    }
    if (!localStorage.getItem('orders')) {
        localStorage.setItem('orders', JSON.stringify([]));
    }
    if (!localStorage.getItem('users')) {
        const testUsers = [
            {
                fullName: 'Test User 3',
                username: 'testuser3',
                email: 'testuser3@dailymart.com',
                password: 'Test1234!'
            },
            {
                fullName: 'Admin User',
                username: 'admin',
                email: 'admin@dailymart.com',
                password: 'Admin123!'
            }
        ];
        localStorage.setItem('users', JSON.stringify(testUsers));
    }
}
function getSampleProducts() {
    const UNSPLASH_API_KEY = 'PWbZhnAO4BvaIMBrPv6GwZPIGsj9rFn0vHVbMg0gIYw';

    return [
        { id: 'P001', name: 'Fresh Organic Milk', category: 'Dairy', price: 500.00, stock: 30, image: `https://images.unsplash.com/photo-1563636619-e9143da7973b?client_id=${UNSPLASH_API_KEY}&w=400&h=300&fit=crop` },
        { id: 'P002', name: 'Whole Wheat Bread', category: 'Bakery', price: 450.00, stock: 100, image: `https://images.unsplash.com/photo-1509440159596-0249088772ff?client_id=${UNSPLASH_API_KEY}&w=400&h=300&fit=crop` },
        { id: 'P003', name: 'Fresh Apples', category: 'Fruits', price: 150.00, stock: 75, image: `https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?client_id=${UNSPLASH_API_KEY}&w=400&h=300&fit=crop` },
        { id: 'P004', name: 'Chicken Breast', category: 'Meat', price: 1200.00, stock: 30, image: `https://images.unsplash.com/photo-1604503468506-a8da13d82791?client_id=${UNSPLASH_API_KEY}&w=400&h=300&fit=crop` },

        { id: 'P005', name: 'Orange Juice 1L', category: 'Beverages', price: 350.00, stock: 45, image: `https://images.unsplash.com/photo-1600271886742-f049cd451bba?client_id=${UNSPLASH_API_KEY}&w=400&h=300&fit=crop` },
        { id: 'P006', name: 'Coca Cola 500ml', category: 'Beverages', price: 120.00, stock: 200, image: `https://images.unsplash.com/photo-1554866585-cd94860890b7?client_id=${UNSPLASH_API_KEY}&w=400&h=300&fit=crop` },
        { id: 'P007', name: 'Mineral Water 1.5L', category: 'Beverages', price: 80.00, stock: 150, image: `https://images.unsplash.com/photo-1548839140-29a749e1cf4d?client_id=${UNSPLASH_API_KEY}&w=400&h=300&fit=crop` },

        { id: 'P008', name: 'Fresh Tomatoes', category: 'Vegetables', price: 180.00, stock: 60, image: `https://images.unsplash.com/photo-1546470427-e26264be0b0d?client_id=${UNSPLASH_API_KEY}&w=400&h=300&fit=crop` },
        { id: 'P009', name: 'Bananas (Dozen)', category: 'Fruits', price: 200.00, stock: 80, image: `https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?client_id=${UNSPLASH_API_KEY}&w=400&h=300&fit=crop` },
        { id: 'P010', name: 'Carrots 1kg', category: 'Vegetables', price: 150.00, stock: 50, image: `https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?client_id=${UNSPLASH_API_KEY}&w=400&h=300&fit=crop` },

        { id: 'P011', name: 'Croissants (6 pack)', category: 'Bakery', price: 600.00, stock: 25, image: `https://images.unsplash.com/photo-1555507036-ab1f4038808a?client_id=${UNSPLASH_API_KEY}&w=400&h=300&fit=crop` },
        { id: 'P012', name: 'Chocolate Cake', category: 'Bakery', price: 1500.00, stock: 15, image: `https://images.unsplash.com/photo-1578985545062-69928b1d9587?client_id=${UNSPLASH_API_KEY}&w=400&h=300&fit=crop` },

        { id: 'P013', name: 'Ground Beef 500g', category: 'Meat', price: 800.00, stock: 35, image: `https://images.unsplash.com/photo-1603048297172-c92544798d5a?client_id=${UNSPLASH_API_KEY}&w=400&h=300&fit=crop` },
        { id: 'P014', name: 'Fresh Fish Fillet', category: 'Meat', price: 1000.00, stock: 20, image: `https://images.unsplash.com/photo-1580959375944-0b6e7f6e5a6c?client_id=${UNSPLASH_API_KEY}&w=400&h=300&fit=crop` },

        { id: 'P015', name: 'Cheddar Cheese 200g', category: 'Dairy', price: 650.00, stock: 40, image: `https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?client_id=${UNSPLASH_API_KEY}&w=400&h=300&fit=crop` },
        { id: 'P016', name: 'Greek Yogurt 500g', category: 'Dairy', price: 400.00, stock: 55, image: `https://images.unsplash.com/photo-1488477181946-6428a0291777?client_id=${UNSPLASH_API_KEY}&w=400&h=300&fit=crop` },
        { id: 'P017', name: 'Eggs (Dozen)', category: 'Dairy', price: 350.00, stock: 100, image: `https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?client_id=${UNSPLASH_API_KEY}&w=400&h=300&fit=crop` },

        { id: 'P018', name: 'Rice 5kg', category: 'Groceries', price: 1200.00, stock: 45, image: `https://images.unsplash.com/photo-1586201375761-83865001e31c?client_id=${UNSPLASH_API_KEY}&w=400&h=300&fit=crop` },
        { id: 'P019', name: 'Pasta 500g', category: 'Groceries', price: 250.00, stock: 70, image: `https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?client_id=${UNSPLASH_API_KEY}&w=400&h=300&fit=crop` },
        { id: 'P020', name: 'Olive Oil 1L', category: 'Groceries', price: 900.00, stock: 30, image: `https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?client_id=${UNSPLASH_API_KEY}&w=400&h=300&fit=crop` }
    ];
}

function getSampleCustomers() {
    return [
        {
            id: 'C001',
            name: 'Ruwan Perera',
            phone: '0715886389',
            email: 'ruwan@gmail.com',
            createdAt: new Date('2025-11-15').toISOString()
        },
        {
            id: 'C002',
            name: 'Sachi Abeysekara',
            phone: '0771234567',
            email: 'sachi@gmail.com',
            createdAt: new Date('2025-11-20').toISOString()
        },
        {
            id: 'C003',
            name: 'Kamal Silva',
            phone: '0769876543',
            email: 'kamal@gmail.com',
            createdAt: new Date('2025-11-25').toISOString()
        }
    ];
}

function getAllProducts() {
    return JSON.parse(localStorage.getItem('products') || '[]');
}

function getProductById(id) {
    const products = getAllProducts();
    return products.find(p => p.id === id);
}

function getProductsByCategory(category) {
    const products = getAllProducts();
    if (category === 'All Products') return products;
    return products.filter(p => p.category === category);
}

function searchProducts(query) {
    const products = getAllProducts();
    const lowerQuery = query.toLowerCase();
    return products.filter(p =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.category.toLowerCase().includes(lowerQuery) ||
        p.id.toLowerCase().includes(lowerQuery)
    );
}

function addProduct(product) {
    const products = getAllProducts();
    const maxId = products.reduce((max, p) => {
        const num = parseInt(p.id.substring(1));
        return num > max ? num : max;
    }, 0);
    product.id = 'P' + String(maxId + 1).padStart(3, '0');
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
    return product;
}

function updateProduct(id, updatedProduct) {
    const products = getAllProducts();
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
        products[index] = { ...products[index], ...updatedProduct };
        localStorage.setItem('products', JSON.stringify(products));
        return true;
    }
    return false;
}

function deleteProduct(id) {
    const products = getAllProducts();
    const filtered = products.filter(p => p.id !== id);
    localStorage.setItem('products', JSON.stringify(filtered));
    return true;
}

function updateProductStock(id, quantity) {
    const products = getAllProducts();
    const product = products.find(p => p.id === id);
    if (product) {
        product.stock -= quantity;
        localStorage.setItem('products', JSON.stringify(products));
        return true;
    }
    return false;
}

function getCategories() {
    const products = getAllProducts();
    const categories = [...new Set(products.map(p => p.category))];
    return ['All Products', ...categories.sort()];
}



function getAllCustomers() {
    return JSON.parse(localStorage.getItem('customers') || '[]');
}

function getCustomerById(id) {
    const customers = getAllCustomers();
    return customers.find(c => c.id === id);
}

function searchCustomers(query) {
    const customers = getAllCustomers();
    const lowerQuery = query.toLowerCase();
    return customers.filter(c =>
        c.name.toLowerCase().includes(lowerQuery) ||
        c.phone.includes(query) ||
        c.email.toLowerCase().includes(lowerQuery)
    );
}

function addCustomer(customer) {
    const customers = getAllCustomers();
    const maxId = customers.reduce((max, c) => {
        const num = parseInt(c.id.substring(1));
        return num > max ? num : max;
    }, 0);
    customer.id = 'C' + String(maxId + 1).padStart(3, '0');
    customer.createdAt = new Date().toISOString();
    customers.push(customer);
    localStorage.setItem('customers', JSON.stringify(customers));
    return customer;
}

function updateCustomer(id, updatedCustomer) {
    const customers = getAllCustomers();
    const index = customers.findIndex(c => c.id === id);
    if (index !== -1) {
        customers[index] = { ...customers[index], ...updatedCustomer };
        localStorage.setItem('customers', JSON.stringify(customers));
        return true;
    }
    return false;
}

function deleteCustomer(id) {
    const customers = getAllCustomers();
    const filtered = customers.filter(c => c.id !== id);
    localStorage.setItem('customers', JSON.stringify(filtered));
    return true;
}

function getAllOrders() {
    return JSON.parse(localStorage.getItem('orders') || '[]');
}

function getOrderById(id) {
    const orders = getAllOrders();
    return orders.find(o => o.id === id);
}

function getOrdersByCustomer(customerId) {
    const orders = getAllOrders();
    return orders.filter(o => o.customerId === customerId);
}

function addOrder(order) {
    const orders = getAllOrders();
    const timestamp = Date.now();
    order.id = 'ORD-' + timestamp.toString().substring(5);
    order.date = new Date().toISOString();
    orders.unshift(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    order.items.forEach(item => {
        updateProductStock(item.id, item.quantity);
    });

    return order;
}

function searchOrders(query) {
    const orders = getAllOrders();
    const lowerQuery = query.toLowerCase();
    return orders.filter(o =>
        o.id.toLowerCase().includes(lowerQuery) ||
        o.customer.toLowerCase().includes(lowerQuery)
    );
}
initializeDatabase();
