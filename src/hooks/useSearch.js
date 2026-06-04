import { useState, useCallback } from 'react'
import { interpretSearch } from '../api/anthropic'
import { searchEtsy } from '../api/etsy'
import { searchEbay } from '../api/ebay'
import { mergeResults } from '../utils/mergeResults'

export function useSearch() {
  const [results, setResults] = useState([])
  const [interpretation, setInterpretation] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const search = useCallback(async (query) => {
    setLoading(true)
    setError(null)
    setResults([])
    setInterpretation(null)

    try {
      const interp = await interpretSearch(query)
      setInterpretation(interp)

      const keywords = interp.keywords?.join(' ') || query
      const [etsyItems, ebayItems] = await Promise.allSettled([
        searchEtsy(keywords, interp.category),
        searchEbay(keywords, interp.category),
      ])

      const etsy = etsyItems.status === 'fulfilled' ? etsyItems.value : []
      const ebay = ebayItems.status === 'fulfilled' ? ebayItems.value : []

      setResults(mergeResults(etsy, ebay))
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }, [])

  return { results, interpretation, loading, error, search }
}
