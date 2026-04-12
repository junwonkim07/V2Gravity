"use server"

import { sdk } from "@lib/config"
import medusaError from "@lib/util/medusa-error"
import { getAuthHeaders, getCacheOptions } from "./cookies"
import {
  StoreOrderSubscriptionResponse,
  StoreSubscription,
  StoreSubscriptionListResponse,
} from "@types/subscription"

export const listMySubscriptions = async () => {
  const headers = {
    ...(await getAuthHeaders()),
  }

  const next = {
    ...(await getCacheOptions("subscriptions")),
  }

  return sdk.client
    .fetch<StoreSubscriptionListResponse>("/store/subscriptions/me", {
      method: "GET",
      headers,
      next,
      cache: "force-cache",
    })
    .then(({ subscriptions }) => subscriptions)
    .catch((err) => {
      if (err?.response?.status === 404) {
        return [] as StoreSubscription[]
      }

      return medusaError(err)
    })
}

export const retrieveOrderSubscription = async (orderId: string) => {
  const headers = {
    ...(await getAuthHeaders()),
  }

  const next = {
    ...(await getCacheOptions("subscriptions")),
  }

  return sdk.client
    .fetch<StoreOrderSubscriptionResponse>(
      `/store/orders/${orderId}/subscription`,
      {
        method: "GET",
        headers,
        next,
        cache: "force-cache",
      }
    )
    .then(({ subscription }) => subscription)
    .catch((err) => {
      if (err?.response?.status === 404) {
        return null
      }

      return medusaError(err)
    })
}
