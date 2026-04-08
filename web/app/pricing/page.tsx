import PricingCard from "@/components/PricingCard"

const plans = [
  {
    title: "Starter",
    price: "$5",
    period: "month",
    priceId: "price_starter_id", // Replace with real Stripe Price ID
    features: ["1 Device", "100GB Data", "Standard Servers", "24/7 Support"],
  },
  {
    title: "Pro",
    price: "$12",
    period: "3 months",
    priceId: "price_pro_id", // Replace with real Stripe Price ID
    features: ["3 Devices", "Unlimited Data", "High Speed Servers", "Priority Support"],
    recommended: true,
  },
  {
    title: "Annual",
    price: "$40",
    period: "year",
    priceId: "price_annual_id", // Replace with real Stripe Price ID
    features: ["5 Devices", "Unlimited Data", "Dedicated IP", "24/7 VIP Support"],
  },
]

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-base font-semibold leading-7 text-zinc-600 dark:text-zinc-400">Pricing</h2>
        <p className="mt-2 text-4xl font-bold tracking-tight text-black dark:text-white sm:text-5xl">
          Choose the right plan for your privacy
        </p>
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        Secure your connection with our high-speed VPN servers. Simple pricing, no hidden fees.
      </p>
      <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8">
        {plans.map((plan) => (
          <PricingCard key={plan.title} {...plan} />
        ))}
      </div>
    </div>
  )
}
