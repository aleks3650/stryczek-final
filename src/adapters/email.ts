import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import nodemailer from 'nodemailer'
import 'dotenv/config'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587, 
  secure: false, 
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP connection failed:')
    console.error(error)
  } else {
    console.log('SMTP connection successful. Ready to send emails.')
  }
})

export const emailAdapter = nodemailerAdapter({
  //defaultFromAddress: 'paww91@gmail.com',
  defaultFromAddress: 'zamowienia@slodkapetelka.pl', 
  defaultFromName: 'Słodka Pętelka formularz',
  transport: transporter,
})
