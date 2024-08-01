import nodemailer from 'nodemailer'


export function sendMail(mailOptions){

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
            console.log(err)
            
            
        } else {
            console.log(info)
        
        }
    });
}