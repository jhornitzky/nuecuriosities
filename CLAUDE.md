# Nue Curiosities — Project Brief

## What this is

A personal discovery app for finding unique, unusual, and hard-to-find objects. Built for one user (my sister) who collects things like taxidermied butterflies, hyper-real food candles, and hand-painted wallpaper. The goal is a single place to search, browse, get surprised, and save finds — pulling from Etsy, eBay, and niche sellers, with AI-powered natural language search.

This is not a marketplace. No checkout, no listings management. Pure discovery and wishlist.

---

## Core features

### 1. Natural language search
- A single search bar: "describe something unusual…"
- Input goes to the Anthropic API (claude-sonnet-4-20250514) which interprets the query and returns structured search terms + category tags
- Those terms are used to query Etsy API and eBay API in parallel
- Results are ranked by uniqueness/relevance and displayed as cards

### 2. Surprise me
- A button that surfaces one curated "today's find"
- Cycles through a pre-curated list OR calls the Anthropic API with a random unusual category prompt
- Shows: large image, title, source, short AI-generated description, "View item" link, "Next find" button
- "View item" opens the original listing in a new tab

### 3. Browse by vibe
- Aesthetic-first browsing, not rigid categories
- Vibes (not filters): Dark academia, Cottagecore, Maximalist baroque, Wunderkammer, Japandi, Gothic Victorian, Coastal grandmother, Surrealist
- Each vibe sends a themed prompt to the Anthropic API which returns search terms, then queries Etsy + eBay
- Display as a horizontal scroll of cards under each vibe heading

### 4. Save & revisit (wishlist)
- Heart icon on every card to save
- Saved items stored in localStorage (no login needed — single user)
- Dedicated "Saved" view with count badge in sidebar
- Saved items grouped by category tag

---

## Categories / taxonomy

Used for tagging results and sidebar filtering:

- Taxidermy & nature (butterflies, beetles, pressed flowers, specimens)
- Candles & scent (food candles, sculptural candles, unusual scents)
- Wallpaper & print (hand-painted, chinoiserie, toile, botanical)
- Ceramics (hand-thrown, sculptural, unusual glazes)
- Curiosities (antique scientific instruments, oddities, memento mori)
- Vintage objects (mid-century, Victorian, art deco)
- Textiles (embroidered, woven, tapestry)
- Art & illustration (original works, unusual prints)

---

## Tech stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Router for navigation between Discover / Search / Saved views

### APIs
- **Anthropic API** — `claude-sonnet-4-20250514` for natural language search interpretation and "Surprise me" generation
- **Etsy API v3** — search listings by keyword, filter by category
- **eBay Browse API** — search items, filter by condition and category

### State
- React useState / useReducer for UI state
- localStorage for saved/wishlist items (no backend needed)

### Environment variables needed
```
VITE_ANTHROPIC_API_KEY=
VITE_ETSY_API_KEY=
VITE_EBAY_APP_ID=
```

---

## Folder structure

```
curiosity-shop/
├── CLAUDE.md
├── .env
├── index.html
├── vite.config.js
├── tailwind.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── api/
│   │   ├── anthropic.js      # AI search interpretation + surprise me
│   │   ├── etsy.js           # Etsy API calls
│   │   └── ebay.js           # eBay API calls
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   ├── SearchBar.jsx
│   │   ├── ItemCard.jsx
│   │   ├── SurprisePanel.jsx
│   │   ├── VibeBrowser.jsx
│   │   └── SavedItems.jsx
│   ├── views/
│   │   ├── Discover.jsx
│   │   ├── Search.jsx
│   │   └── Saved.jsx
│   ├── hooks/
│   │   ├── useSearch.js
│   │   ├── useSaved.js
│   │   └── useSurprise.js
│   └── utils/
│       ├── mergeResults.js   # deduplicate + rank Etsy + eBay results
│       └── formatItem.js     # normalise item shape across sources
```

---

## UI design notes

- Sidebar: 200px, category dots (coloured), saved count badge
- Main area: topbar with search + surprise button, scrollable content below
- Cards: image thumbnail, title, source badge (Etsy / eBay / Niche), save heart, category tag pill
- Colour: purple accent (#534AB7) for active states, hearts, tags
- Vibe browsing: horizontal scroll rows per vibe, not a grid
- No gradients, no heavy shadows — clean flat surfaces
- Fonts: something with personality, not Inter or Roboto. Try Fraunces + DM Sans, or Playfair Display + Jost

---

## Anthropic API usage

### Search interpretation prompt
```
You are a search assistant for a shop selling unusual, unique, and hard-to-find objects.
The user has typed: "{query}"
Return a JSON object with:
- keywords: string[] (3-6 search terms to use on Etsy/eBay)
- category: string (one of: taxidermy, candles, wallpaper, ceramics, curiosities, vintage, textiles, art)
- vibe: string (one of: dark academia, cottagecore, wunderkammer, maximalist, japandi, gothic, surrealist, other)
- description: string (1 sentence describing what the user is looking for, in plain English)
Respond with JSON only.
```

### Surprise me prompt
```
You are a curator of unusual and beautiful objects. Suggest one surprising, specific item
that someone with eclectic taste would love — like a taxidermied butterfly, a hyper-real food candle,
or a hand-painted wallpaper panel. Return JSON with:
- title: string
- description: string (2 sentences, evocative)
- category: string
- suggestedSearchTerms: string[]
Respond with JSON only.
```

---

## What to build first

1. Project scaffold (Vite + React + Tailwind)
2. Sidebar + layout shell
3. ItemCard component
4. Anthropic search interpretation (api/anthropic.js)
5. Etsy API integration (api/etsy.js)
6. Search view end-to-end
7. Surprise me feature
8. Vibe browser
9. Saved/wishlist view
10. Polish: transitions, empty states, loading skeletons

---

## Out of scope (for now)

- User accounts / login
- Checkout or purchasing
- Push notifications
- Mobile app (web-first, but make it responsive)
- Price tracking

---

## Permissions & safety

- Only run npm scripts defined in package.json
- Do not read or write any dotfiles (.env, .gitconfig, etc.)
- Do not access anything outside the /src directory without asking
- Do not run curl, wget, or any network commands directly
- Always ask before installing new npm packages
- Never use sudo
