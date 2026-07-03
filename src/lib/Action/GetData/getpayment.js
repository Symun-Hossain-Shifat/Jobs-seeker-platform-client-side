export const GetPayments = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/subscription`) 
    const result = await res.json()
    return result
}