# Ankit Raj Portfolio — Setup & Deployment

## Included
- Responsive split-layout portfolio with your profile photo
- Dark/light theme toggle
- Lecture AI Summarizer and ShopGrid as featured projects
- Skills, experience, education and NPTEL/Cisco/InternCourse certificates
- Owner dashboard at `/admin`
- Resume, photo and certificate files bundled in `public/assets`

## 1. Run the portfolio locally

1. Install Node.js (18 or newer).
2. Extract this ZIP and open the extracted `ankit-portfolio` folder in Terminal or VS Code.
3. Run:
   ```bash
   npm install
   npm run dev
   ```
4. Vite normally prints `http://localhost:5173`. Open the exact local address shown in the terminal.

The public portfolio works with its bundled content. The owner dashboard needs Supabase configuration to log in and publish edits.

## 2. Configure Supabase (one time)

### A. Create the Supabase project and database

1. Go to https://supabase.com and create a project.
2. In the project, open **SQL Editor**.
3. Open `supabase/schema.sql` from this folder, copy all its SQL, paste it into the SQL Editor and run it.
4. The supplied SQL allows public visitors to read published portfolio content, but limits database and file writes to `ankitraj10386@gmail.com`.

### B. Connect the frontend to Supabase BEFORE sending an invitation

1. In Supabase, open **Project Settings → API** (or the **Connect** dialog).
2. Copy the **Project URL** and **Publishable key**. Do not copy a secret/service-role key.
3. In the portfolio folder, copy `.env.example` to `.env` and fill in:
   ```env
   VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_SUPABASE_PUBLISHABLE_KEY
   ```
4. Restart `npm run dev` after editing `.env`.

### C. Fix the email redirect (this fixes your `localhost:3000` problem)

The error URL you shared shows Supabase is currently redirecting to `http://localhost:3000`. This Vite project normally runs at `http://localhost:5173`.

1. In Supabase, open **Authentication → URL Configuration**.
2. Set **Site URL** to:
   ```text
   http://localhost:5173
   ```
3. Under **Redirect URLs**, add:
   ```text
   http://localhost:5173/**
   ```
4. Save the settings.
5. Keep the local Vite server running while accepting the invitation. If your terminal shows a different port, use that exact URL in Supabase instead.

### D. Send a fresh invitation and set your password

1. In Supabase, open **Authentication → Users**.
2. The old `otp_expired` link cannot be reused. For the pending/unconfirmed user, use **Resend invite** if shown. Otherwise remove only that pending test user and create a fresh invitation. Do not delete a confirmed account you actively use.
3. Click **Add user → Send invitation** and enter `ankitraj10386@gmail.com`.
4. Open the newest invitation email promptly. Invitation links expire (the default email OTP lifetime is one hour) and a link can only be used once.
5. The link should now open `http://localhost:5173`. The portfolio displays **Set your admin password**. Enter and confirm a password of at least 8 characters.
6. After the password is saved, the app takes you to `/admin`. Sign in with `ankitraj10386@gmail.com` and the password you just created.
7. In Supabase **Authentication → Settings** (or **Sign In / Providers**), turn off **Allow new users to sign up** after your owner account is created. This prevents public registration.

## 3. Deploy to Netlify (recommended)

1. Push the extracted project folder to a GitHub repository.
2. In Netlify, choose **Add new site → Import from Git** and select that repository.
3. Set build command to `npm run build` and publish directory to `dist`.
4. In Netlify **Site configuration → Environment variables**, add `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` with the same values used locally.
5. Deploy the site.
6. In Supabase **Authentication → URL Configuration**, change **Site URL** to your actual Netlify URL, for example `https://your-site.netlify.app`, and add that exact URL plus `https://your-site.netlify.app/**` to **Redirect URLs**. Keep the localhost redirect if you still test locally.

The included `public/_redirects` file enables the `/admin` route on Netlify.

## 4. Update the website without editing code

After Supabase is connected and your owner login works:

1. Open `https://your-site.netlify.app/admin`.
2. Sign in with your owner email and password.
3. Edit Profile, Projects, Skills, Experience, Education or Certificates.
4. Upload a new resume, profile photo, project screenshot or certificate.
5. Click **Save & Publish**. Refresh the public website to see the change.

## Security notes
- Keep public sign-ups disabled.
- Only the owner email `ankitraj10386@gmail.com` is allowed to write through the supplied SQL policies. If you use a different Supabase email, update the email in `supabase/schema.sql` and rerun the policies before using the admin.
- The Supabase Publishable key is intended for browser use. Never put a Supabase secret/service-role key in `.env` or frontend code.
- Portfolio content and files in the public storage bucket are publicly readable by design; do not upload private documents.
