import { EmailSendRem } from '@/components/templates/EmailSendRem'
import { Resend } from 'resend'
import { v4 as uuidv4 } from 'uuid'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendEmail = async (
  rem_code: string,
  name: string,
  email: string,
  dateRequest: Date,
  ceco: string,
  message: string,
  products: any,
  customProducts: any
) => {
  const { data, error } = await resend.emails.send({
    from: 'Rem web <diprofire@diprofire.cl>',
    to: [
      'compras.diprofire@gmail.com',
      'logistica@diprofire.cl',
      'compras@diprofire.cl',
      'bodega.diprofire@gmail.com',
      'bodegaoperaciones.diprofire@gmail.com',
      'gino.rojas@diprofire.cl',
      'rodrigo.latorre@diprofire.cl',
      'kevin.villarroel@diprofire.cl',
      'victor.rojas@diprofire.cl'
    ],
    subject: `REM ${rem_code}`,
    react: EmailSendRem({
      rem_code,
      name,
      email,
      dateRequest,
      ceco,
      message,
      products,
      customProducts
    }),
    headers: {
      'X-Entity-Ref-ID': uuidv4()
    }
  })

  if (error) {
    throw new Error(`Error al enviar el correo: ${error}`)
  }

  return data
}
