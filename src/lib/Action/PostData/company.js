export async  function PostCompany (CompanyData) {
     const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/companyinfo` , {
          method : 'POST', 
        headers : {
          'content-type' : 'application/json'
        },
        body : JSON.stringify(CompanyData)
        })
        const result = await res.json();
        return result ;
}