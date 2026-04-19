This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Supabase Auth Login Form

This project now includes a Tailwind CSS login form connected to Supabase Auth.

## Admin Panel and Token-Based Registration

The project now includes:

- Token-based registration at `/login` (registration is only possible with an admin-issued token)
- Internal roles: `administrator` and `intern`
- Admin dashboard at `/admin` with:
	- Registered user count
	- Maintenance mode toggle (administrator only)
	- Announcement management (administrator and intern)
	- Database and website stability status
	- User management (intern: read-only, administrator: role changes)

### Required environment variables

Add these to `.env.local` and deployment environment variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### Database setup

Run the SQL file in Supabase SQL Editor before using registration/admin features:

- `supabase/admin_schema.sql`

The SQL enables secure token handling (hashed tokens), profile roles, announcements, site settings, and RLS policies.

### 1) Configure environment variables

Copy `.env.local.example` to `.env.local` and fill in your Supabase project values:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

### 2) Enable email/password auth in Supabase

In your Supabase dashboard:

- Go to Authentication -> Providers
- Enable Email provider
- Make sure Email and Password sign-in is enabled

### 3) Run the app

```bash
npm run dev
```

Open `http://localhost:3000` to use the login form.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
