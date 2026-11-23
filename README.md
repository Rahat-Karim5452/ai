# StudioSpace

**Live site:** https://your-live-site.vercel.app (replace this with your own link)

StudioSpace is a peer-to-peer marketplace for creative workspaces. Hosts list photo studios, sound
stages, podcast rooms, music suites and art workshops. Creators find a space, pick their hours and
send a booking request.

## Features

- Home page with a Swiper hero slider, six featured studios loaded from MongoDB, category cards,
  a "How Booking Works" section and a "Host Guarantee" section
- Register and login with email and password or with Google (BetterAuth with the MongoDB adapter)
- Private routes are protected in `src/proxy.ts`, so a logged in user stays logged in after a reload
- Add, update and delete studios with imgbb image upload. Only the host of a studio can change it
- Booking requests with four statuses: Pending, Confirmed, Completed and Cancelled
- Double-booking prevention: a time slot that overlaps a confirmed booking is rejected
- Every protected request sends a BetterAuth JWT, and the server answers 401 without it
- Light and dark theme toggle for the whole website
- Sonner toast messages, confirmation dialogs, skeleton loaders, empty states and a custom 404 page
- Responsive layout for mobile, tablet and desktop

## Tech stack

- Next.js (App Router) and TypeScript
- Tailwind CSS and shadcn/ui
- BetterAuth, MongoDB adapter and the JWT plugin
- Swiper, Sonner and next-themes
- Server: Express, MongoDB and jose

## Local setup

1. Start the server first (see the README in the server repository). It runs on port 8000.
2. Clone this repository and install the packages:

   ```bash
   git clone <your-client-repo-url>
   cd studiospace-client
   npm install
   ```

3. Create a `.env.local` file with these values:

   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:8000
   MONGODB_URI=<your MongoDB connection string>
   BETTER_AUTH_SECRET=<any long random text>
   BETTER_AUTH_URL=http://localhost:3000
   GOOGLE_CLIENT_ID=<from Google Cloud Console>
   GOOGLE_CLIENT_SECRET=<from Google Cloud Console>
   NEXT_PUBLIC_IMGBB_KEY=<from api.imgbb.com>
   ```

4. Run the website:

   ```bash
   npm run dev
   ```

5. Open http://localhost:3000

## Examiner test credentials

- Email: `ava@studiospace.dev`
- Password: `Studio2026`
