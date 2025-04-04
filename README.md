# AI Help Center Frontend

A modern, responsive AI-powered help center built with React, TypeScript, and Vite.

## Features

- Modern UI with dark mode support
- Real-time chat interface
- Admin dashboard
- Category-based navigation
- Responsive design
- Authentication system

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- React Query
- Zustand

## Getting Started

1. Clone the repository:
```bash
git clone <your-frontend-repo-url>
cd ai-help-center-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file:
```env
VITE_API_URL=http://localhost:8000
VITE_APP_NAME=AI Help Center
VITE_APP_VERSION=1.0.0
VITE_APP_ENV=development
```

4. Start the development server:
```bash
npm run dev
```

## Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy to Vercel:
```bash
vercel
```

## Environment Variables

- `VITE_API_URL`: Backend API URL
- `VITE_APP_NAME`: Application name
- `VITE_APP_VERSION`: Application version
- `VITE_APP_ENV`: Environment (development/production)
- `VITE_SENTRY_DSN`: (Optional) Sentry DSN for error tracking

## Demo Credentials

Admin:
- Email: admin@example.com
- Password: admin123 