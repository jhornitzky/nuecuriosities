import { useState, useCallback } from 'react'
import { getSurpriseSuggestion } from '../api/anthropic'
import { searchProducts } from '../api/search'

export function useSurprise() {
  const [suggestion, setSuggestion] = useState(null)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchSurprise = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const s = await getSurpriseSuggestion()
      setSuggestion(s)

      const keywords = s.suggestedSearchTerms?.join(' ') || s.title
      const found = await searchProducts(keywords, s.category, { num: 12 })
      setItems(found)
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }, [])

  return { suggestion, items, loading, error, fetchSurprise }
}
