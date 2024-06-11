'use server'

export async function iagonUpload(data: FormData){

    let imageFile = data.get('image_file') as File
    let imageName = data.get('species') as string
    console.log(data)
    try{
        const headers = new Headers();
        
        headers.set("x-api-key", process.env.IAGON_API); 
        //headers.set("Content-Type", "multipart/form-data"); 
        
        let formdata = new FormData();

        formdata.append("file", imageFile);
        formdata.append("filename", imageName);
        formdata.append("visibility", "private");
        formdata.append("directoryId", "6634a342ed109dea7696eaaa")
        formdata.append("password", process.env.IAGON_PASS)



        const res = await fetch("https://gw.iagon.com/api/v2/storage/upload", {
            method: 'POST',
            headers: headers,
            body: formdata
         })

         const result = await res.json()
         console.log(result)
         const successId = result.data.id
         return {
            path: 'good',
        }

    } catch (e: any) {
        console.log(e)
        return {
            error: 'bad'
        }

    }

   


}