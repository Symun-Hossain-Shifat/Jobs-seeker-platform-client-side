import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Subscription } from '@/lib/Action/PostData/subscription'




export default async function Success({ searchParams }) {

  // console.log( metadata.planid)
const { session_id } = await searchParams
  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const {
    status, metadata ,
    customer_details: { email: customerEmail },
    payment_intent,
    amount_total,
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent'],
  })

  if (status === 'open') return redirect('/')

  if (status === 'complete') {

    const Data = {
      email : customerEmail ,
      PlanID : metadata.planid
    }
    const Result = await Subscription(Data)
    console.log(Result)
    const orderRef = payment_intent?.id?.slice(-6).toUpperCase() ?? '------'
    const amount = amount_total ? `$${(amount_total / 100).toFixed(2)}` : '—'
    const date = new Date().toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
    })

    return (
      <main className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl p-10 text-center">

          {/* animated check */}
          <div className="relative inline-flex items-center justify-center mb-7">
            <span className="absolute w-20 h-20 rounded-full bg-green-700 animate-ping opacity-40" />
            <div className="relative w-[72px] h-[72px] rounded-full bg-green-800 border border-green-500 flex items-center justify-center">
              <svg className="w-9 h-9 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <p className="text-[11px] tracking-widest text-neutral-600 uppercase mb-1">Payment confirmed</p>
          <h1 className="text-3xl font-semibold text-neutral-100 mb-2">Thank you!</h1>
          <p className="text-sm text-neutral-500 mb-8 leading-relaxed">
            Receipt sent to <span className="text-neutral-300">{customerEmail}</span>
          </p>

          {/* stat cards */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {[
              { label: 'Order', value: `#${orderRef}` },
              { label: 'Amount', value: amount },
              { label: 'Status', value: 'Paid', green: true },
            ].map(({ label, value, green }) => (
              <div key={label} className="bg-[#111] border border-[#1e1e1e] rounded-xl p-3 text-left">
                <p className="text-[10px] text-neutral-600 uppercase tracking-wider mb-1">{label}</p>
                <p className={`text-sm font-medium ${green ? 'text-green-400 flex items-center gap-1' : 'text-neutral-300'}`}>
                  {green && <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />}
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* detail rows */}
          <div className="bg-[#0f0f0f] border border-[#1e1e1e] rounded-xl divide-y divide-[#161616] mb-4 text-left">
            {[
              { label: 'Confirmation sent to', value: customerEmail },
              { label: 'Processing time', value: '1–2 business days' },
              { label: 'Date', value: date },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center px-4 py-3 gap-3">
                <span className="text-xs text-neutral-600 flex-1">{label}</span>
                <span className="text-xs text-neutral-400 truncate max-w-[160px]">{value}</span>
              </div>
            ))}
          </div>

          {/* actions — fixed: use <a> for external/mailto, <Link> only for internal routes */}
          <div className="flex gap-2 mb-6">
            <Link
              href="/"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm text-neutral-300 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg hover:bg-[#222] hover:border-[#3a3a3a] transition-colors"
            >
              ← Back to home
            </Link>
            <Link
              href="mailto:orders@example.com"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm text-neutral-500 border border-[#1e1e1e] rounded-lg hover:bg-[#111] hover:text-neutral-400 transition-colors"
            >Get support</Link>
              
        
          </div>

          <p className="text-xs text-neutral-700">
            Questions?{' '}
            <a href="mailto:orders@example.com" className="text-neutral-500 underline underline-offset-2 hover:text-neutral-400">
              orders@example.com
            </a>
          </p>

        </div>
      </main>
    )
  }
}