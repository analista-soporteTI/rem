'use client'
import { Card, CardContent } from '@/components/ui/card'
import {
  CalendarArrowDown,
  CalendarArrowUp,
  CircleDollarSign,
  Download,
  ListTodoIcon,
  LoaderCircle,
  Pin,
  PinOff
} from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { useState } from 'react'
import { Rem } from '@/types/rem'
import clsx from 'clsx'
import Link from 'next/link'

interface RemCardProps {
  rem: Rem
  isPinned: boolean
  pinRem: (remCode: string) => void
}

export const RemCard = ({ rem, isPinned, pinRem }: RemCardProps) => {
  const [downloading, setDownloading] = useState(false)

  const formattedDateSend = new Date(rem.date_send).toLocaleDateString(
    'es-CL',
    {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }
  )

  const formattedDateRequest = new Date(rem.date_request).toLocaleDateString(
    'es-CL',
    {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }
  )

  const handleDownloadExcel = async () => {
    try {
      setDownloading(true)
      const response = await fetch('/api/excel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rem_code: rem.rem_code,
          ceco: rem.ceco,
          dateSend: rem.date_send,
          dateRequest: rem.date_request,
          userId: rem.user_id,
          message: rem.message,
          products: rem.products,
          customProducts: rem.custom_products
        })
      })

      if (!response.ok) {
        throw new Error('No se pudo generar el archivo Excel.')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url

      const contentDisposition = response.headers.get('Content-Disposition')
      const filename = contentDisposition
        ? contentDisposition.split('filename=')[1].replace(/"/g, '')
        : `REM_${rem.rem_code}_${rem.ceco}.xlsx`

      link.setAttribute('download', filename)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error al descargar el archivo Excel:', error)
    } finally {
      setDownloading(false)
    }
  }

  return (
    <Card
      className={clsx(
        'w-[280px] border shadow-sm hover:shadow-md transition-shadow',
        rem.status === 'Completado'
          ? 'opacity-60 bg-primary-foreground hover:opacity-100 transition-all'
          : ''
      )}
    >
      <CardContent className='pt-4 relative'>
        <h3 className='font-semibold mb-2'>{rem.rem_code}</h3>
        <Button
          size='sm'
          variant='ghost'
          className='absolute top-2 right-2'
          onClick={() => pinRem(rem.rem_code)}
        >
          {isPinned ? (
            <PinOff className='size-4 text-green-700' />
          ) : (
            <Pin className='size-4' />
          )}
        </Button>

        <div className='flex flex-col gap-2 mb-4 text-sm'>
          <p className='flex items-center gap-2'>
            <CircleDollarSign className='size-4 text-gray-500' />
            <span className='text-gray-700'>CeCo: {rem.ceco}</span>
          </p>
          <p className='flex items-center gap-2'>
            <CalendarArrowDown className='size-4 text-gray-500' />
            <span className='text-gray-700'>
              Solicitud: {formattedDateSend}
            </span>
          </p>
          <p className='flex items-center gap-2'>
            <CalendarArrowUp className='size-4 text-gray-500' />
            <span>Entrega: {formattedDateRequest}</span>
          </p>
        </div>

        <Link
          href={`/seguimiento/${rem.rem_code}`}
          className={buttonVariants({
            variant: 'outline',
            size: 'sm',
            className: 'w-full mb-2'
          })}
        >
          <ListTodoIcon className='mr-2 size-4' />
          Ver solicitud
        </Link>

        <Button
          variant='default'
          size='sm'
          onClick={handleDownloadExcel}
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
              Descargar Excel
            </span>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
