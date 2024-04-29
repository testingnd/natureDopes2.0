'use server'

 export async function GetData(){
         
        
  
        const res = await fetch("https://gw.iagon.com/api/v2/storage/download", {
            method: 'POST',
            headers: {"x-api-key": process.env.IAGON_API,
                      "Content-Type": "application/json" 
            },
            body: JSON.stringify({id: '6628e223ed109dea7651a844',
                    password: process.env.IAGON_PASS})
        })
        
       
        console.log(res.status)
        const arrayBuffer = await res.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer);
        let base64 = buffer.toString('base64');
       
        
        
        if (!res.ok) {
            // This will activate the closest `error.js` Error Boundary
          
            return 'no data'
          }
       
      return base64
    }   


            //<img alt='nowt' placeholder="nowt" src={`data:image/png;base64,${data}`} />
            
