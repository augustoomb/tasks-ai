import { tool } from 'ai';
import { z } from 'zod';
// const sgMail = require('@sendgrid/mail')
import sgMail from '@sendgrid/mail'
import dotenv from 'dotenv';
dotenv.config();

const sendEmail = async(to, value) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  const msg = {
    to: to,
    from: 'augustobarbosa1988@gmail.com', 
    subject: 'Sending with SendGrid is Fun',
    text: value,
    // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  }
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })

  return 'E-mail enviado com sucesso'
}

export const sendEmailTools = tool({
  description: 'o usuário informará um endereço de e-mail de destino e o e-mail será enviado',
  parameters: z.object({
    to: z.string().email().describe('endereço de e-mail de destino'),
    value: z.string().describe('valor a ser enviado no e-mail, recebido de outra ferramenta (tool)'),
  }),
  execute: async ({ to, value }) => sendEmail(to, value),
})
