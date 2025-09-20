# Job Portal Frontend - Next.js

This is a Next.js version of the Job Portal frontend, converted from React Vite.

## Features

- File-based routing with Next.js App Router
- React Context API for state management
- Tailwind CSS for styling
- Responsive design
- Authentication system
- Job posting and application system
- Admin panel for recruiters

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `app/` - Next.js App Router pages
- `src/components/` - React components
- `src/context/` - React Context providers
- `src/hooks/` - Custom React hooks
- `src/utils/` - Utility functions

## Routing

The app uses Next.js file-based routing:

- `/` - Home page
- `/login` - Login page
- `/signup` - Signup page
- `/jobs` - Jobs listing
- `/description/[id]` - Job description
- `/browse` - Browse jobs
- `/profile` - User profile
- `/admin/companies` - Admin companies management
- `/admin/jobs` - Admin jobs management

## Key Changes from Vite

1. Replaced React Router with Next.js App Router
2. Added 'use client' directives to client components
3. Updated navigation using Next.js router
4. Converted dynamic routes to use Next.js params
5. Updated package.json for Next.js dependencies
6. Replaced Redux with React Context API for state management

## Build

```bash
npm run build
npm start
```
