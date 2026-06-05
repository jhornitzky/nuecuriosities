# Nue Curiousities

A personal discovery app for finding unusual, hard-to-find objects — taxidermied butterflies, hyper-real food candles, hand-painted wallpaper, and the like. Built for one person. Not a marketplace — pure discovery and wishlist.

Search in plain English, browse by vibe, or hit **Surprise me** to see what turns up.

---

## Stack

- React + Vite + Tailwind CSS
- Anthropic API (`claude-sonnet-4-20250514`) — natural language search interpretation
- Etsy API v3 + eBay Browse API — live product results
- localStorage — wishlist, no backend needed

---

## Setup

```bash
npm install
cp .env.example .env
# fill in your keys (see below)
npm run dev
```

Open `http://localhost:5173`.

### Environment variables

```
VITE_ANTHROPIC_API_KEY=   # console.anthropic.com
VITE_ETSY_API_KEY=        # etsy.com/developers
VITE_EBAY_APP_ID=         # developer.ebay.com
```

---

## Features

- **Natural language search** — describe what you want, Claude interprets it into search terms
- **Surprise me** — AI-curated find of the moment, refresh for another
- **Browse by vibe** — Dark academia, Wunderkammer, Cottagecore, and more
- **Wishlist** — heart any item to save it, grouped by category
