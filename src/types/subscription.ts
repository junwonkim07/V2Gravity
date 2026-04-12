export type StoreSubscription = {
  id: string
  status: string
  order_id: string
  line_item_id?: string | null
  marzban_username?: string | null
  subscription_url?: string | null
  expires_at?: string | null
  created_at: string
  product_title?: string | null
  metadata?: Record<string, unknown> | null
}

export type StoreSubscriptionListResponse = {
  subscriptions: StoreSubscription[]
}

export type StoreOrderSubscriptionResponse = {
  subscription: StoreSubscription | null
}
