function initOrders() {
    renderOrders();

    const searchInput = document.getElementById('orderSearchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            if (query) {
                const results = searchOrders(query);
                renderOrders(results);
            } else {
                renderOrders();
            }
        });
    }
}

function renderOrders(orders = null) {
    const allOrders = orders || getAllOrders();
    const container = document.getElementById('ordersContainer');

    if (allOrders.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: var(--gray-400);">
                <i class="bi bi-receipt" style="font-size: 4rem; display: block; margin-bottom: 1rem;"></i>
                <p>No orders found</p>
            </div>
        `;
        return;
    }

    container.innerHTML = allOrders.map(order => `
        <div class="order-card">
            <div class="order-header">
                <div>
                    <div class="order-id">${order.id}</div>
                    <div class="order-date">${formatDate(order.date)}</div>
                </div>
            </div>
            <div class="order-customer">Customer: ${order.customer}</div>
            <div class="order-items-count">${order.itemsCount} items</div>
            <div class="order-footer">
                <div class="order-total">${formatPrice(order.total)}</div>
                <button class="btn-view" onclick="viewOrderDetails('${order.id}')">
                    <i class="bi bi-eye"></i> View Details
                </button>
            </div>
        </div>
    `).join('');
}

function viewOrderDetails(orderId) {
    const order = getOrderById(orderId);
    if (!order) return;

    const itemsHtml = order.items.map(item => `
        <tr>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${formatPrice(item.price)}</td>
            <td>${formatPrice(item.price * item.quantity)}</td>
        </tr>
    `).join('');

    Swal.fire({
        title: `Order ${order.id}`,
        html: `
            <div style="text-align: left;">
                <p><strong>Date:</strong> ${formatDate(order.date)}</p>
                <p><strong>Customer:</strong> ${order.customer}</p>
                <hr>
                <table style="width: 100%; margin-top: 1rem;">
                    <thead>
                        <tr>
                            <th style="text-align: left;">Item</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${itemsHtml}
                    </tbody>
                </table>
                <hr>
                <p style="text-align: right; font-size: 1.25rem; font-weight: bold;">
                    Total: ${formatPrice(order.total)}
                </p>
            </div>
        `,
        width: 600,
        confirmButtonColor: '#4169E1'
    });
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return date.toLocaleDateString('en-US', options);
}
