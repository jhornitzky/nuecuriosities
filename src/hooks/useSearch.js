import { useState, useCallback } from 'react'
import { interpretSearch } from '../api/anthropic'
import { searchProducts } from '../api/search'

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
      const items = await searchProducts(keywords, interp.category)
      setResults(items)
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }, [])

  return { results, interpretation, loading, error, search }
}
