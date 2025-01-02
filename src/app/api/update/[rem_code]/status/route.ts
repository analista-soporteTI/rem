import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getTursoClient } from '@/lib/turso'
import { z } from 'zod'

const StatusSchema = z.object({
  remCode: z.string(),
  status: z.enum(['Pendiente Aprobación', 'Pendiente', 'En Proceso', 'Completado', 'Anulado'])
})

export async function PATCH (request: Request) {
  try {
    const body = await request.json()
    const { status, remCode } = StatusSchema.parse(body)
    const turso = await getTursoClient()

    const sanitizedStatus = String(status)

    await turso.execute({
      sql: 'UPDATE rems SET status = ? WHERE rem_code = ?',
      args: [sanitizedStatus, remCode]
    })

    revalidatePath('/seguimiento')
    return NextResponse.json({
      message: 'Status updated successfully',
      status: status
    })
  } catch (error) {
    console.error('Error updating status:', error)
    return NextResponse.json(
      { error: 'Failed to update status' },
      { status: 500 }
    )
  }
}
