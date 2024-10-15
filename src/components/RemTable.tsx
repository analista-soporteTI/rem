'use client'
import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { useProducts } from '@/hooks/useProducts'
import { Textarea } from '@/components/ui/textarea'
import { DatePicker } from '@/components/ui/datepicker'
import { Trash } from 'lucide-react'
import { ButtonSend } from '@/components/ButtonSend'
import * as yup from 'yup'
import imgNotFound from '@/assets/not found.png'
import { Product } from '@/types/product'

export function RemTable () {
  const { products, clearProducts, removeProduct } = useProducts()
  const [email, setEmail] = useState('')
  const [date, setDate] = useState(new Date())
  const [ceco, setCeco] = useState('')
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const { addProduct } = useProducts()

  const schema = yup.object().shape({
    email: yup
      .string()
      .email('Correo inválido')
      .required('El correo es requerido'),
    date: yup.date().required('La fecha es requerida'),
    ceco: yup.string().required('El CeCo es requerido'),
    name: yup.string().required('El nombre es requerido'),
    products: yup
      .array()
      .min(1, 'Debes agregar al menos un producto')
      .required()
  })

  const handleSendRequest = async () => {
    const requestData = { name, email, date, ceco, message, products }

    try {
      await schema.validate(requestData, { abortEarly: false })

      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData)
      })

      if (!response.ok) {
        throw new Error('No se pudo enviar la solicitud.')
      }

      const result = await response.json()
      clearProducts()

      return result
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        throw new Error(error.errors.join(', '))
      } else if (error instanceof Error) {
        throw error
      } else {
        throw new Error('Unknown error occurred.')
      }
    }
  }

  const handleQuantityChange = (product: Product, quantity: string) => {
    const updatedQuantity = parseInt(quantity, 10)
    if (updatedQuantity >= 1) {
      addProduct(product, updatedQuantity - product.quantity)
    }
  }

  return (
    <Table>
      <TableCaption>
        Este sistema se encuentra en fase de desarrollo. Si tienes algún
        problema comunícate con soporte.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[80px]'>Imagen</TableHead>
          <TableHead className='w-[120px]'>SKU</TableHead>
          <TableHead className='min-w-[200px] w-[400px]'>Producto</TableHead>
          <TableHead className='w-[100px] text-center'>Solicitado</TableHead>
          <TableHead className='w-[100px] text-center'>Stock</TableHead>
          <TableHead className='w-[40px] text-center'>Eliminar</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.length > 0 ? (
          products.map(product => (
            <TableRow key={product.SKU}>
              <TableCell className='text-center'>
                <Image
                  src={product.Imagen || imgNotFound}
                  alt='product'
                  width={40}
                  height={40}
                />
              </TableCell>
              <TableCell className='font-medium'>{product.SKU}</TableCell>
              <TableCell className='lowercase'>{product.Product}</TableCell>
              <TableCell className='text-center'>
                <Input
                  type='number'
                  placeholder='1'
                  value={product.quantity}
                  onChange={e => handleQuantityChange(product, e.target.value)}
                  min={1}
                />
              </TableCell>
              <TableCell className='text-center'>{product.Stock}</TableCell>
              <TableCell className='text-center'>
                <Button
                  size='icon'
                  variant='ghost'
                  onClick={() => removeProduct(product)}
                >
                  <Trash size={16} color='red' />
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={6} className='text-center'>
              No has añadido productos a la solicitud.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={6} className='pt-4'>
            <h2 className='mb-4 text-lg font-bold'>Detalles de la solicitud</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div>
                <Input
                  type='email'
                  placeholder='email@example.com'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className='w-full'
                />
                <p className='text-sm text-muted-foreground mt-0.5 ml-1'>
                  Tu correo de contacto
                </p>
              </div>
              <div>
                <DatePicker date={date} setDate={setDate} />
                <p className='text-sm text-muted-foreground mt-0.5 ml-1'>
                  Fecha de entrega solicitada
                </p>
              </div>
              <div>
                <Input
                  type='text'
                  placeholder='CeCo proyecto (XX-XXXX)'
                  value={ceco}
                  onChange={e => setCeco(e.target.value)}
                  className='w-full'
                />
                <p className='text-sm text-muted-foreground mt-0.5 ml-1'>
                  Centro de costo del proyecto
                </p>
              </div>
              <div>
                <Input
                  type='text'
                  placeholder='Nombre y apellido'
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className='w-full'
                />
                <p className='text-sm text-muted-foreground mt-0.5 ml-1'>
                  Tu nombre para identificarte
                </p>
              </div>
            </div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={6} className='pt-4'>
            <Textarea
              placeholder='Comentarios de la solicitud'
              value={message}
              onChange={e => setMessage(e.target.value)}
              className='w-full h-full'
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={6} className='pt-4 text-center space-x-4'>
            <ButtonSend onClick={handleSendRequest}>
              Enviar solicitud
            </ButtonSend>
            <Button variant='outline' onClick={clearProducts}>
              Borrar solicitud
            </Button>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
