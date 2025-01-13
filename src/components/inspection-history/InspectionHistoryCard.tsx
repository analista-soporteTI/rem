'use client'
import { Card, CardContent } from '@/components/ui/card'
import {
  Calendar,
  Car,
  Download,
  LoaderCircle,
  User,
  UserRoundSearch
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

interface HistoryCardProps {
  inspection: any
}

export const InspectionHistoryCard = ({ inspection }: HistoryCardProps) => {
  const [downloading, setDownloading] = useState(false)

  const formatDateCreation = new Date(
    inspection.fecha_creacion
  ).toLocaleDateString('es-CL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })

  const handleDownloadPdf = async () => {
    try {
      setDownloading(true)
      const response = await fetch('/api/inspection/pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: inspection.id,
          fecha_creacion: inspection.fecha_creacion,
          conductor: inspection.conductor,
          vehiculo: inspection.vehiculo,
          documentos: inspection.documentos,
          estadoLuces: inspection.estadoLuces,
          estadoEspejos: inspection.estadoEspejos,
          equipoSeguridad: inspection.equipoSeguridad,
          niveles: inspection.niveles,
          otros: inspection.otros,
          neumaticos: inspection.neumaticos,
          dañosCarroceria: inspection.dañosCarroceria,
          cansado_fatigado: inspection.cansado_fatigado,
          dormido_lo_suficiente: inspection.dormido_lo_suficiente,
          consumo_alcohol: inspection.consumo_alcohol,
          consumo_drogas: inspection.consumo_drogas,
          consumo_medicamento: inspection.consumo_medicamento,
          estresado_preocupado: inspection.estresado_preocupado,
          problema_personal: inspection.problema_personal,
          condiciones_optimas: inspection.condiciones_optimas,
          asiento_ajustado: inspection.asiento_ajustado,
          espejos_posicionados: inspection.espejos_posicionados,
          volante_altura_correcta: inspection.volante_altura_correcta,
          pedales_distancia_correcta: inspection.pedales_distancia_correcta,
          postura_conduccion_comoda: inspection.postura_conduccion_comoda,
          visibilidad_adecuada: inspection.visibilidad_adecuada,
          controles_al_alcance: inspection.controles_al_alcance
        })
      })

      if (!response.ok) {
        throw new Error('No se pudo generar el archivo PDF.')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url

      const contentDisposition = response.headers.get('Content-Disposition')
      const filename = contentDisposition
        ? contentDisposition.split('filename=')[1].replace(/"/g, '')
        : `Inspeccion ${inspection.id}.pdf`

      link.setAttribute('download', filename)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error al descargar el archivo PDF:', error)
    } finally {
      setDownloading(false)
    }
  }

  return (
    <Card className='w-[280px] border shadow-sm hover:shadow-md transition-shadow'>
      <CardContent className='pt-4 relative'>
        <h3 className='font-semibold mb-2'>
          Inspección {inspection.id}
        </h3>

        <div className='flex flex-col gap-2 mb-4 text-sm'>
          <p className='flex items-center gap-2'>
            <Car className='size-4 text-gray-500' />
            <span className='text-gray-700'>
              Patente: {inspection.vehiculo.patente}
            </span>
          </p>
          <p className='flex items-center gap-2'>
            <User className='size-4 text-gray-500' />
            <span className='text-gray-700'>
              Conductor: {inspection.conductor.nombre}
            </span>
          </p>
          <p className='flex items-center gap-2'>
            <UserRoundSearch className='size-4 text-gray-500' />
            <span className='text-gray-700'>
              Supervisor: {inspection.conductor.supervisor}
            </span>
          </p>
          <p className='flex items-center gap-2'>
            <Calendar className='size-4 text-gray-500' />
            <span className='text-gray-700'>Fecha: {formatDateCreation}</span>
          </p>
        </div>

        <Button
          variant='default'
          size='sm'
          onClick={handleDownloadPdf}
          disabled={downloading}
          className='w-full'
        >
          {downloading ? (
            <span className='flex items-center gap-2'>
              <LoaderCircle className='size-4 animate-spin' />
              Descargando
            </span>
          ) : (
            <span className='flex items-center gap-2'>
              <Download className='size-4' />
              Descargar PDF
            </span>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
