# MonoShare

> **Zero-knowledge, end-to-end encrypted secret sharing. Delivered. Viewed. Deleted.**

MonoShare is a privacy-first secret sharing platform for transmitting passwords, API keys, tokens, and sensitive messages via single-use links — all encrypted entirely in the browser before anything leaves your device.

**Live:** [monoshare.site](https://monoshare.site)

---

## Table of Contents

- [Overview](#overview)
- [How It Works](#how-it-works)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Security Model](#security-model)
- [Testing](#testing)
- [Deployment](#deployment)
- [Project Structure](#project-structure)

---

## Overview

MonoShare solves a common problem: how do you share a password or sensitive token without it living permanently in a chat log, email thread, or ticket system?

The answer: a link that destroys itself.

- **No account required** to create a secret
- **AES-128-GCM** encryption runs in-browser — the server never sees plaintext
- The decryption key lives only in the **URL hash fragment** (never sent to the server)
- The secret **auto-erases** on first view or on expiration — whichever comes first
- Registered users get a full **dashboard** with secret management, timeline tracking, recipient email restrictions, and manual deletion

---

## How It Works

```
1. CREATE   →  You type your secret. It's encrypted in your browser using AES-128-GCM.
               The encrypted ciphertext is sent to the server. The key is NOT.

2. SHARE    →  A one-time link is generated. The decryption key is embedded in the
               URL hash fragment (e.g. /secret/abc123#<key>). Only the person
               with the full URL can decrypt the content.

3. ERASE    →  When the recipient opens the link, the secret is decrypted locally
               and immediately wiped from the server. It cannot be viewed again.
```

---

## Features

### For Everyone (No Account Required)

- Create encrypted secrets up to **1,000 characters**
- Choose expiration: **1 hour**, **1 day**, or **7 days**
- Optional **password protection** (Argon2-hashed server-side)
- Secrets auto-erase on view or expiration

### For Registered Users

- Secrets up to **10,000 characters**
- Personal **My Secrets dashboard** with Active / Viewed / Expired tabs
- Restrict access to a **specific recipient email address**
- **Timeline view** with creation, expiration, and view timestamps
- **Manual deletion** before expiration
- Secret detail pages with share link and status tracking

### Security Highlights

- Zero-knowledge architecture — plaintext never reaches the server
- AES-128-GCM client-side encryption via the Web Crypto API
- HMAC-SHA256 session token hashing
- Argon2 password hashing for account passwords and optional secret passwords
- HttpOnly, Secure, SameSite=Strict cookies
- Rate limiting on all sensitive endpoints
- HTTP security headers (CSP, X-Frame-Options, Referrer-Policy, etc.)
- LRU session cache to reduce database load

---

## Tech Stack

### Frontend

| Tool              | Purpose                 |
| ----------------- | ----------------------- |
| React 19          | UI framework            |
| TypeScript        | Type safety             |
| Vite 7            | Build tool              |
| Tailwind CSS v4   | Styling                 |
| TanStack Query v5 | Server state management |
| Framer Motion     | Animations              |
| Axios             | HTTP client             |
| React Router v7   | Client-side routing     |
| Web Crypto API    | AES-128-GCM encryption  |

### Backend

| Tool               | Purpose                   |
| ------------------ | ------------------------- |
| Node.js + Express  | HTTP server               |
| TypeScript         | Type safety               |
| Prisma 6           | ORM                       |
| MongoDB            | Database                  |
| Argon2             | Password hashing          |
| nanoid             | Secure slug generation    |
| lru-cache          | In-memory session caching |
| express-rate-limit | Rate limiting             |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Browser (Client)                        │
│                                                                 │
│  ┌─────────────┐    AES-128-GCM encrypt    ┌─────────────────┐ │
│  │  Plaintext  │ ──────────────────────→   │  Ciphertext +   │ │
│  │   Secret    │                           │  Encrypted IV   │ │
│  └─────────────┘                           └────────┬────────┘ │
│         │                                           │          │
│  Key generated locally                        Sent to server   │
│  (never leaves browser)                             │          │
│         │                                           │          │
│  Stored in URL hash: /secret/slug#<key>             │          │
└─────────│───────────────────────────────────────────│──────────┘
          │                                           │
          │ URL hash NOT transmitted                  ▼
          │ in HTTP requests                 ┌─────────────────┐
          │                                  │   Express API   │
          │                                  │                 │
          │                                  │  Stores only:   │
          │                                  │  - Ciphertext   │
          │                                  │  - IV           │
          │                                  │  - Metadata     │
          │                                  └────────┬────────┘
          │                                           │
          │                                           ▼
          │                                  ┌─────────────────┐
          │                                  │    MongoDB      │
          │                                  │   (Prisma)      │
          │                                  └─────────────────┘
          │
          │ On view: key extracted from URL hash
          │ Decryption happens in browser
          ▼
   ┌─────────────┐
   │  Plaintext  │   ←  Server simultaneously wipes ciphertext
   │   Secret    │
   └─────────────┘
```

### Key Design Decisions

**Why the URL hash?** Browsers do not include the hash fragment (`#...`) in HTTP requests. This means the decryption key is transmitted only to the recipient — never to the server — making it architecturally impossible for MonoShare to read secret content.

**Atomic erase on view:** The `viewSecret` endpoint wraps the read and wipe in a Prisma transaction. The ciphertext is overwritten with empty strings and the view timestamp is recorded atomically, so a race condition cannot result in two successful decryptions.

**LRU session cache:** Authenticated requests look up the session from an in-memory LRU cache before hitting the database, reducing latency and database load on frequently active sessions.

---

## Getting Started

### Prerequisites

- Node.js 20+
- MongoDB instance (local or Atlas)
- npm

### 1. Clone the repository

```bash
git clone https://github.com/dannyj0410/MonoShare.git
cd MonoShare
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file in `/backend` (see [Environment Variables](#environment-variables)):

```env
DATABASE_URL=mongodb+srv://...
SESSION_SECRET=your-128-char-hmac-secret
FRONTEND_URL=http://localhost:9000
PORT=8001
NODE_ENV=development
```

Generate the Prisma client and push the schema:

```bash
npx prisma generate
npx prisma db push
```

Start the dev server:

```bash
npm run dev
```

### 3. Set up the frontend

```bash
cd ../frontend
npm install
npm run dev
```

The app will be available at `http://localhost:9000`.

### 4. Production build

```bash
# Build the frontend
cd frontend && npm run build

# Copy built files into the backend's static directory
cp -r dist/* ../backend/built/public/

# Start the backend (serves both the API and the built frontend)
cd ../backend
NODE_ENV=production npm run start
```

---

## Environment Variables

### Backend (`backend/.env`)

| Variable         | Required | Description                                                                                               |
| ---------------- | -------- | --------------------------------------------------------------------------------------------------------- |
| `DATABASE_URL`   | ✅       | MongoDB connection string                                                                                 |
| `SESSION_SECRET` | ✅       | Secret key used for HMAC-SHA256 session token hashing. Use a long, random value (128+ chars recommended). |
| `FRONTEND_URL`   | ✅       | Frontend origin, used for CORS and share URL generation (e.g. `https://monoshare.site`)                   |
| `PORT`           | ❌       | Server port (default: `5000`)                                                                             |
| `NODE_ENV`       | ❌       | `development` or `production`                                                                             |

### Frontend

The frontend uses Vite environment files:

| File               | Variable            | Value                               |
| ------------------ | ------------------- | ----------------------------------- |
| `.env.development` | `VITE_API_BASE_URL` | `http://localhost:BACKEND_PORT/api` |
| `.env.production`  | `VITE_API_BASE_URL` | `/api`                              |

---

## API Reference

All routes are prefixed with `/api`.

### Auth — `/api/auth`

| Method | Endpoint      | Auth     | Description                            |
| ------ | ------------- | -------- | -------------------------------------- |
| `POST` | `/register`   | Public   | Create a new account                   |
| `POST` | `/signin`     | Public   | Sign in and receive a session cookie   |
| `POST` | `/logout`     | Required | Invalidate current session             |
| `GET`  | `/user-check` | Required | Verify session and return current user |

### Secrets — `/api/secret`

| Method   | Endpoint              | Auth     | Description                                                         |
| -------- | --------------------- | -------- | ------------------------------------------------------------------- |
| `POST`   | `/create`             | Optional | Create a new encrypted secret                                       |
| `GET`    | `/my-secrets`         | Required | List all secrets owned by the current user                          |
| `GET`    | `/details/:secretid`  | Required | Get full metadata for a specific secret                             |
| `GET`    | `/metadata/:secretid` | Optional | Check if a secret is accessible (expired, password-protected, etc.) |
| `POST`   | `/view/:secretid`     | Optional | View and permanently erase a secret                                 |
| `DELETE` | `/delete/:secretid`   | Required | Manually delete a secret                                            |

### Rate Limits

| Endpoint             | Limit        | Window |
| -------------------- | ------------ | ------ |
| `/auth/register`     | 3 requests   | 10 min |
| `/auth/signin`       | 10 requests  | 10 min |
| `/secret/create`     | 20 requests  | 10 min |
| All other API routes | 100 requests | 10 min |

> Rate limiting is skipped in `NODE_ENV=development` for convenience.

---

## Security Model

### What MonoShare cannot read

The plaintext content of any secret — ever. The AES-128-GCM key is generated locally and stored exclusively in the URL hash fragment, which browsers do not transmit in HTTP requests. Without the key, the stored ciphertext is cryptographically meaningless.

### What MonoShare can see

Secret **metadata** only: slugs, creation timestamps, expiration timestamps, optional recipient email addresses, and account email addresses. This metadata is not zero-knowledge protected and may be subject to disclosure under a valid legal obligation.

### Session security

- Session tokens are 32 random bytes from `crypto.randomBytes`
- Only the HMAC-SHA256 hash of the token is stored in the database
- Cookies are `HttpOnly`, `Secure`, and `SameSite=Strict`
- Sessions expire after 7 days with sliding expiry
- Previous sessions are invalidated on new login

### Password hashing

Both account passwords and optional secret access passwords are hashed with **Argon2** (a memory-hard algorithm). Plaintext passwords are never stored.

### HTTP security headers

Every response includes:

- `Content-Security-Policy` (restrictive: no inline scripts, limited connect-src)
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: no-referrer`
- `Cross-Origin-Opener-Policy: same-origin`
- `Permissions-Policy` (disables camera, microphone, geolocation)
- `X-Robots-Tag: noindex` on all private routes

---

## Testing

The frontend has a test suite covering unit and integration tests using **Vitest** and **Testing Library**.

```bash
cd frontend

# Run all tests once
npm run test:run

# Run in watch mode
npm run test

# Run with coverage report
npm run test:coverage
```

### What's covered

- **Unit tests** — utility functions (time formatters, validators, crypto helpers, email shortener, debounce hook, toast interface type guard)
- **Integration tests** — React component behaviour (form validation, rendering, user interactions) for auth pages, the secret form, spinners, and empty state lists

---

## Deployment

The repo includes a `deploy.sh` script and a PM2 `ecosystem.config.cjs` for production deployments on a Linux server.

### With the deploy script

```bash
# On your server, from the repo root
./deploy.sh
```

This will pull latest changes, install dependencies, build the frontend, copy it into `backend/built/public/`, and restart the PM2 process.

### Manual PM2 setup

```bash
# First-time setup
cd backend
npm run build
pm2 start ecosystem.config.cjs
pm2 save
```

The PM2 config runs the compiled `built/server.js`, restarts on crash, limits memory to 350 MB, and writes logs to `/home/deploy/logs/`.

---

## Project Structure

```
monoshare/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma          # MongoDB schema (User, Secret, Session)
│   └── src/
│       ├── constants/             # HTTP status codes, rate limit messages, time constants
│       ├── controllers/           # Route handlers (auth.controller, secret.controller)
│       ├── dtos/                  # TypeScript interfaces for request/response shapes
│       ├── helper/                # computeSecretStatus utility
│       ├── lib/                   # Prisma client singleton, LRU session cache
│       ├── middleware/            # Auth, error handling, rate limiting
│       ├── routers/               # Express route definitions
│       ├── services/              # AuthService, SecretService (hashing, validation, etc.)
│       ├── types/                 # Express type augmentation (req.user, req.session)
│       ├── utils/                 # AppError class
│       └── server.ts              # App entry point
│
└── frontend/
    └── src/
        ├── api/                   # Axios instance + typed API functions (auth, secret)
        ├── components/
        │   ├── guards/            # AuthGuard (protected/guest route wrapper)
        │   ├── icons/             # SVG icon components
        │   ├── layouts/           # Header, Footer
        │   ├── loaders/           # Spinner, BoxSkeleton, PageLoader, SecretSkeleton
        │   └── pages/             # Home, ViewSecret, SecretDetails, MySecrets, Auth pages
        │       └── partials/      # CreateSecretForm, Timeline, Toast, ConfirmationPopup, etc.
        ├── contexts/
        │   └── toast/             # Global toast notification context + provider
        ├── hooks/
        │   ├── authHooks/         # useAuthCheck, useLogin, useLogout, useRegister, useUser
        │   └── secretHooks/       # useCreateSecret, useDeleteSecret, useMySecrets, useViewSecret, etc.
        ├── interfaces/            # TypeScript interfaces (auth, secret, toast, process)
        ├── lib/                   # queryClient
        ├── services/              # createEncryptedSecret orchestration
        ├── test/
        │   ├── integration/       # Component and page tests
        │   └── unit/              # Hook, utility, and interface tests
        ├── utils/
        │   ├── encryption/        # Web Crypto API wrappers (generate, encrypt, decrypt, export/import key)
        │   ├── time/              # Date formatting, time remaining, time percentage
        │   └── validators/        # Form validation (auth, secret)
        ├── App.tsx                # Route definitions + lazy-loaded pages
        ├── main.tsx               # App entry point (QueryClient, Router, ToastProvider)
        └── index.css              # Tailwind v4 + custom CSS (animations, component styles)
```

---

## License

ISC — see `backend/package.json`.

---

<div align="center">
  <p>Built by <a href="https://daniel-jenkins-portfolio.onrender.com">Daniel Jenkins</a></p>
  <p><em>Your secrets are encrypted, never stored in logs, and automatically deleted after viewing.</em></p>
</div>
