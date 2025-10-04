# Steroid Backend API

A Node.js backend API for steroid prediction and user management.

## Features

- User authentication (register/login)
- JWT-based authentication
- Steroid prediction using machine learning models
- MongoDB database integration
- RESTful API design
- Input validation and error handling

## Prerequisites

- Node.js (>=16.0.0)
- MongoDB
- Python (for ML model execution)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp env.example .env
```

3. Update `.env` with your configuration:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/steroid-app
JWT_SECRET=your-super-secret-jwt-key-here
```

## Running the Application

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile (protected)

### Prediction
- `POST /api/predict` - Get steroid prediction

### Health Check
- `GET /api/health` - Server health status

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   └── userController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   └── predict.py
│   ├── routes/
│   │   ├── userRoutes.js
│   │   └── predictRoutes.js
│   └── server.js
├── package.json
├── env.example
└── README.md
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/steroid-app |
| JWT_SECRET | JWT secret key | - |
| NODE_ENV | Environment | development |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

