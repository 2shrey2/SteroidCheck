# Steroid Frontend

A modern React frontend application for steroid prediction and management system.

## Features

- Modern React 18 with Vite
- Tailwind CSS for styling
- Dark/Light mode support
- Responsive design
- Authentication system
- Form validation
- API integration
- Error handling
- Loading states

## Prerequisites

- Node.js (>=16.0.0)
- npm or yarn

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
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=SteroidCheck
VITE_APP_VERSION=1.0.0
VITE_NODE_ENV=development
```

## Running the Application

### Development
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Linting
```bash
npm run lint
npm run lint:fix
```

## Project Structure

```
frontend/
├── public/
│   └── assets/
├── src/
│   ├── components/
│   │   └── NavBar.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── hooks/
│   │   └── useApi.js
│   ├── pages/
│   │   ├── AboutUs.jsx
│   │   ├── HomePage.jsx
│   │   ├── LoginRegister.jsx
│   │   ├── SteroidDosagePrediction.jsx
│   │   └── SteroidInfoPage.jsx
│   ├── services/
│   │   └── api.js
│   ├── utils/
│   │   ├── constants.js
│   │   └── helpers.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── eslint.config.js
└── README.md
```

## Technologies Used

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Font Awesome** - Icons
- **ESLint** - Code linting

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| VITE_API_URL | Backend API URL | http://localhost:5000/api |
| VITE_APP_NAME | Application name | SteroidCheck |
| VITE_APP_VERSION | Application version | 1.0.0 |
| VITE_NODE_ENV | Environment | development |

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

## Features

### Authentication
- User registration and login
- JWT token management
- Protected routes
- Auto-logout on token expiry

### UI/UX
- Responsive design
- Dark/Light mode toggle
- Loading states
- Error handling
- Form validation

### API Integration
- Axios interceptors
- Error handling
- Request/Response logging
- Token management

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)