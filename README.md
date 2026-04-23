# 🌿 Wellness Tracker

A lightweight, single-file wellness tracking app that runs entirely in the browser — no backend, no account required. All data is stored locally in `localStorage`.

## Features

- **Mood** — log how you're feeling with 5 emoji levels
- **Water** — track daily glass intake with a visual cup grid
- **Sleep** — set bedtime and wake-up time to calculate duration
- **Exercise** — check off activities (walk, stretch, strength, cardio)
- **Stress** — rate your stress level on a 1–10 slider
- **Notes** — free-form daily journal entry
- **Insights** — weekly averages, bar charts, and personalized tips
- **History** — browse and revisit past 30 days of entries
- **Streak** — tracks consecutive logged days with visual indicators
- **Dark mode** — respects system preference, toggleable manually
- **Date navigation** — log or review any past day

## Getting Started

No build step or dependencies required.

```bash
git clone https://github.com/KhushiG27/wellness-tracker.git
cd wellness-tracker
```

Then open `index.html` in your browser — that's it.

Or serve it locally with any static file server:

```bash
# Python
python -m http.server 8080

# Node (npx)
npx serve .
```

## Tech Stack

- Vanilla HTML, CSS, JavaScript
- No frameworks, no dependencies
- `localStorage` for persistence

## Project Structure

```
wellness-tracker/
├── index.html   # App markup + all JavaScript
├── style.css    # All styles including dark mode and responsive layout
└── README.md
```

## License

MIT
