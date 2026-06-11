import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const PLAN_PRICE_ID = {
    'reqruiter_growth' : 'price_1Th2ODIXMD37scQSX6Go20gg',
    'reqruiter_enterprise' : 'price_1Th2iMIXMD37scQS5mctffad',
    'seeker_pro': 'price_1Th2jLIXMD37scQSHtLQDstu',
    'seeker_premium': 'price_1Th2jyIXMD37scQSgY6Xhcu0',
}