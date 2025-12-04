
window.addEventListener('DOMContentLoaded', () => {
    const user = getCurrentUser();
    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    document.getElementById('sidebarUserName').textContent = user.fullName || user.username;
    document.getElementById('topBarUserName').textContent = user.fullName || user.username;

    initCart();
    initProducts();
    initCustomers();
    initOrders();

    setupNavigation();
    setupMobileMenu();
});

function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page');
    const pageTitle = document.getElementById('pageTitle');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const pageName = item.dataset.page;

            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            pages.forEach(page => page.classList.remove('active'));
            const targetPage = document.getElementById(pageName + 'Page');
            if (targetPage) {
                targetPage.classList.add('active');
            }

            const titles = {
                'products': 'Products',
                'customers': 'Customers',
                'orders': 'Order History'
            };
            pageTitle.textContent = titles[pageName] || 'DailyMart POS';

            if (pageName === 'products') {
                initProducts();
            } else if (pageName === 'customers') {
                initCustomers();
            } else if (pageName === 'orders') {
                initOrders();
            }

            if (window.innerWidth <= 768) {
                document.getElementById('sidebar').classList.remove('open');
            }
        });
    });
}

function setupMobileMenu() {
    document.addEventListener('click', (e) => {
        const cartPanel = document.getElementById('cartPanel');
        const floatingBtn = document.querySelector('.floating-cart-btn');

        if (cartPanel.classList.contains('open') &&
            !cartPanel.contains(e.target) &&
            !floatingBtn.contains(e.target) &&
            !e.target.closest('.btn-add-cart') &&
            !e.target.closest('.btn-primary')) {
            if (!e.target.closest('.cart-panel')) {
            }
        }
    });
}
