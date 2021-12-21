const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
export default async function sendMailApplicationReceived(mailto) {
  console.log("sent");
  const msg = {
    to: mailto,
    from: process.env.MAIL_FROM,
    subject: "Application Received!",
    text: "application",
    html: "<strong> Huge thanks for your Hyperscale application! You will hear from us within 7 days.</strong>",
  };
  sgMail
    .send(msg)
    .then((response) => {
      console.log(response[0].statusCode);
    })
    .catch((err) => {
      console.error(err);
    });
}
