# MonoShare

> **Zero-knowledge, end-to-end encrypted secret sharing. Delivered. Viewed. Deleted.**

MonoShare is a privacy-first secret sharing platform that lets you securely transmit passwords, API keys, tokens, and sensitive messages via single-use links — all encrypted entirely in the browser before the data ever leaves your device.

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
- [Project Structure](#project-structure)
- [License](#license)

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
- Personal **My Secrets dashboard** (Active / Viewed / Expired)
- Restrict access to a **specific recipient email address**
- **Timeline view** with creation, expiration, and view timestamps
- **Manual deletion** before expiration
- Secret detail pages with share link and status tracking

### Security
- Zero-knowledge architecture — plaintext never reaches the server
- AES-128-GCM client-side encryption
- HMAC-SHA256 session token hashing
- Argon2 password hashing
- HttpOnly, Secure, SameSite=Strict cookies
- Rate limiting on all sensitive endpoints
- HTTP security headers (CSP, X-Frame-Options, Referrer-Policy, etc.)
- LRU session cache to reduce database load

---

## Tech Stack

### Frontend
| Tool | Purpose |
|------|---------|
| React 19 | UI framework |
| TypeScript | Type safety |
| Vite 7 | Build tool |
| Tailwind CSS v4 | Styling |
| TanStack Query v5 | Server state management |
| Framer Motion | Animations |
| Axios | HTTP client |
| React Router v7 | Client-side routing |
| Web Crypto API | AES-128-GCM encryption |

### Backend
| Tool | Purpose |
|------|---------|
| Node.js + Express | HTTP server |
| TypeScript | Type safety |
| Prisma 6 | ORM |
| MongoDB | Database |
| Argon2 | Password hashing |
| nanoid | Secure slug generation |
| lru-cache | In-memory session caching |
| express-rate-limit | Rate limiting |

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

---

## Getting Started

### Prerequisites
- Node.js 20+
- MongoDB instance (local or Atlas)
- npm or yarn

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/monoshare.git
cd monoshare
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file in `/backend`:

```env
DATABASE_URL=mongodb+srv://...
SESSION_SECRET=your-super-secret-hmac-key
FRONTEND_URL=http://localhost:9000
PORT=8001
NODE_ENV=development
```

Push the Prisma schema to your database:

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
# Build frontend
cd frontend && npm run build

# Copy built files to backend/src/public
cp -r dist/* ../backend/src/public/

# Start backend in production
cd ../backend
NODE_ENV=production npm run dev
```

The backend will serve the frontend statically in production mode.

---

## Environment Variables

### Backend (`backend/.env`)

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | ✅ | MongoDB connection string |
| `SESSION_SECRET` | ✅ | Secret key used for HMAC-SHA256 session token hashing |
| `FRONTEND_URL` | ✅ | Frontend origin (used for CORS and share URL generation) |
| `PORT` | ❌ | Server port (default: `5000`) |
| `NODE_ENV` | ❌ | `development` or `production` |

---

## API Reference

All routes are prefixed with `/api`.

### Auth — `/api/auth`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/register` | Public | Create a new account |
| `POST` | `/signin` | Public | Sign in and receive session cookie |
| `POST` | `/logout` | Required | Invalidate current session |
| `GET` | `/user-check` | Required | Verify session and get current user |

### Secrets — `/api/secret`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/create` | Optional | Create a new encrypted secret |
| `GET` | `/my-secrets` | Required | List all secrets owned by current user |
| `GET` | `/details/:secretid` | Required | Get full metadata for a specific secret |
| `GET` | `/metadata/:secretid` | Optional | Check if secret is accessible (password-protected, expired, etc.) |
| `POST` | `/view/:secretid` | Optional | View and permanently erase a secret |
| `DELETE` | `/delete/:secretid` | Required | Manually delete a secret |

### Rate Limits

| Endpoint | Limit | Window |
|----------|-------|--------|
| `/auth/register` | 3 requests | 10 min |
| `/auth/signin` | 10 requests | 10 min |
| `/secret/create` | 20 requests | 10 min |
| All other API routes | 100 requests | 10 min |

---

## Security Model

### What we CAN'T read
The plaintext content of any secret. Ever. The AES-128-GCM key is generated locally and stored exclusively in the URL hash fragment — which browsers do not transmit in HTTP requests. We store only the encrypted ciphertext and IV. Without the key (which lives only in the shareable URL), the stored data is cryptographically meaningless.

### What we CAN see
Secret metadata: slugs, creation timestamps, expiration timestamps, optional recipient email addresses, and account email addresses. This metadata is not zero-knowledge protected.

### Session security
- Session tokens are 32 random bytes from `crypto.randomBytes`
- Only the HMAC-SHA256 hash of the token is stored in the database
- Cookies are HttpOnly, Secure, and SameSite=Strict
- Sessions expire after 7 days with sliding expiry

### Password hashing
Both account passwords and optional secret access passwords are hashed with **Argon2** (a memory-hard algorithm). Plaintext passwords are never stored.

---

## Project Structure

```
monoshare/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma          # MongoDB schema (User, Secret, Session)
│   │   └── prisma-client.ts       # Prisma client singleton
│   ├── src/
│   │   ├── constants/             # HTTP status codes, rate limit messages, time constants
│   │   ├── controllers/           # Route handlers (auth, secret)
│   │   ├── dtos/                  # TypeScript interfaces for request/response shapes
│   │   ├── helper/                # computeSecretStatus utility
│   │   ├── lib/                   # LRU session cache
│   │   ├── middleware/            # Auth, error handling, rate limiting
│   │   ├── routers/               # Express route definitions
│   │   ├── services/              # AuthService, SecretService (hashing, validation, etc.)
│   │   ├── types/                 # Express type augmentation (req.user, req.session)
│   │   ├── utils/                 # AppError class
│   │   └── server.ts              # App entry point
│   ├── prisma.config.ts
│   ├── tsconfig.json
│   └── package.json
│
└── frontend/
    ├── public/                    # Static assets
    └── src/
        ├── components/
        │   ├── guards/            # AuthGuard (protected/guest route wrapper)
        │   ├── icons/             # SVG icon components
        │   ├── loaders/           # Spinner, BoxSkeleton, PageLoader
        │   └── pages/             # Home, ViewSecret, SecretDetails, MySecrets, Auth pages
        │       └── partials/      # CreateSecretForm, Timeline, Header, Footer, Toast, etc.
        ├── contexts/
        │   └── toast/             # Global toast notification context + provider
        ├── hooks/
        │   ├── authHooks/         # useAuthCheck, useLogin, useLogout, useRegister, useUser
        │   └── secretHooks/       # useCreateSecret, useDeleteSecret, useMySecrets, useViewSecret, etc.
        ├── interfaces/            # TypeScript interfaces (auth, secret, toast, process)
        ├── lib/                   # axios instance, queryClient, auth/secret API functions
        ├── services/              # createEncryptedSecret orchestration
        ├── utils/
        │   ├── encryption/        # Web Crypto API wrappers (generate, encrypt, decrypt, export/import key)
        │   ├── time/              # Date formatting, time remaining, time percentage
        │   └── validators/        # Form validation (auth, secret)
        ├── App.tsx
        ├── main.tsx
        └── index.css              # Tailwind + custom CSS (animations, component styles)
```

---

## License

ISC — see `backend/package.json`.

---

<div align="center">
  <p>Built by <a href="https://daniel-jenkins-portfolio.onrender.com">Daniel Jenkins</a></p>
  <p><em>Your secrets are encrypted, never stored in logs, and automatically deleted after viewing.</em></p>
</div>
