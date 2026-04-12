import { HttpTypes } from "@medusajs/types"

const lineItemRequiresShipping = (lineItem: HttpTypes.StoreCartLineItem) => {
  const item = lineItem as HttpTypes.StoreCartLineItem & {
    requires_shipping?: boolean
    variant?: {
      metadata?: Record<string, unknown> | null
      product?: {
        metadata?: Record<string, unknown> | null
      } | null
    } | null
    metadata?: Record<string, unknown> | null
  }

  if (typeof item.requires_shipping === "boolean") {
    return item.requires_shipping
  }

  const subscriptionFlag =
    item.variant?.product?.metadata?.is_subscription ??
    item.variant?.metadata?.is_subscription ??
    item.metadata?.is_subscription

  if (subscriptionFlag === true || subscriptionFlag === "true") {
    return false
  }

  return true
}

export const cartHasPhysicalItems = (cart: HttpTypes.StoreCart | null) => {
  if (!cart?.items?.length) {
    return false
  }

  return cart.items.some((lineItem) => lineItemRequiresShipping(lineItem))
}

export const isDigitalOnlyCart = (cart: HttpTypes.StoreCart | null) => {
  if (!cart?.items?.length) {
    return false
  }

  return !cartHasPhysicalItems(cart)
}
