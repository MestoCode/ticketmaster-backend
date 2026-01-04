# Ticketmaster Backend API

A RESTful backend API for managing ticket orders, users, and admin operations. Built with Node.js, Express, and PostgreSQL using Sequelize ORM.

## 🚀 Features

- **User Management**: User registration and authentication
- **Admin Management**: Admin registration and authentication
- **Order Management**: Create, retrieve, and delete ticket orders
- **Database Integration**: PostgreSQL database with Sequelize ORM
- **Input Validation**: Joi schema validation for all endpoints
- **Password Security**: Bcrypt hashing for secure password storage
- **CORS Enabled**: Cross-origin resource sharing enabled for frontend integration

## 📋 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Sequelize
- **Validation**: Joi
- **Security**: Bcrypt
- **CORS**: cors middleware

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ticketmaster-backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Create a .env file or use the provided env.testing.sh
export DB_NAME=your_database_name
export DB_USER=your_database_user
export DB_PASSWORD=your_database_password
export DB_HOST=your_database_host
export DB_PORT=5432
export PORT=3001
```

4. Start the server:
```bash
npm start
```

The server will start on port 3001 (or the port specified in your environment variables).

## 🏗️ Project Structure

```
ticketmaster-backend/
├── controllers/
│   ├── admin/
│   │   ├── getAllOrders.js
│   │   ├── login.js
│   │   └── signup.js
│   ├── orders/
│   │   ├── create.js
│   │   ├── delete.js
│   │   └── getAll.js
│   └── users/
│       ├── login.js
│       └── signup.js
├── database/
│   └── sequelizeConnection.js
├── routers/
│   ├── admin.js
│   ├── order.js
│   └── user.js
├── schemas/
│   ├── admin.js
│   ├── order.js
│   └── user.js
├── index.js
└── package.json
```

## 🔌 API Endpoints

### User Endpoints

#### Register User
```http
POST /api/user/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "newUser": {
    "id": 1,
    "email": "user@example.com",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### User Login
```http
POST /api/user/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

### Admin Endpoints

#### Register Admin
```http
POST /api/admin/signup
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "adminpassword123"
}
```

#### Admin Login
```http
POST /api/admin/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "adminpassword123"
}
```

#### Get All Orders (Admin Only)
```http
GET /api/admin/orders
```

### Order Endpoints

#### Create Order
```http
POST /api/order
Content-Type: application/json

{
  "title": "Concert: Taylor Swift",
  "eventDate": "2024-06-15",
  "venue": "Madison Square Garden",
  "location": "New York, NY",
  "totalPrice": 150.00,
  "eventID": "evt_123456",
  "userId": 1
}
```

**Response:**
```json
{
  "message": "Order created successfully",
  "order": {
    "id": 1,
    "title": "Concert: Taylor Swift",
    "eventDate": "2024-06-15",
    "venue": "Madison Square Garden",
    "location": "New York, NY",
    "totalPrice": "150.00",
    "eventID": "evt_123456",
    "userId": 1,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "user": {
      "id": 1,
      "email": "user@example.com"
    }
  }
}
```

#### Get All Orders
```http
GET /api/order
```

**Response:**
```json
[
  {
    "id": 1,
    "title": "Concert: Taylor Swift",
    "eventDate": "2024-06-15",
    "venue": "Madison Square Garden",
    "location": "New York, NY",
    "totalPrice": "150.00",
    "eventID": "evt_123456",
    "userId": 1,
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
]
```

#### Delete Order
```http
DELETE /api/order/:id
```

**Response:**
```json
{
  "message": "Order deleted successfully"
}
```

## 💻 Code Snippets

### Using Fetch API (JavaScript)

#### Create a User
```javascript
const createUser = async () => {
  const response = await fetch('http://localhost:3001/api/user/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: 'user@example.com',
      password: 'securepassword123'
    })
  });
  
  const data = await response.json();
  console.log(data);
};
```

#### Create an Order
```javascript
const createOrder = async (userId) => {
  const response = await fetch('http://localhost:3001/api/order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: 'Concert: Taylor Swift',
      eventDate: '2024-06-15',
      venue: 'Madison Square Garden',
      location: 'New York, NY',
      totalPrice: 150.00,
      eventID: 'evt_123456',
      userId: userId
    })
  });
  
  const data = await response.json();
  console.log(data);
};
```

#### Get All Orders
```javascript
const getAllOrders = async () => {
  const response = await fetch('http://localhost:3001/api/order');
  const orders = await response.json();
  console.log(orders);
};
```

#### Delete an Order
```javascript
const deleteOrder = async (orderId) => {
  const response = await fetch(`http://localhost:3001/api/order/${orderId}`, {
    method: 'DELETE'
  });
  
  const data = await response.json();
  console.log(data);
};
```

### Using Axios

```javascript
const axios = require('axios');

const API_BASE_URL = 'http://localhost:3001/api';

// Create user
const createUser = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/signup`, {
      email: 'user@example.com',
      password: 'securepassword123'
    });
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error.response.data);
  }
};

// Create order
const createOrder = async (userId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/order`, {
      title: 'Concert: Taylor Swift',
      eventDate: '2024-06-15',
      venue: 'Madison Square Garden',
      location: 'New York, NY',
      totalPrice: 150.00,
      eventID: 'evt_123456',
      userId: userId
    });
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error.response.data);
  }
};
```

### Using cURL

#### Create User
```bash
curl -X POST http://localhost:3001/api/user/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securepassword123"
  }'
```

#### Create Order
```bash
curl -X POST http://localhost:3001/api/order \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Concert: Taylor Swift",
    "eventDate": "2024-06-15",
    "venue": "Madison Square Garden",
    "location": "New York, NY",
    "totalPrice": 150.00,
    "eventID": "evt_123456",
    "userId": 1
  }'
```

#### Get All Orders
```bash
curl http://localhost:3001/api/order
```

#### Delete Order
```bash
curl -X DELETE http://localhost:3001/api/order/1
```

## 🔒 Security Features

- Passwords are hashed using bcrypt (10 salt rounds)
- Input validation using Joi schemas
- SQL injection protection through Sequelize ORM
- CORS enabled for secure cross-origin requests

## 📝 Error Handling

The API returns appropriate HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Internal Server Error

Error response format:
```json
{
  "message": "Error description"
}
```

## 🗄️ Database Models

### User Model
- `id` (Integer, Primary Key, Auto Increment)
- `email` (String, Unique, Required)
- `password` (String, Required, Hashed)
- `createdAt` (Date)

### Admin Model
- `id` (Integer, Primary Key, Auto Increment)
- `email` (String, Unique, Required)
- `password` (String, Required, Hashed)
- `createdAt` (Date)

### Order Model
- `id` (Integer, Primary Key, Auto Increment)
- `title` (String, Required)
- `eventDate` (Date, Required)
- `venue` (String, Required)
- `location` (String, Required)
- `totalPrice` (Decimal, Required)
- `eventID` (String, Required)
- `userId` (Integer, Foreign Key to User)
- `createdAt` (Date)

## 🔄 Database Relationships

- **User** has many **Orders** (One-to-Many)
- **Order** belongs to **User** (Many-to-One)

## 📚 Postman Collection

A Postman collection is included in the repository (`Ticketmaster-Backend.postman_collection.json`) for easy API testing.

## 🛠️ Development

The server uses nodemon for automatic restarts during development. Make sure to set up your environment variables before running the server.

## 📄 License

ISC

## 👤 Author

Ticketmaster Backend Team

