# Marzban + Medusa Integration Contract

This storefront now expects custom Medusa Store API endpoints for subscriptions.

## Storefront calls

1. `GET /store/subscriptions/me`
   - Auth: customer JWT (`Authorization: Bearer <token>`)
   - Response:

```json
{
  "subscriptions": [
    {
      "id": "sub_123",
      "status": "active",
      "order_id": "order_123",
      "line_item_id": "item_123",
      "marzban_username": "user_001",
      "subscription_url": "https://example.com/sub/xxx",
      "expires_at": "2026-05-01T00:00:00.000Z",
      "created_at": "2026-04-10T12:00:00.000Z",
      "product_title": "Pro 30 Days",
      "metadata": {}
    }
  ]
}
```

2. `GET /store/orders/:id/subscription`
   - Auth: customer JWT
   - Must verify the order belongs to the logged-in customer
   - Response:

```json
{
  "subscription": {
    "id": "sub_123",
    "status": "active",
    "order_id": "order_123",
    "line_item_id": "item_123",
    "marzban_username": "user_001",
    "subscription_url": "https://example.com/sub/xxx",
    "expires_at": "2026-05-01T00:00:00.000Z",
    "created_at": "2026-04-10T12:00:00.000Z",
    "product_title": "Pro 30 Days",
    "metadata": {}
  }
}
```

## Backend issue flow (Medusa)

1. Order payment confirmed event is emitted.
2. Worker handles event and checks if subscription already exists for each paid line item.
3. Worker calls Marzban API to create/update user and issue a subscription URL.
4. Worker stores subscription row linked to order and customer.
5. Optional: send email with subscription URL.

## Recommended DB table fields

- `id`
- `order_id`
- `line_item_id`
- `customer_id`
- `status` (`pending`, `active`, `expired`, `cancelled`)
- `marzban_username`
- `subscription_url`
- `expires_at`
- `metadata` (jsonb)
- `created_at`
- `updated_at`

## Required environment variables (Medusa backend)

- `MARZBAN_BASE_URL`
- `MARZBAN_API_KEY`
- `MARZBAN_TIMEOUT_MS` (optional)

## Security notes

- Never expose Marzban API key to storefront.
- Always enforce customer ownership checks on store endpoints.
- Add idempotency key logic for event retries.
- Log masked subscription URLs only.
