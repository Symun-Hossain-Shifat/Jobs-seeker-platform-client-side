export async  function Subscription (Data) {
  console.log(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/subscription`)
     const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/subscription` , {
          method : 'POST', 
        headers : {
          'content-type' : 'application/json'
        },
        body : JSON.stringify(Data)
        })
        const result = await res.json();
        return result ;
}