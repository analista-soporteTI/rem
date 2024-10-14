import { EmailSendRem } from '@/components/templates/EmailSendRem'
import { generateUniqueCode } from '@/utils/generateUniqueCode'
import { Resend } from 'resend'
import { v4 as uuidv4 } from 'uuid'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST (request: Request) {
  try {
    const { name, email, date, ceco, message, products } = await request.json()

    const uniqueCode = generateUniqueCode(ceco)

    const formattedDate = new Date(date).toLocaleDateString('es-CL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })

    const { data, error } = await resend.emails.send({
      from: 'Rem web <diprofire@diprofire.cl>',
      to: ['compras.diprofire@gmail.com'],
      subject: `REM ${uniqueCode}`,
      react: EmailSendRem({
        name,
        email,
        date: formattedDate,
        ceco,
        message,
        products
      }),
      headers: {
        'X-Entity-Ref-ID': uuidv4()
      }
    })

    if (error) {
      return Response.json({ error }, { status: 500 })
    }

    return Response.json(data)
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
