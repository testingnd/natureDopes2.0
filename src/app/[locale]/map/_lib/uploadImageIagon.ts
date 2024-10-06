'use server'

import validator from "validator"

export async function iagonUpload(data: FormData){

    let imageFile = data.get('image_file') as File
    let imageName = data.get('species') as string   

    if(!validator.isAlpha(imageName, ['en-GB'], {ignore: " ()-,"})){
        return {
            error: 'Species names must only contain letters '
        }
     }
    

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
         const successId = result.data._id
         return {
            path: successId
        }

    } catch (error: any) {
        console.log(error)
        return {
            error: 'There was a technical issue uploading your data, please try again. If the issue persists please contact us '
        }

    }

   


}