import nodemailer from 'nodemailer'
import logger from './logs/logger.js'


const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  secure: false, 
  auth: {
    user: process.env.PASS_GMAIL,
    pass: process.env.USER_GMAIL,
  },
  tls: {
    rejectUnauthorized: false
  }
})

export default async function sendMail(user,body) {
  const opts ={
    from: 'Servidor Node',
    to: user,
    subject:'Nuevo Pedido',
    text: JSON.stringify(body),
  }
  
  try {
    const result = await transporter.sendMail(opts)
    logger.info(result)
  } catch (error) {
    logger.error(error)
  }
}
