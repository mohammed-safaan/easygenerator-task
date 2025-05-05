# Easygenerator Task

A full-stack authentication system built with React and NestJS.

## Features

- User authentication (Login/Signup)
- Protected routes
- JWT-based authentication
- Password validation
- Real-time form validation
- Dark/Light mode support

## Tech Stack

### Frontend

- React
- TanStack Router
- Shadcn/ui
- Zustand
- Zod
- React Hook Form
- Tailwind CSS

### Backend

- NestJS
- MongoDB
- JWT
- Bcrypt
- Class Validator
- swagger

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB
- pnpm (recommended)

### Installation localy

1. Clone the repository:

```bash
git clone https://github.com/mohammed-safaan/easygenerator-task
cd easygenerator-task
```

2. Install dependencies:

```bash
# Install frontend dependencies
cd client
pnpm install

# Install backend dependencies
cd ../server
pnpm install
```

3. Configure environment variables:

```bash
# Backend (.env)
MONGODB_URI=mongodb://localhost:27017/easy-generator
JWT_SECRET=your_jwt_secret
PORT=4000

# Frontend (.env)
VITE_API_URL=http://localhost:4000
```

4. Start the development servers:

```bash
# Start backend
cd server
pnpm run start:dev

# Start frontend (in another terminal)
cd client
pnpm run dev
```

5. The frontend will be available at http://localhost:3000

6. The backend will be available at http://localhost:4000 and the swagger documentation at http://localhost:4000/api

## Project Structure

```
├── client/              # Frontend React application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── hooks/      # Custom hooks
│   │   ├── routes/     # Route components
│   │   ├── schemas/    # Validation schemas
│   │   └── services/   # API services
└── server/             # Backend NestJS application
    ├── src/
    │   ├── auth/       # Authentication module
    │   ├── common/     # Shared resources
    │   └── config/     # Configuration
```

## Security Features

- Password hashing with bcrypt
- JWT authentication
- Protected routes
- Form validation
- Input sanitization
- Error handling
- CORS protection

## Things I would like to add if i had more time

- convert the repo to monorepo (to improve code organization)
- add ci/cd
- add email confirmation after signup
- deploy the project
