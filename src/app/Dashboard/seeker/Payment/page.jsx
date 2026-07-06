import { GetSpecificPayments } from "@/lib/Action/GetData/getpayment";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

async function PaymentPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.email) {
    return (
      <div className="flex items-center justify-center h-[70vh] bg-white dark:bg-gray-950">
        <h1 className="text-xl font-semibold text-red-500">
          Please login first.
        </h1>
      </div>
    );
  }

  const payment = await GetSpecificPayments(session.user.email);

  if (!payment) {
    return (
      <div className="flex items-center justify-center h-[70vh] bg-white dark:bg-gray-950">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          No payment information found.
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
        Payment Information
      </h1>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg p-6">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Payment ID
            </p>
            <p className="font-medium text-gray-900 dark:text-white break-all">
              {payment._id?.toString()}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Email
            </p>
            <p className="font-medium text-gray-900 dark:text-white">
              {payment.email}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Plan
            </p>
            <span className="inline-block rounded-full bg-emerald-100 dark:bg-emerald-900/40 px-3 py-1 text-sm font-semibold text-emerald-700 dark:text-emerald-300 capitalize">
              {payment.PlanID?.replace("_", " ")}
            </span>
          </div>

          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Purchase Date
            </p>
            <p className="font-medium text-gray-900 dark:text-white">
              {new Date(payment.Createdat).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;