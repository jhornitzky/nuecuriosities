// NOTE: The Anthropic SDK is not safe to call directly from a browser in production
// because it exposes your API key. For a single-user local app this is acceptable,
// but consider a serverless proxy before sharing publicly.

const ANTHROPIC_API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY

const BASE_URL = 'https://api.anthropic.com/v1/messages'
const MODEL = 'claude-sonnet-4-20250514'

async function callClaude(prompt) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 512,
      messages: [{ role: 'user', content: prompt }],
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Anthropic API error ${res.status}: ${err}`)
  }

  const data = await res.json()
  const text = data.content[0].text.trim()

  // Strip markdown code fences if present
  const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/)
  const jsonStr = jsonMatch ? jsonMatch[1] : text

  return JSON.parse(jsonStr)
}

/**
 * Interpret a free-text search query into structured search terms.
 * Returns { keywords: string[], category: string, vibe: string, description: string }
 */
export async function interpretSearch(query) {
  const prompt = `You are a search assistant for a shop selling unusual, unique, and hard-to-find objects.
The user has typed: "${query}"
Return a JSON object with:
- keywords: string[] (3-6 search terms to use on Etsy/eBay)
- category: string (one of: taxidermy, candles, wallpaper, ceramics, curiosities, vintage, textiles, art)
- vibe: string (one of: dark academia, cottagecore, wunderkammer, maximalist, japandi, gothic, surrealist, other)
- description: string (1 sentence describing what the user is looking for, in plain English)
Respond with JSON only.`

  return callClaude(prompt)
}

/**
 * Get a curated "Surprise me" suggestion.
 * Returns { title: string, description: string, category: string, suggestedSearchTerms: string[] }
 */
export async function getSurpriseSuggestion() {
  const prompt = `You are a curator of unusual and beautiful objects. Suggest one surprising, specific item
that someone with eclectic taste would love — like a taxidermied butterfly, a hyper-real food candle,
or a hand-painted wallpaper panel. Return JSON with:
- title: string
- description: string (2 sentences, evocative)
- category: string
- suggestedSearchTerms: string[]
Respond with JSON only.`

  return callClaude(prompt)
}

/**
 * Get search terms for a vibe-based browse.
 * Returns { keywords: string[], description: string }
 */
export async function getVibeSearchTerms(vibe) {
  const prompt = `You are a curator for a shop selling unusual, beautiful, and hard-to-find objects.
A user wants to browse items with a "${vibe}" aesthetic.
Return a JSON object with:
- keywords: string[] (4-6 specific search terms that would find items matching this aesthetic on Etsy or eBay)
- description: string (1 evocative sentence describing this vibe's aesthetic)
Respond with JSON only.`

  return callClaude(prompt)
}
