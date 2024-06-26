'use server'



        export async function GetImage(path: string){
        
        const headers = new Headers();
        headers.set("x-api-key", process.env.IAGON_API); 
        headers.set("Content-Type", "application/json");  
     
        try {

          const res = await fetch("https://gw.iagon.com/api/v2/storage/download", {
                        method: 'POST',
                        headers: headers,
                                                   
                        body: JSON.stringify({id: '6668524fc0334a94a3a164a9',
                                password: process.env.IAGON_PASS}),
                        cache: 'force-cache'
                    })
                 
                  if(res.status != 200){
                    
                    return {
                      error: 'Problem retrieving image from database. If issue persists, please contact us'
                    }
                  }    
                  console.log(res.status)
                  const arrayBuffer = await res.arrayBuffer()
                  const buffer = Buffer.from(arrayBuffer);
                  let base64 = buffer.toString('base64');   
                  return {
                    i64: base64
                  }
                  
        } catch (error){
           console.log(error)
          return {
              error: 'Technical issue, please contact us'
            }
        } 
      
    
    }   


            
            
