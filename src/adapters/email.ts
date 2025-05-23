import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import nodemailer from 'nodemailer'
import 'dotenv/config'

export const emailAdapter = nodemailerAdapter({
  defaultFromAddress: 'qparanormal@gmail.com',
  defaultFromName: 'Q_Paranormall',
  transport: nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  }),
})
