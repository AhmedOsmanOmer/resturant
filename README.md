# Saffron & Olive

A website for Saffron & Olive, a fictional Mediterranean restaurant in Berlin. It started as a plain HTML and CSS page (Assignment 1) and was rebuilt with React and Tailwind (Assignment 2). This version (Assignment 3) adds a real backend: an Express API, a Postgres database on Neon, email and password accounts with Better Auth, and a setup for deploying to Railway and Vercel.

## Architecture

The project has two apps:

- **client**: the React + Tailwind website, built with Vite. In production it is hosted on Vercel.
- **server**: an Express API that talks to Postgres and handles sign up, sign in and sessions. In production it is hosted on Railway.

### How a request flows

1. The browser only calls relative paths that start with `/api`, for example `/api/menu`. It never needs to know where the server lives.
2. In development the Vite dev server (port 5173) forwards every `/api` request to Express on `localhost:3000`. In production Vercel does the same with a rewrite in `client/vercel.json`, which forwards `/api/*` to the Railway server.
3. Express sends the request to the right place:
   - `/api/auth/*` goes to Better Auth (sign up, sign in, sign out, current session).
   - `/api/menu` and `/api/menu/:id` go to the menu routes.
   - `/api/me` first runs the `requireAuth` middleware, which checks the session.
4. Better Auth and the menu routes run SQL queries against Postgres on Neon, and Express sends the result back as JSON.
5. Because the browser only ever talks to its own domain (localhost:5173 or the Vercel domain), the session cookie is a normal first-party cookie.

## Folder structure

```
.
├── client/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js            Vite, Tailwind and the /api dev proxy
│   ├── vercel.json               Vercel rewrite from /api to Railway
│   ├── public/images/            restaurant photos
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css             Tailwind import and theme colors and fonts
│       ├── lib/authClient.js     Better Auth React client
│       └── components/
│           ├── Header.jsx        navigation, sign in and sign out
│           ├── AuthPanel.jsx     sign in and sign up form
│           ├── Hero.jsx
│           ├── About.jsx
│           ├── Menu.jsx          loads /api/menu, filter and order summary
│           ├── MenuItem.jsx
│           ├── QuantityStepper.jsx
│           ├── Reservation.jsx
│           └── Footer.jsx
├── server/
│   ├── package.json
│   ├── .env.example              variable names with fake values
│   ├── src/
│   │   ├── index.js              Express app and routes
│   │   ├── db.js                 Postgres connection pool
│   │   ├── auth.js               Better Auth setup
│   │   ├── routes/menu.js        menu API
│   │   └── middleware/requireAuth.js
│   └── db/
│       ├── schema.sql            menu_items table
│       ├── auth-schema.sql       Better Auth tables (made with the Better Auth CLI)
│       ├── migrate.js            runs both SQL files
│       ├── menu-data.js          the 12 dishes
│       └── seed.js               fills menu_items
├── README.md
└── .gitignore
```

## Database schema

- **menu_items**: one row per dish on the menu. It stores an id, the name, a short description, the price in euros (never negative), the category (only Starters, Mains or Desserts) and the path of its photo.
- **user**: one row per customer account. It stores an id, the name, the email (unique), whether the email is verified, an optional image and when the account was created and updated.
- **account**: how a user signs in. For email and password accounts it stores the hashed password (never the real one), linked to the user.
- **session**: one row per signed-in browser. It stores a random token, when it expires, the browser's IP address and user agent, and which user it belongs to.
- **verification**: short-lived codes for things like email verification or password reset. This project does not send emails yet, so the table is usually empty.

`npm run db:migrate` creates all of these tables. Running it again is safe because every statement uses `if not exists`.

## How sessions work

When you sign up or sign in, Better Auth creates a row in the `session` table and sends the browser a cookie with the session token. The cookie is `HttpOnly` (JavaScript cannot read it), `SameSite=Lax`, and in production it is also `Secure` (only sent over HTTPS). The browser sends the cookie with every `/api` request, so after a page refresh the React app asks Better Auth for the current session and you are still signed in. Signing out deletes the session row and clears the cookie.

## Environment variables

The server reads these from `server/.env` in development, and from Railway's variables in production. Real values are never committed. See `server/.env.example` for the names.

