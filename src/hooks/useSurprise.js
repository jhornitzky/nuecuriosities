import { useState, useCallback } from 'react'
import { getSurpriseSuggestion } from '../api/anthropic'
import { searchEtsy } from '../api/etsy'
import { searchEbay } from '../api/ebay'
import { mergeResults } from '../utils/mergeResults'

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
      const [etsyItems, ebayItems] = await Promise.allSettled([
        searchEtsy(keywords, s.category),
        searchEbay(keywords, s.category),
      ])

      const etsy = etsyItems.status === 'fulfilled' ? etsyItems.value : []
      const ebay = ebayItems.status === 'fulfilled' ? ebayItems.value : []

      setItems(mergeResults(etsy, ebay))
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }, [])

  return { suggestion, items, loading, error, fetchSurprise }
}
