interface PricingCardProps {
  title: string
  price: string
  period: string
  features: string[]
  priceId: string
  recommended?: boolean
}

export default function PricingCard({
  title,
  price,
  period,
  features,
  priceId,
  recommended = false,
}: PricingCardProps) {
  return (
    <div className={`flex flex-col rounded-2xl border p-8 ${
      recommended 
        ? 'border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-black' 
        : 'border-zinc-200 bg-white text-black dark:border-zinc-800 dark:bg-black dark:text-white'
    }`}>
      <div className="flex-1">
        <h3 className="text-xl font-bold">{title}</h3>
        <div className="mt-4 flex items-baseline gap-1">
          <span className="text-4xl font-bold">{price}</span>
          <span className="text-sm opacity-70">/{period}</span>
        </div>
        <ul className="mt-8 space-y-4 text-sm">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-3">
              <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={async () => {
          const res = await fetch('/api/stripe/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ priceId }),
          })
          const { url } = await res.json()
          if (url) window.location.href = url
        }}
        className={`mt-10 block w-full rounded-full py-3 text-center text-sm font-semibold transition-colors ${
          recommended
            ? 'bg-white text-black hover:bg-zinc-100 dark:bg-black dark:text-white dark:hover:bg-zinc-900'
            : 'bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200'
        }`}
      >
        Get Started
      </button>
    </div>
  )
}
