"use client"

import { clx } from "@medusajs/ui"
import { useMemo, useState } from "react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { StoreSubscription } from "@types/subscription"

type SubscriptionCardProps = {
  subscription: StoreSubscription
  showOrderLink?: boolean
  "data-testid"?: string
}

const statusClassName: Record<string, string> = {
  active: "bg-green-100 text-green-800",
  pending: "bg-orange-100 text-orange-800",
  expired: "bg-gray-200 text-gray-700",
  cancelled: "bg-red-100 text-red-800",
}

const formatDate = (value?: string | null) => {
  if (!value) {
    return "-"
  }

  return new Date(value).toLocaleString()
}

const SubscriptionCard = ({
  subscription,
  showOrderLink = true,
  "data-testid": dataTestId,
}: SubscriptionCardProps) => {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">(
    "idle"
  )

  const normalizedStatus = useMemo(
    () => subscription.status?.toLowerCase() || "pending",
    [subscription.status]
  )

  const handleCopyLink = async () => {
    if (!subscription.subscription_url) {
      return
    }

    try {
      await navigator.clipboard.writeText(subscription.subscription_url)
      setCopyState("copied")
    } catch {
      setCopyState("failed")
    }
  }

  return (
    <div
      className="rounded-lg border border-gray-200 p-4 bg-white"
      data-testid={dataTestId}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-base-semi">
          {subscription.product_title || "Subscription"}
        </div>
        <span
          className={clx(
            "text-xs px-2 py-1 rounded-full uppercase",
            statusClassName[normalizedStatus] || "bg-gray-100 text-gray-700"
          )}
          data-testid="subscription-status"
        >
          {normalizedStatus}
        </span>
      </div>

      <div className="mt-3 text-small-regular text-ui-fg-subtle">
        <p>
          Expires: <span className="text-ui-fg-base">{formatDate(subscription.expires_at)}</span>
        </p>
        <p>
          Issued: <span className="text-ui-fg-base">{formatDate(subscription.created_at)}</span>
        </p>
        {subscription.marzban_username && (
          <p>
            Username: <span className="text-ui-fg-base">{subscription.marzban_username}</span>
          </p>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        {subscription.subscription_url ? (
          <>
            <a
              href={subscription.subscription_url}
              target="_blank"
              rel="noreferrer"
              className="text-ui-fg-interactive hover:text-ui-fg-interactive-hover text-small-plus"
              data-testid="subscription-link"
            >
              Open subscription link
            </a>
            <button
              type="button"
              className="text-small-plus text-ui-fg-base underline"
              onClick={handleCopyLink}
              data-testid="copy-subscription-link-button"
            >
              Copy link
            </button>
            {copyState === "copied" && (
              <span className="text-small-regular text-green-700">Copied</span>
            )}
            {copyState === "failed" && (
              <span className="text-small-regular text-red-700">
                Copy failed
              </span>
            )}
          </>
        ) : (
          <span className="text-small-regular text-ui-fg-subtle">
            Subscription is being issued. Please refresh in a moment.
          </span>
        )}

        {showOrderLink && (
          <LocalizedClientLink
            href={`/account/orders/details/${subscription.order_id}`}
            className="text-small-plus text-ui-fg-subtle underline"
          >
            View order
          </LocalizedClientLink>
        )}
      </div>
    </div>
  )
}

export default SubscriptionCard
