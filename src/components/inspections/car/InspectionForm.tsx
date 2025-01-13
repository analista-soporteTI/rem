'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { formSchema } from '@/components/inspections/car/formSchema'
import { LoaderCircle, AlertCircle } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { BasicInfo } from '@/components/inspections/car/form-pages/BasicInfo'
import Documents from '@/components/inspections/car/form-pages/Documents'
import { Lights } from '@/components/inspections/car/form-pages/Lights'
import { MirrorsAndWindows } from '@/components/inspections/car/form-pages/MirrorsAndWindows'
import { SafetyEquipment } from '@/components/inspections/car/form-pages/SafetyEquipment'
import { Levels } from '@/components/inspections/car/form-pages/Levels'
import { Others } from '@/components/inspections/car/form-pages/Others'
import { Tires } from '@/components/inspections/car/form-pages/Tires'
import { BodyDamage } from '@/components/inspections/car/form-pages/BodyDamage'
import FatigueAndErgonomics from '@/components/inspections/car/form-pages/FatigueAndErgonomics'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'

export type FormData = z.infer<typeof formSchema>

export const InspectionForm = () => {
  const [page, setPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange'
  })

  const {
    handleSubmit,
    formState: { errors, isValid },
    trigger
  } = form

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)

    try {
      await fetch('/api/inspection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
    } finally {
      setIsLoading(false)
    }
  }

  const sectionPaths = {
    0: [
      'nombre_conductor',
      'nombre_supervisor',
      'patente_vehiculo',
      'km_actual'
    ],
    1: ['documentos'],
    2: ['estadoLuces'],
    3: ['estadoEspejos'],
    4: ['equipoSeguridad'],
    5: ['niveles'],
    6: ['otros'],
    7: ['neumaticos'],
    8: ['dañosCarroceria'],
    9: ['fatigueQuestions', 'ergonomicsQuestions']
  } as const

  const nextPage = async () => {
    const currentSectionPaths = sectionPaths[page as keyof typeof sectionPaths]
    const isValid = await trigger(currentSectionPaths)

    if (isValid) {
      setPage(prev => Math.min(prev + 1, 9))
    }
  }

  const prevPage = () => setPage(prev => Math.max(prev - 1, 0))

  const pageNames = [
    'Información básica',
    'Documentos',
    'Luces',
    'Vidrios y espejos',
    'Equipo de seguridad',
    'Niveles',
    'Otros',
    'Neumáticos',
    'Carrocería',
    'Fatiga y ergonomía'
  ]

  const pages = [
    <BasicInfo key='basic' form={form} />,
    <Documents key='documents' form={form} />,
    <Lights key='lights' form={form} />,
    <MirrorsAndWindows key='mirrors' form={form} />,
    <SafetyEquipment key='safety' form={form} />,
    <Levels key='levels' form={form} />,
    <Others key='others' form={form} />,
    <Tires key='tires' form={form} />,
    <BodyDamage key='damage' form={form} />,
    <FatigueAndErgonomics key='fatigue' form={form} />
  ]

  const hasCurrentPageErrors = () => {
    const currentPaths = sectionPaths[page as keyof typeof sectionPaths]
    return currentPaths.some(path => {
      return Object.keys(errors).some(errorKey => errorKey.startsWith(path))
    })
  }

  return (
    <div className='space-y-8'>
      <div className='flex flex-wrap gap-2'>
        {pageNames.map((name, index) => {
          const hasErrors = sectionPaths[
            index as keyof typeof sectionPaths
          ].some(path =>
            Object.keys(errors).some(errorKey => errorKey.startsWith(path))
          )

          return (
            <Button
              key={name}
              type='button'
              variant={page === index ? 'default' : 'outline'}
              className='text-sm relative'
              onClick={() => setPage(index)}
            >
              {name}
              {hasErrors && (
                <AlertCircle className='size-4 absolute -top-2 -right-2 text-red-500 bg-red-100 rounded-full' />
              )}
            </Button>
          )
        })}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
        {pages[page]}

        {hasCurrentPageErrors() && (
          <Alert variant='destructive'>
            <AlertCircle className='size-4' />
            <AlertDescription>
              Por favor complete todos los campos requeridos antes de continuar
            </AlertDescription>
          </Alert>
        )}

        <div className='flex gap-4'>
          <Button
            type='button'
            variant='outline'
            onClick={prevPage}
            disabled={page === 0}
          >
            Anterior
          </Button>
          {page === pages.length - 1 ? (
            <AlertDialog>
              <AlertDialogTrigger
                className={buttonVariants()}
                disabled={isValid}
              >
                Enviar inspección
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    ¿Esta seguro(a) de enviar la inspección?
                  </AlertDialogTitle>
                  <AlertDialogDescription className='flex flex-col gap-2'>
                    <span>
                      Al enviar la inspección, usted declara y acepta ser el
                      único responsable de la veracidad y exactitud de la
                      información proporcionada. En caso de detectarse alguna
                      discrepancia, Diprofire podrá exigirle responsabilidad.
                    </span>
                    <span>
                      Le recomendamos revisar cuidadosamente la información
                      antes de enviarla para evitar posibles errores o
                      inconvenientes.
                    </span>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={() => onSubmit(form.getValues())}>
                    {isLoading ? (
                      <span className='flex items-center gap-2'>
                        <LoaderCircle className='size-4 animate-spin' />
                        Enviando
                      </span>
                    ) : (
                      'Enviar'
                    )}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : (
            <Button type='button' onClick={nextPage}>
              Siguiente
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}
