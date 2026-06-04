import { formatEbayItem } from '../utils/formatItem'

const EBAY_APP_ID = import.meta.env.VITE_EBAY_APP_ID
const BASE_URL = 'https://api.ebay.com/buy/browse/v1'

export async function searchEbay(keywords, category) {
  const params = new URLSearchParams({
    q: keywords,
    limit: '24',
    filter: 'conditionIds:{1000|1500|2000|2500|3000}',
  })

  const res = await fetch(`${BASE_URL}/item_summary/search?${params}`, {
    headers: {
      Authorization: `Bearer ${EBAY_APP_ID}`,
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) throw new Error(`eBay API error ${res.status}`)

  const data = await res.json()
  return (data.itemSummaries || []).map((item) => formatEbayItem(item, category))
}
