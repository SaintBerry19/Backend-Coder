import nodemailer from 'nodemailer'
import logger from './logs/logger.js'


const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export default async function sendMail(body) {
  const opts ={
    from: 'Servidor Node',
    to: process.env.EMAIL_USER,
    subject:'Registro de Usuario',
    text: JSON.stringify(body),
  }
  
  try {
    const result = await transporter.sendMail(opts)
    logger.info(result)
  } catch (error) {
    logger.error(error)
  }
}
