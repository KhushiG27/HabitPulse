# 🌿 HabitPulse

A full-stack wellness tracking app to log and analyze daily habits — mood, water, sleep, exercise, stress, and notes.

## Features

- **User Authentication** — Register & login with JWT-based auth, passwords hashed with bcrypt
- **REST API** — Express.js backend with protected routes
- **MongoDB Database** — Habit entries stored per user with Mongoose schemas
- **Mood** — Log how you're feeling with 5 emoji levels
- **Water** — Track daily glass intake with a visual cup grid
- **Sleep** — Set bedtime and wake-up time to calculate duration
- **Exercise** — Check off activities (walk, stretch, strength, cardio)
- **Stress** — Rate your stress level on a 1–10 slider
- **Notes** — Free-form daily journal entry
- **Weekly Insights** — Averages, bar charts, and personalized tips (server-side analytics)
- **Streak Tracker** — Tracks consecutive logged days
- **Export Data** — Download all your entries as JSON
- **Dark Mode** — Respects system preference, toggleable manually
- **Rate Limiting** — API protected against abuse
- **Date Navigation** — Log or review any past day

## Tech Stack

- **Frontend:** Vanilla HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Auth:** JWT (jsonwebtoken) + bcryptjs
- **Security:** express-rate-limit, express-validator, CORS

## Project Structure

```
HabitPulse/
├── backend/
│   ├── models/
│   │   ├── User.js          # Mongoose user schema
│   │   └── Entry.js         # Mongoose habit entry schema
│   ├── routes/
│   │   ├── auth.js          # POST /api/auth/register, /login, GET /me
│   │   └── entries.js       # GET/POST /api/entries/:date, analytics, export
│   ├── middleware/
│   │   └── auth.js          # JWT verification middleware
│   ├── server.js            # Express app, MongoDB connection
│   └── .env.example         # Environment variable template
├── index.html               # Frontend app
├── style.css                # All styles including dark mode
└── README.md
```

## API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Create account | Public |
| POST | `/api/auth/login` | Login, get JWT | Public |
| GET | `/api/auth/me` | Get current user | Private |
| POST | `/api/entries/:date` | Save/update entry | Private |
| GET | `/api/entries/:date` | Get entry by date | Private |
| GET | `/api/entries` | Get last 30 entries | Private |
| GET | `/api/entries/analytics/weekly` | Weekly stats | Private |
| GET | `/api/entries/export/json` | Export all data | Private |
| DELETE | `/api/entries/:date` | Delete entry | Private |

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)

### Setup

```bash
git clone https://github.com/KhushiG27/HabitPulse.git
cd HabitPulse/backend
npm install
```

Create a `.env` file in the `backend/` folder:
```
MONGO_URI=mongodb://localhost:27017/habitpulse
JWT_SECRET=your_secret_key_here
PORT=5000
```

Start the backend:
```bash
node server.js
```

Then open `index.html` in your browser (use Live Server or any static file server).

## License

MIT
