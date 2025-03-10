import User from "../Models/user";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
const nodemailer = require("nodemailer");
dotenv.config();

const MAIL = process.env.EMAIL;
const PASS = process.env.EMAIL_PASS;
const transporter = nodemailer.createTransport({
  service: "Gmail", // Use the email service provider you prefer
  auth: {
    user: MAIL,
    pass: PASS,
  },
});
export const sendEmailToNewCoach = async (coach: any) => {
  const mailOptions = {
    from: MAIL,
    to: coach.email,
    subject: "Welcome to Project X",
    html: `
         <html dir="ltr">
             <body>
                 <p>${coach.firstName} ${coach.lastName} Welcome to our system</p>
                 <a href="http://localhost:3000/setPassword/${coach._id}">Use this link to set your password</a>
             </body>
         </html>
     `,
  };
  transporter.sendMail(mailOptions, (error: any, info: any) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
    }
  });
};
export const sendTestLead = async () => {
  const mailOptions = {
    from: MAIL,
    to: MAIL,
    subject: "Hello from Node.js",
    html: `
     <html dir="rtl">
       <body>
         <p>hello !</p>
       </body>
     </html>
   `,
  };
  transporter.sendMail(mailOptions, (error: any, info: any) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
    }
  });
};
const sendLead = async (lead: any) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail", // Use the email service provider you prefer
    auth: {
      user: MAIL,
      pass: PASS,
    },
  });
  const mailOptions = {
    from: MAIL,
    to: MAIL,
    subject: "התקבל ליד חדש",
    html: `
 
     <html dir="ltr">
       <body>
         <p dir="ltr" >
  ליד חדש מ${lead.name}
  <br/>
  מספר טלפון: ${lead.phone}
  <br/>
     כתובת אימייל: ${lead.mail}
     <br/>
     הודעה: ${lead.msg}</p>
     <br/>
       </body>
     </html>
     `,
  };
  transporter.sendMail(mailOptions, (error: any, info: any) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
    }
  });
};
