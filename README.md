

# E-commerce Full Stack Project

A full-stack e-commerce application built with React, Spring Boot, and PostgreSQL. This project demonstrates modern web development practices, secure authentication, and scalable architecture.

## 🌟 Features

### Frontend
- **User Authentication:** Secure signup, login, and protected routes using JWT
- **Product Catalog:** Browse products with detailed views and filtering
- **Shopping Cart:** Add, remove, and update items in a persistent cart
- **Order Management:** Place orders and view order history
- **Responsive Design:** Fully mobile-friendly and accessible
- **Modern UI:** Built with Tailwind CSS for a clean, professional look
- **State Management:** Redux Toolkit for scalable, maintainable state
- **API Integration:** Axios for seamless backend communication
- **Notifications:** User feedback with Toastify

### Backend
- **RESTful API:** Clean, well-documented endpoints
- **Security:** JWT-based authentication and authorization
- **Database:** PostgreSQL for reliable data storage
- **Data Validation:** Input validation and error handling
- **Exception Handling:** Global exception handling
- **Logging:** Comprehensive logging system

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Redux Toolkit
- React Router
- Tailwind CSS
- Axios
- React Toastify

### Backend
- Spring Boot
- Spring Security
- Spring Data JPA
- PostgreSQL
- JWT
- Maven

## 📦 Getting Started

### Prerequisites
- Node.js (v16+)
- Java 17 or higher
- PostgreSQL
- Maven
- npm or yarn

### Backend Setup

1. Clone the repository:
```bash
git clone https://github.com/emirkorall/E-commerce-Project.git
cd E-commerce-Project
```

2. Configure PostgreSQL:
   - Create a database named `ecommerce`
   - Update `application.properties` with your database credentials

3. Build and run the backend:
```bash
mvn clean install
mvn spring-boot:run
```

The backend server will start at `http://localhost:8080`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## 🗂️ Project Structure

### Frontend
```
src/
  components/        # Reusable UI components
  layout/            # Layout components (Header, Navbar, Footer)
  pages/             # Page components (Home, Shop, Cart, etc.)
  store/             # Redux store, actions, reducers, slices
  utils/             # Utility functions (e.g., Axios instance)
  App.jsx            # Main app component
  main.jsx           # Entry point
```

### Backend
```
src/main/java/com/ecommerce/
  config/            # Configuration classes
  controller/        # REST controllers
  dto/               # Data Transfer Objects
  entity/            # JPA entities
  repository/        # Data access layer
  service/           # Business logic
  security/          # Security configuration
  exception/         # Custom exceptions
  util/              # Utility classes
```

## 🔒 Security

- JWT-based authentication
- Password encryption
- Protected routes
- Input validation
- CORS configuration
- Secure session management

## 📝 API Documentation

### Authentication Endpoints
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - User login
- GET `/api/auth/me` - Get current user

### Product Endpoints
- GET `/api/products` - Get all products
- GET `/api/products/{id}` - Get product by ID
- POST `/api/products` - Create new product (admin)
- PUT `/api/products/{id}` - Update product (admin)
- DELETE `/api/products/{id}` - Delete product (admin)

### Cart Endpoints
- GET `/api/cart` - Get user's cart
- POST `/api/cart` - Add item to cart
- PUT `/api/cart/{id}` - Update cart item
- DELETE `/api/cart/{id}` - Remove item from cart

### Order Endpoints
- GET `/api/orders` - Get user's orders
- POST `/api/orders` - Create new order
- GET `/api/orders/{id}` - Get order details

## 👤 Author

- [Emir Koral](https://github.com/emirkorall)


## 📞 Contact

For any questions or suggestions, please reach out to [emir.koral@outlook.com].
