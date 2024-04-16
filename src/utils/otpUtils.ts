import nodemailer from "nodemailer";
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
      user: process.env.MAIL,
      pass: process.env.APP_PASSWORD,
    },
});

function generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendOTP(otp: string, mode: string, contact: string) {
    if(mode === "email"){
        await transporter.sendMail({
            from: `<${process.env.MAIL}>`,
            to: contact, 
            subject: "OTP", 
            text: otp,
        })
    }
}

export { generateOTP, sendOTP };