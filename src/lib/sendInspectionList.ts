import { EmailSendInspection } from '@/components/templates/EmailSendInspection'
import { Resend } from 'resend'
import { v4 as uuidv4 } from 'uuid'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendInspectionList = async ({
  inspection_code
}: {
  inspection_code: string
}) => {
  const { data, error } = await resend.emails.send({
    from: 'Inspección vehículo <diprofire@diprofire.cl>',
    to: ['compras.diprofire@gmail.com'],
    subject: `Inspección vehículo`,
    react: EmailSendInspection({ inspection_code }),
    headers: {
      'X-Entity-Ref-ID': uuidv4()
    }
  })

  if (error) {
    throw new Error(`Error al enviar el correo: ${error}`)
  }

  return data
}
