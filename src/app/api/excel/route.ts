import { NextResponse } from 'next/server'
import { fetchUser } from '@/lib/db/fetchUser'
import { generateExcel } from '@/services/excel/generateExcel'
import { RemRequestData } from '@/types/excel'

export async function POST (request: Request) {
  try {
    const data = (await request.json()) as RemRequestData
    const users = await fetchUser()
    const user = users.find(u => u.user_id === data.userId)

    if (!user) {
      return Response.json(
        { error: 'No hay usuario registrado' },
        { status: 404 }
      )
    }

    const buffer = generateExcel(data, user)
    const headers = new Headers({
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="REM_${data.rem_code}_${data.ceco}.xlsx"`
    })

    return new NextResponse(buffer, { status: 200, headers })
  } catch (error) {
    console.error('Error generating Excel file:', error)
    return NextResponse.json(
      { error: 'Error al generar el archivo Excel' },
      { status: 500 }
    )
  }
}
