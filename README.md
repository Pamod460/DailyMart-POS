# DailyMart POS

DailyMart POS is a modern, web-based Point of Sale system designed for retail stores. It provides a comprehensive interface for managing products, processing sales, handling customer data, and tracking order history.

## Features

*   **Product Management**: Browse products with image previews, filter by categories (Bakery, Beverages, Dairy, etc.), search functionality, and add new products to inventory.
*   **Shopping Cart**: Add items to cart, adjust quantities, view tax and total calculations, and process checkouts.
*   **Customer Management**: View customer list, add new customers, and manage customer details.
*   **Order History**: Track past transactions and view order details.
*   **Authentication**: Secure login and signup system with session management.
*   **Responsive Design**: Fully responsive interface that works on desktop and mobile devices.
*   **Data Persistence**: Uses LocalStorage to persist data (products, customers, orders, users) across sessions without a backend.

## Technologies Used

*   **HTML5**: Semantic structure.
*   **CSS3**: Custom styling with modern design principles (Variables, Flexbox, Grid).
*   **JavaScript (ES6+)**: Core application logic.
*   **Bootstrap Icons**: For UI icons.
*   **SweetAlert2**: For beautiful popup notifications and alerts.
*   **Google Fonts**: 'Inter' font family for typography.

## Setup & Usage

1.  Clone the repository or download the source code.
2.  Open `index.html` in your web browser.
3.  You will be redirected to the login page.


## Project Structure

```
DailyMart-POS/
├── assets/
│   ├── css/            # Stylesheets (pos.css, home.css, login.css, etc.)
│   ├── js/             # JavaScript modules (auth.js, products.js, cart.js, database.js, etc.)
│   └── images/         # Image resources
├── index.html          # Entry point (redirects to login)
├── home.html           # Main POS interface
├── login.html          # Login page
├── signup.html         # Registration page
└── README.md           # Project documentation
```

## License

This project is for educational purposes.
