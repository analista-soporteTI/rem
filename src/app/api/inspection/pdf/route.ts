import { generatePdf } from '@/services/pdf/generatePdf'
import { InspectionData } from '@/types/inspection-data'
import { NextResponse } from 'next/server'

export async function POST (request: Request) {
  try {
    const data = (await request.json()) as InspectionData
    console.log('pdf', data)

    const pdfBytes = await generatePdf(data)

    const buffer = Buffer.from(pdfBytes)

    const headers = new Headers({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="Inspeccion ${data.id}.pdf"`,
      'Cache-Control': 'no-store, max-age=0'
    })

    return new NextResponse(buffer, {
      status: 200,
      headers
    })
  } catch (error) {
    console.error('Error generating PDF file:', error)

    return NextResponse.json(
      {
        error: 'Error al generar el archivo PDF',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      {
        status: 500
      }
    )
  }
}
