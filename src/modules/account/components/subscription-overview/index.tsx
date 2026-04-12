import { Button } from "@medusajs/ui"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import SubscriptionCard from "@modules/subscriptions/components/subscription-card"
import { StoreSubscription } from "@types/subscription"

const SubscriptionOverview = ({
  subscriptions,
}: {
  subscriptions: StoreSubscription[]
}) => {
  if (subscriptions.length) {
    return (
      <div className="flex flex-col gap-y-4" data-testid="subscriptions-list">
        {subscriptions.map((subscription) => (
          <SubscriptionCard
            key={subscription.id}
            subscription={subscription}
            data-testid="subscription-card"
          />
        ))}
      </div>
    )
  }

  return (
    <div
      className="w-full flex flex-col items-center gap-y-4"
      data-testid="no-subscriptions-container"
    >
      <h2 className="text-large-semi">No subscriptions yet</h2>
      <p className="text-base-regular text-center max-w-xl">
        After a successful payment, your Marzban subscription will be issued and
        visible here.
      </p>
      <div className="mt-4">
        <LocalizedClientLink href="/store" passHref>
          <Button data-testid="browse-plans-button">Browse plans</Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default SubscriptionOverview
