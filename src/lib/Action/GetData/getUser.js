export const GetUsers = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users`) 
    const result = await res.json()
    return result
}