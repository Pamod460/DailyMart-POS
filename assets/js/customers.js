function initCustomers() {
    renderCustomers();
}
function renderCustomers() {
    const customers = getAllCustomers();
    const tbody = document.getElementById('customersTableBody');

    if (customers.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="4" style="text-align: center; padding: 3rem; color: var(--gray-400);">
                    <i class="bi bi-people" style="font-size: 3rem; display: block; margin-bottom: 1rem;"></i>
                    No customers found
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = customers.map(customer => `
        <tr>
            <td>${customer.name}</td>
            <td>${customer.phone}</td>
            <td>${customer.email}</td>
            <td>
                <div class="action-btns">
                    <button class="btn-icon btn-edit" onclick="editCustomer('${customer.id}')" title="Edit">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn-icon btn-delete" onclick="deleteCustomerConfirm('${customer.id}')" title="Delete">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}
function showAddCustomerModal() {
    Swal.fire({
        title: 'Add New Customer',
        html: `
            <input id="customerName" class="swal2-input" placeholder="Full Name" required>
            <input id="customerPhone" class="swal2-input" placeholder="Phone Number" required>
            <input id="customerEmail" class="swal2-input" type="email" placeholder="Email Address" required>
        `,
        showCancelButton: true,
        confirmButtonColor: '#4169E1',
        confirmButtonText: 'Add Customer',
        preConfirm: () => {
            const name = document.getElementById('customerName').value.trim();
            const phone = document.getElementById('customerPhone').value.trim();
            const email = document.getElementById('customerEmail').value.trim();

            if (!name || !phone || !email) {
                Swal.showValidationMessage('Please fill all fields');
                return false;
            }

            return { name, phone, email };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            addCustomer(result.value);
            renderCustomers();
            Swal.fire({
                icon: 'success',
                title: 'Customer Added!',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000
            });
        }
    });
}
function editCustomer(customerId) {
    const customer = getCustomerById(customerId);
    if (!customer) return;

    Swal.fire({
        title: 'Edit Customer',
        html: `
            <input id="customerName" class="swal2-input" placeholder="Full Name" value="${customer.name}" required>
            <input id="customerPhone" class="swal2-input" placeholder="Phone Number" value="${customer.phone}" required>
            <input id="customerEmail" class="swal2-input" type="email" placeholder="Email Address" value="${customer.email}" required>
        `,
        showCancelButton: true,
        confirmButtonColor: '#4169E1',
        confirmButtonText: 'Update Customer',
        preConfirm: () => {
            const name = document.getElementById('customerName').value.trim();
            const phone = document.getElementById('customerPhone').value.trim();
            const email = document.getElementById('customerEmail').value.trim();

            if (!name || !phone || !email) {
                Swal.showValidationMessage('Please fill all fields');
                return false;
            }

            return { name, phone, email };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            updateCustomer(customerId, result.value);
            renderCustomers();
            Swal.fire({
                icon: 'success',
                title: 'Customer Updated!',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000
            });
        }
    });
}

function deleteCustomerConfirm(customerId) {
    const customer = getCustomerById(customerId);
    if (!customer) return;

    Swal.fire({
        title: 'Delete Customer?',
        text: `Are you sure you want to delete ${customer.name}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#EF4444',
        cancelButtonColor: '#6B7280',
        confirmButtonText: 'Yes, delete'
    }).then((result) => {
        if (result.isConfirmed) {
            deleteCustomer(customerId);
            renderCustomers();
            Swal.fire({
                icon: 'success',
                title: 'Customer Deleted!',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000
            });
        }
    });
}
