'use server'

        export async function GetImage(){
        
        const headers = new Headers();
        headers.set("x-api-key", process.env.IAGON_API); 
        headers.set("Content-Type", "application/json");  
     
        const res = await fetch("https://gw.iagon.com/api/v2/storage/download", {
            method: 'POST',
            headers: headers,
            
            body: JSON.stringify({id: '6634a451ed109dea7696f493',
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
            
