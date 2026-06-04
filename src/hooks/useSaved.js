import { useState, useCallback } from 'react'

const STORAGE_KEY = 'curiosity-shop-saved'

function loadSaved() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

function persistSaved(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export function useSaved() {
  const [saved, setSaved] = useState(loadSaved)

  const toggleSave = useCallback((item) => {
    setSaved((prev) => {
      const exists = prev.some((s) => s.id === item.id)
      const next = exists ? prev.filter((s) => s.id !== item.id) : [...prev, item]
      persistSaved(next)
      return next
    })
  }, [])

  const isSaved = useCallback(
    (item) => saved.some((s) => s.id === item.id),
    [saved]
  )

  return { saved, toggleSave, isSaved }
}
