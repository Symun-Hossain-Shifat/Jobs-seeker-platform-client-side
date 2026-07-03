import { GetPayments } from "@/lib/Action/GetData/getpayment";
import { Chip } from "@heroui/react";

async function Paymentshowpage() {
  const payments = await GetPayments();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Payment Management</h1>
        <p className="text-default-500">
          Total Payments: {payments?.length || 0}
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border">
        <table className="w-full">
          <thead className="bg-default-100">
            <tr>
              <th className="p-4 text-left">#</th>
              <th className="p-4 text-left">Transaction ID</th>
              <th className="p-4 text-left">User</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Currency</th>
              <th className="p-4 text-left">Method</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            {payments?.length > 0 ? (
              payments.map((payment, index) => (
                <tr
                  key={payment._id}
                  className="border-t hover:bg-default-50"
                >
                  <td className="p-4">{index + 1}</td>

                  <td className="p-4 font-medium">
                    {payment.transactionId || payment.tran_id || "N/A"}
                  </td>

                  <td className="p-4">
                    {payment.name || payment.userName || "N/A"}
                  </td>

                  <td className="p-4">
                    {payment.email || "N/A"}
                  </td>

                  <td className="p-4">
                    {payment.amount || 0}
                  </td>

                  <td className="p-4">
                    {payment.currency || "BDT"}
                  </td>

                  <td className="p-4">
                    {payment.method || payment.paymentMethod || "N/A"}
                  </td>

                  <td className="p-4">
                    <Chip
                      color={
                        payment.status === "paid"
                          ? "success"
                          : payment.status === "pending"
                          ? "warning"
                          : "danger"
                      }
                      variant="flat"
                      size="sm"
                    >
                      {payment.status || "Unknown"}
                    </Chip>
                  </td>

                  <td className="p-4">
                    {payment.createdAt
                      ? new Date(payment.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="p-10 text-center">
                  No Payments Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Paymentshowpage;