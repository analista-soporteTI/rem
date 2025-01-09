'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'
import { Toaster } from '@/components/ui/toaster'
import { LoaderCircle } from 'lucide-react'
import { ButtonSendProps } from '@/types/button-send'

export const ButtonSend = ({
  children,
  variant = 'default',
  disabled,
  onClick,
  ...props
}: ButtonSendProps) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleClick = async () => {
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      await onClick()

      setSuccess('Solicitud enviada exitosamente.')
      toast({
        title: 'Solicitud enviada con éxito',
        description:
          'La solicitud debe ser revisada y procesada por logística. Quede atento a su correo.',
        variant: 'default'
      })
    } catch (err) {
      console.error(err)
      const errorMessage =
        err instanceof Error ? err.message : 'Ocurrió un error inesperado'
      setError(errorMessage)
      toast({
        title: 'Error al enviar la solicitud',
        description: errorMessage,
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError(null)
        setSuccess(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [error, success])

  return (
    <>
      <Button
        variant={variant}
        onClick={handleClick}
        disabled={loading || disabled}
        {...props}
      >
        {loading ? (
          <>
            <LoaderCircle className='mr-2 size-4 animate-spin' />
            <span>Enviando</span>
          </>
        ) : (
          children
        )}
      </Button>
      <div className='fixed px-1 text-start'>
        <Toaster />
      </div>
    </>
  )
}
