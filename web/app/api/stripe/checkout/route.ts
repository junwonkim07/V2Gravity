import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next"
import { stripe } from "@/lib/stripe"

export async function POST(req: Request) {
  try {
    const session = await getServerSession()
    if (!session || !session.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { priceId } = await req.json()

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
      customer_email: session.user.email!,
      metadata: {
        userId: (session.user as any).id,
      },
    })

    return NextResponse.json({ url: checkoutSession.url })
  } catch (error: any) {
    console.error('Stripe Checkout Error:', error)
    return new NextResponse(error.message, { status: 500 })
  }
}
