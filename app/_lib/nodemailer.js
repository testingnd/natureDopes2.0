
import nodemailer from 'nodemailer'


export async function sendMail(mailOptions){

    return new Promise((resolve, reject)=> {

    let transporter = nodemailer.createTransport({
        host: process.env.EMAILHOST,
        port: 587,
        /*secure: true,*/
        auth: {
            user: process.env.EMAILUSER,
            pass: process.env.EMAILPASS,
        },
    });

    
        
        transporter.sendMail(mailOptions, function(err, info) {

            if (err) {
                
                resolve ( {
                    error: 'error sending message, please try again later'
                })
                
            } else {
                
                resolve ({
                    
                    message: 'Thanks, Naturedopes will get back to you soon'
                })
            }
            
         })
        })  
      

    }


