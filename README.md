# Todo Application

A fully functional and responsive Todo web application with authentication, database integration, and protected routes using Next.js, PostgreSQL, Prisma, NextAuth, and TailwindCSS.

## Features

- **Authentication**: Users can register and sign in using Google or email/password credentials
- **Protected Routes**: Dashboard and edit pages are only accessible to authenticated users
- **Task Management**: Users can add, edit, and delete tasks
- **Real-time Updates**: Changes to tasks are reflected immediately without page refresh
- **Responsive Design**: Optimized for mobile, tablet, laptop, and desktop devices

## Tech Stack

- **Frontend**: Next.js, React, TailwindCSS, ShadCN UI
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js (Google provider and credentials)
- **Testing**: Jest
- **Deployment**: Vercel

## Project Structure

```
todo-app/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.ts
│   │   ├── register/
│   │   │   └── route.ts
│   │   └── tasks/
│   │       ├── route.ts
│   │       └── [id]/
│   │           └── route.ts
│   ├── dashboard/
│   │   └── page.tsx
│   ├── edit/
│   │   └── [id]/
│   │       └── page.tsx
│   ├── register/
│   │   └── page.tsx
│   ├── signin/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── auth/
│   │   ├── AuthProvider.tsx
│   │   ├── RegisterForm.tsx
│   │   └── SignInForm.tsx
│   ├── tasks/
│   │   ├── AddTask.tsx
│   │   ├── EditTaskForm.tsx
│   │   └── TaskList.tsx
│   └── ui/
│       └── (shadcn components)
├── prisma/
│   └── schema.prisma
├── public/
├── types/
│   └── next-auth.d.ts
├── .env
├── middleware.ts
├── next.config.js
├── package.json
└── tsconfig.json
```

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd todo-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/todo_app"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key"
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   ```

4. Set up the PostgreSQL database and run Prisma migrations:
   ```bash
   npx prisma migrate dev --name init
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

The application uses the following PostgreSQL schema via Prisma:

- **User**: Stores user information and authentication details
- **Account**: Manages OAuth providers and connections
- **Session**: Handles user sessions
- **Task**: Stores the tasks with relations to users