| Name | What it is for |
| --- | --- |
| `DATABASE_URL` | Neon Postgres connection string |
| `BETTER_AUTH_SECRET` | random secret Better Auth uses to sign and encrypt cookies and tokens |
| `BETTER_AUTH_URL` | the public address of the site, where the browser sees `/api/auth` |
| `CLIENT_ORIGIN` | the address of the website, allowed by CORS and Better Auth's trusted origins |
| `PORT` | the port Express listens on (Railway sets this itself) |
| `NODE_ENV` | `development` locally, `production` on Railway (turns on secure cookies) |

The client needs no environment variables.

## How to run locally

You need Node.js 20 or newer and a Neon Postgres database.

1. Install both apps:
   ```bash
   cd server && npm install
   cd ../client && npm install
   ```
2. Copy `server/.env.example` to `server/.env` and fill in the values. Create the secret with `openssl rand -base64 32`, and use your Neon connection string for `DATABASE_URL`. If Neon gives you `sslmode=require`, you can change it to `sslmode=verify-full`, which is the same check and removes a warning from `pg`.
3. Create the tables and add the dishes:
   ```bash
   cd server
   npm run db:migrate
   npm run db:seed
   ```
4. Start the server (terminal 1):
   ```bash
   cd server && npm run dev
   ```
5. Start the website (terminal 2):
   ```bash
   cd client && npm run dev
   ```
6. Open http://localhost:5173.

## Deployment

### Railway (server)

1. Create a new Railway project from this GitHub repository.
2. In the service settings set **Root Directory** to `server`. Railway runs `npm install` and `npm start`.
3. Add the variables:
   - `DATABASE_URL`: your Neon connection string
   - `BETTER_AUTH_SECRET`: a new value from `openssl rand -base64 32`
   - `BETTER_AUTH_URL`: your Vercel address, for example `https://your-app.vercel.app`
   - `CLIENT_ORIGIN`: the same Vercel address
   - `NODE_ENV`: `production`
4. Under **Networking**, generate a public domain and copy it.
5. If this is a new database, run `npm run db:migrate` and `npm run db:seed` once from your computer with `DATABASE_URL` pointing to it.

### Vercel (client)

1. In `client/vercel.json` replace `YOUR-RAILWAY-DOMAIN` with the Railway domain, commit and push.
2. Import the repository in Vercel and set **Root Directory** to `client`. Vercel detects Vite and builds it with `npm run build`.
3. Deploy, then check that `BETTER_AUTH_URL` and `CLIENT_ORIGIN` on Railway match the final Vercel address exactly (with `https://` and no trailing slash).

## Live URLs

- Website: https://YOUR-APP.vercel.app
- API health check: https://YOUR-RAILWAY-DOMAIN/api/health

## Photo credits

All photos come from Wikimedia Commons. They were resized and compressed for the web.

| File | Photo | Author | License |
| --- | --- | --- | --- |
| `client/public/images/hero.jpg` | [11 Depot St, Concord, United States (Unsplash)](https://commons.wikimedia.org/wiki/File:11_Depot_St,_Concord,_United_States_(Unsplash).jpg) | Michael Browning | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| `client/public/images/about.jpg` | [Kokos Fusion - Eggplant bayildi 7](https://commons.wikimedia.org/wiki/File:Kokos_Fusion_-_Eggplant_bayildi_7.jpg) | Journalistgm | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) |
| `client/public/images/starters.jpg` | [Hummus dish on a plate](https://commons.wikimedia.org/wiki/File:Hummus_dish_on_a_plate.jpg) | Bykim2012 | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| `client/public/images/mains.jpg` | [Seabass (levrek) and a grilled potato](https://commons.wikimedia.org/wiki/File:Seabass_(levrek)_and_a_grilled_potato.jpg) | E4024 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) |
| `client/public/images/desserts.jpg` | [Fıstıklı Baklava](https://commons.wikimedia.org/wiki/File:F%C4%B1st%C4%B1kl%C4%B1_Baklava.jpg) | Garrett Ziegler | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) |

The resized versions of the CC BY-SA photos are shared under the same CC BY-SA 4.0 license.

## AI assistance

AI tools (Claude) were used to help build this project.

## Author

Ahmed Osman, Team 1, Group D
