import { Metadata } from "next"

import SubscriptionOverview from "@modules/account/components/subscription-overview"
import { listMySubscriptions } from "@lib/data/subscriptions"

export const metadata: Metadata = {
  title: "Subscriptions",
  description: "Manage your active and expired subscriptions.",
}

export default async function SubscriptionsPage() {
  const subscriptions = (await listMySubscriptions().catch(() => [])) || []

  return (
    <div className="w-full" data-testid="subscriptions-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">Subscriptions</h1>
        <p className="text-base-regular">
          View and manage your issued Marzban subscriptions.
        </p>
      </div>
      <SubscriptionOverview subscriptions={subscriptions} />
    </div>
  )
}
