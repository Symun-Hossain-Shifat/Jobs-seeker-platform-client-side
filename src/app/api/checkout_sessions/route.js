import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { stripe } from '../../../lib/stripe'
import { PLAN_PRICE_ID } from '@/lib/stripe'
import { auth } from '@/lib/auth';

export async function POST(request) {


    const session = await auth.api.getSession({
        headers: await headers(),
      });
      const User = session?.user?.email ;


  try {
    const headersList = await headers()
    const origin = headersList.get('origin')
    const formdata = await request.formData()
    const planid = formdata.get('plan_id')
    const Priceid = PLAN_PRICE_ID[planid];
    console.log(planid)
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
        customer_email : User ,
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price: Priceid ,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      metadata :{ planid },
      success_url: `${origin}/plans/success?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.redirect(session.url, 303)
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}