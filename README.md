# SubTracker API

A backend REST API for tracking and managing personal subscriptions — built with Node.js, Express, and MongoDB. It handles user authentication, subscription CRUD, and automated email reminders for upcoming renewals.

## Features

- 🔐 **Authentication** — JWT-based sign-up, sign-in, and sign-out, with passwords hashed via `bcrypt`
- 📦 **Subscription management** — create, read, update, and delete subscriptions per user
- ⏰ **Automated renewal reminders** — scheduled email workflows powered by Upstash Workflow, sent via `nodemailer`
- 🛡️ **Security middleware** — request protection (rate limiting / bot detection) via Arcjet
- 🗄️ **MongoDB + Mongoose** — schema-based data modeling for users and subscriptions
- 📝 **Request logging** — via `morgan`
- 🍪 **Cookie-based session support** — via `cookie-parser`

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB (Mongoose ODM) |
| Auth | JSON Web Tokens (`jsonwebtoken`) + `bcrypt` |
| Security | Arcjet (`@arcjet/node`, `@arcjet/inspect`) |
| Workflows | Upstash Workflow (`@upstash/workflow`) |
| Email | Nodemailer |
| Dates | Day.js |
| Linting | ESLint |
| Dev tooling | Nodemon |

## Project Structure

```
SubTracker_API/
├── config/          # Environment & service configuration (DB, Arcjet, mail, etc.)
├── Database/         # Database connection setup
├── controller/       # Route controllers (auth, users, subscriptions, workflows)
├── middlewares/       # Custom Express middleware (auth guard, error handling, Arcjet, etc.)
├── models/            # Mongoose schemas (User, Subscription)
├── routes/            # Route definitions
├── utils/             # Helpers (email templates, senders, etc.)
├── app.js             # Application entry point
└── package.json
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- A MongoDB instance (local or Atlas)
- An Upstash account (for QStash / Workflow, used for scheduled reminders)
- An Arcjet account and API key
- A Gmail (or other SMTP) account for sending reminder emails via Nodemailer

### Installation

```bash
git clone https://github.com/FaroukArdam012/SubTracker_API.git
cd SubTracker_API
npm install
```

### Environment Variables

Create a `.env` (or `.env.development.local`) file in the project root with values along these lines:

```env
# Server
PORT=5500
SERVER_URL=http://localhost:5500
NODE_ENV=development

# Database
DB_URI=your-mongodb-connection-string

# JWT
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=1d

# Arcjet
ARCJET_KEY=your-arcjet-key
ARCJET_ENV=development

# Upstash / QStash (email reminder workflows)
QSTASH_URL=http://127.0.0.1:8080
QSTASH_TOKEN=your-qstash-token

# Nodemailer
EMAIL_PASSWORD=your-app-password
```

> Adjust the variable names to match what's read in `config/` — this list reflects the standard setup for this stack.

### Running the App

```bash
# Development (auto-restart with nodemon)
npm run dev

# Production
npm start
```

The API will be available at `http://localhost:5500` (or whichever `PORT` you configure).

## API Overview

The API is organized around four resource groups:

- **Auth** — sign-up, sign-in, and sign-out endpoints
- **Users** — user retrieval and management
- **Subscriptions** — create, list, update, cancel, and delete subscriptions; fetch a user's subscriptions and upcoming renewals
- **Workflows** — triggers the Upstash-powered reminder workflow that emails users ahead of a subscription's renewal date

Exact route paths and payloads are defined in the `routes/` and `controller/` directories.

## Roadmap Ideas

- Request/response validation layer
- API documentation (e.g. Swagger/OpenAPI)
- Automated test suite
- Docker support for local/dev environments

## License

No license specified yet — consider adding one (e.g. MIT) if this project is intended for public/open-source use.