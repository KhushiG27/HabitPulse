# HabitPulse 🌿

I built this because I kept forgetting to drink water and had no idea why I felt tired all the time. Turns out tracking small habits actually helps.

HabitPulse is a personal wellness tracker where you log your daily mood, water intake, sleep, exercise, stress, and notes. It stores everything in a real database so your data doesn't disappear when you clear your browser.

## What it does

- Log your mood, water, sleep, exercise, stress and notes every day
- See weekly trends — avg sleep, water, stress, most common mood
- Track your streak (consecutive days logged)
- Browse past 30 days of entries
- Export your data as a PDF report
- Dark mode (because obviously)

## Tech used

**Frontend** — plain HTML, CSS and JavaScript. No framework, kept it simple on purpose so I could focus on the backend.

**Backend** — Node.js + Express.js REST API with JWT authentication. Passwords are hashed with bcrypt before storing.

**Database** — MongoDB with Mongoose. Each user's entries are stored separately, one document per day.

**Security** — rate limiting on all API routes (stricter on auth), input validation with express-validator, CORS configured for local dev.

## Running it locally

You'll need Node.js and MongoDB installed.

```bash
git clone https://github.com/KhushiG27/HabitPulse.git
cd HabitPulse/backend
npm install
```

Create a `.env` file inside `backend/`:
```
MONGO_URI=mongodb://localhost:27017/habitpulse
JWT_SECRET=pick_any_long_random_string
PORT=5000
```

Start the server:
```bash
node server.js
```

Then open `index.html` with Live Server (VS Code extension) or any static file server. The frontend talks to the backend at `localhost:5000`.

## API routes

| Method | Route | What it does |
|--------|-------|--------------|
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Login, returns JWT |
| GET | `/api/auth/me` | Get logged-in user |
| POST | `/api/entries/:date` | Save or update a day's entry |
| GET | `/api/entries/:date` | Get a specific day |
| GET | `/api/entries` | Last 30 days |
| GET | `/api/entries/analytics/weekly` | Weekly stats (server-side) |
| GET | `/api/entries/export/json` | Export everything |
| DELETE | `/api/entries/:date` | Delete an entry |

## Folder structure

```
HabitPulse/
├── backend/
│   ├── models/
│   │   ├── User.js        
│   │   └── Entry.js       
│   ├── routes/
│   │   ├── auth.js        
│   │   └── entries.js     
│   ├── middleware/
│   │   └── auth.js        
│   ├── server.js          
│   └── .env.example       
├── index.html             
├── style.css              
└── README.md
```

## Known limitations

- No password reset yet
- Works best on mobile screen sizes
- Needs the backend running locally to work (not deployed yet)

---

Made by Khushi Gupta
