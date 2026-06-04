/**
 * Merge and deduplicate results from multiple sources.
 * Interleaves results so no single source dominates the top of the list.
 */
export function mergeResults(...arrays) {
  const seen = new Set()
  const merged = []

  const maxLen = Math.max(...arrays.map((a) => a.length))

  for (let i = 0; i < maxLen; i++) {
    for (const arr of arrays) {
      const item = arr[i]
      if (!item) continue
      if (seen.has(item.id)) continue
      seen.add(item.id)
      merged.push(item)
    }
  }

  return merged
}
