export async  function GetJob () {
     const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/alljobs`)
        const result = await res.json();
        return result ;
}