/**
 * Normalise an Etsy listing into the common item shape.
 */
export function formatEtsyItem(listing, category) {
  return {
    id: `etsy-${listing.listing_id}`,
    title: listing.title,
    image: listing.images?.[0]?.url_570xN || listing.images?.[0]?.url_fullxfull || null,
    price: listing.price
      ? `$${(listing.price.amount / listing.price.divisor).toFixed(2)}`
      : null,
    source: 'Etsy',
    category: category || null,
    url: listing.url,
  }
}

/**
 * Normalise an eBay item summary into the common item shape.
 */
export function formatEbayItem(item, category) {
  return {
    id: `ebay-${item.itemId}`,
    title: item.title,
    image: item.image?.imageUrl || null,
    price: item.price?.value
      ? `$${parseFloat(item.price.value).toFixed(2)}`
      : null,
    source: 'eBay',
    category: category || null,
    url: item.itemWebUrl,
  }
}
