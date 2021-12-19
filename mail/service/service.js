const nodemailer=require("nodemailer");
const hbs = require('nodemailer-express-handlebars')
const path = require("path")
let transporter= nodemailer.createTransport({
    host:process.env.MAIL_HOST,
    port:process.env.MAIL_PORT,
    auth:{
        user:process.env.MAIL_USER,
        pass:process.env.MAIL_PASSWORD,
    },
    default:{
        from:process.env.MAIL_FROM,
    },
});

const handlebarOptions = {
    viewEngine: {
        partialsDir: path.resolve('mail/template/'),
        defaultLayout: false,
    },
    viewPath: path.resolve('mail/template/'),
};

transporter.use('compile', hbs(handlebarOptions))
export default async function sendApplicationReceivedMail(mailto,name){
    let mailOptions = {
        from: process.env.MAIL_FROM,
        to: mailto,
        subject:  'Application Received',
        template:'applicationreceived',
        context:{
            name:name
        }
      };
    await transporter.sendMail(mailOptions,(err,data)=>{
       if(err){
        console.log(err)
       } 
       else{
           console.log("mail sent successfully")
       }
    })
}
