import { insertRem } from '@/lib/db/insertRem'
import { sendEmail } from '@/lib/email'
import { generateUniqueCode } from '@/utils/generateUniqueCode'

export async function POST (request: Request) {
  try {
    const {
      userId,
      name,
      email,
      dateRequest,
      ceco,
      message,
      products,
      customProducts,
      delivery,
      currency
    } = await request.json()

    const formattedDateSend = new Date()
    const formattedDateRequest = new Date(dateRequest)

    const rem_code = generateUniqueCode()

    await insertRem(
      rem_code,
      ceco,
      formattedDateSend,
      formattedDateRequest,
      message,
      userId,
      products,
      customProducts,
      delivery,
      currency
    )

    await sendEmail(
      rem_code,
      name,
      email,
      formattedDateRequest,
      ceco,
      message,
      products,
      customProducts,
      delivery,
      currency
    )

    return Response.json(
      { message: 'Solicitud procesada con éxito.' },
      { status: 200 }
    )
  } catch (error) {
    console.error(error)
    return Response.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    )
  }
}
