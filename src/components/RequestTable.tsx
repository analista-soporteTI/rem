'use client'

import { useProducts } from '@/hooks/useProducts'
import { fetchUser } from '@/lib/db/fetchUser'
import { Product } from '@/types/product'
import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { DatePicker } from '@/components/ui/datepicker'
import { Textarea } from '@/components/ui/textarea'
import { ButtonSend } from '@/components/ButtonSend'
import { Trash } from 'lucide-react'
import * as yup from 'yup'

export const RequestTable = () => {
  const {
    products,
    clearProducts,
    removeProduct,
    customProducts,
    addCustomProduct,
    removeCustomProduct,
    updateCustomProduct,
    clearCustomProducts,
    addProduct
  } = useProducts()
  const [userId, setUserId] = useState('')
  const [ceco, setCeco] = useState('')
  const [delivery, setDelivery] = useState(0)
  const [currency, setCurrency] = useState('CLP')
  const [dateRequest, setDateRequest] = useState(new Date())
  const [message, setMessage] = useState('')

  const schema = yup.object().shape({
    userId: yup.number().required('El usuario es requerido'),
    dateRequest: yup.date().required('La fecha es requerida'),
    ceco: yup
      .string()
      .required('El CeCo es requerido')
      .matches(
        /^[A-Za-z]{2}-\d{4}$/,
        'El CeCo debe tener el formato "XX-XXXX"'
      ),
    products: yup.array(),
    customProducts: yup.array().of(
      yup.object().shape({
        id: yup.string().required(),
        name: yup.string().required('El nombre del producto es requerido'),
        value: yup.string(),
        quantity: yup
          .number()
          .min(1, 'La cantidad debe ser al menos 1')
          .required(),
        type: yup.string().equals(['custom'])
      })
    ),
    delivery: yup.number().required('El costo del envío es requerido'),
    currency: yup.string()
  })

  const handleSendRequest = async () => {
    const users = await fetchUser()
    const userIdString = parseInt(userId)
    const user = users.find(user => user.user_id === userIdString)
    const name = user?.name
    const email = user?.email

    const requestData = {
      userId: user?.user_id,
      name,
      email,
      dateRequest,
      ceco,
      message,
      products,
      customProducts,
      delivery,
      currency
    }

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
      clearCustomProducts()
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

  const handleCustomProductQuantityChange = (id: string, value: string) => {
    const quantity = parseInt(value, 10)
    if (quantity >= 1) {
      updateCustomProduct(id, { quantity })
    }
  }

  const handleCustomProductNameChange = (id: string, name: string) => {
    updateCustomProduct(id, { name })
  }

  return (
    <div className='space-y-8'>
      <Card>
        <CardContent className='p-0'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[120px]'>SKU</TableHead>
                <TableHead className='min-w-[200px] w-[400px]'>
                  Producto
                </TableHead>
                <TableHead className='w-[100px] text-center'>
                  Solicitado
                </TableHead>
                <TableHead className='w-[100px] text-center'>Stock</TableHead>
                <TableHead className='w-[40px] text-center'>Eliminar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.length > 0 ? (
                products.map(product => (
                  <TableRow key={product.SKU}>
                    <TableCell className='font-medium'>{product.SKU}</TableCell>
                    <TableCell>{product.Product}</TableCell>
                    <TableCell className='text-center'>
                      <Input
                        type='number'
                        value={product.quantity}
                        onChange={e =>
                          handleQuantityChange(product, e.target.value)
                        }
                        min={1}
                        className='w-20 mx-auto text-center'
                      />
                    </TableCell>
                    <TableCell className='text-center'>
                      {product.Stock}
                    </TableCell>
                    <TableCell className='text-center'>
                      <Button
                        size='icon'
                        variant='ghost'
                        onClick={() => removeProduct(product)}
                        className='mx-auto hover:bg-destructive/20'
                      >
                        <Trash className='size-4 text-destructive' />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className='text-center py-8'>
                    No has añadido productos a la solicitud.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className='max-sm:border-none max-sm:shadow-none'>
        <CardContent className='p-1 sm:p-6'>
          <h2 className='text-xl font-semibold mb-6'>Solicitudes sin código</h2>
          {customProducts.map(product => (
            <div key={product.id} className='flex gap-4 items-center mb-4'>
              <Input
                placeholder='Indique a detalle el producto que desea agregar'
                value={product.name}
                onChange={e =>
                  handleCustomProductNameChange(product.id, e.target.value)
                }
              />
              <Input
                type='number'
                value={product.quantity}
                onChange={e =>
                  handleCustomProductQuantityChange(product.id, e.target.value)
                }
                min={1}
                className='w-20 mx-auto text-center'
              />
              <Button
                size='icon'
                variant='ghost'
                onClick={() => removeCustomProduct(product.id)}
                className='mx-auto shrink-0 hover:bg-destructive/20'
              >
                <Trash className='size-4 text-destructive' />
              </Button>
            </div>
          ))}
          <Button onClick={() => addCustomProduct('')} className='mt-4'>
            Añadir producto
          </Button>
        </CardContent>
      </Card>

      <Card className='max-sm:border-none max-sm:shadow-none'>
        <CardContent className='p-1 sm:p-6'>
          <h2 className='text-xl font-semibold mb-6'>
            Detalles de la solicitud
          </h2>
          <div className='grid gap-6 md:grid-cols-2'>
            <div className='space-y-2'>
              <Label htmlFor='userId'>Usuarios registrados</Label>
              <Select onValueChange={value => setUserId(value)}>
                <SelectTrigger>
                  <SelectValue placeholder='-' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='2'>Daniel Cordero</SelectItem>
                  <SelectItem value='3'>Gino Rojas</SelectItem>
                  <SelectItem value='4'>Rodrigo Latorre</SelectItem>
                  <SelectItem value='5'>Kevin Villarroel</SelectItem>
                  <SelectItem value='6'>Victor Rojas</SelectItem>
                  <SelectItem value='7'>René Dahmen</SelectItem>
                  <SelectItem value='8'>Paulina Gutierrez</SelectItem>
                  <SelectItem value='9'>Marjory Acevedo</SelectItem>
                  <SelectItem value='10'>Francesca Ordenes</SelectItem>
                  <SelectItem value='11'>María Gomez</SelectItem>
                  <SelectItem value='12'>Felipe Azolas</SelectItem>
                  <SelectItem value='13'>Arnaldo Gonzalez</SelectItem>
                  <SelectItem value='14'>Natanael Albiña</SelectItem>
                </SelectContent>
              </Select>
              <p className='text-sm text-muted-foreground'>
                Indica quien eres. Se usará para informar de tus solicitudes.
              </p>
            </div>

            <div className='space-y-2 mt-2.5 flex flex-col'>
              <Label>Fecha de entrega solicitada</Label>
              <DatePicker date={dateRequest} setDate={setDateRequest} />
            </div>

            <div className='space-y-2 md:col-span-2'>
              <Label>Centro de costo del proyecto</Label>
              <Input
                type='text'
                placeholder='CeCo proyecto (XX-XXXX)'
                value={ceco}
                onChange={e => setCeco(e.target.value)}
              />
            </div>

            {userId === '8' || userId === '14' && (
              <>
                <div className='space-y-2 col-span-1'>
                  <Label>Costo total del envío ({currency})</Label>
                  <Input
                    type='number'
                    min={0}
                    value={delivery}
                    onChange={e => setDelivery(Number(e.target.value))}
                  />
                </div>
                <div className='flex items-end col-span-1'>
                  <Button
                    variant={currency === 'CLP' ? 'default' : 'ghost'}
                    onClick={() => setCurrency('CLP')}
                    className='rounded-r-none'
                  >
                    CLP
                  </Button>
                  <Button
                    variant={currency === 'USD' ? 'default' : 'ghost'}
                    onClick={() => setCurrency('USD')}
                    className='rounded-l-none'
                  >
                    USD
                  </Button>
                </div>
              </>
            )}

            <div className='md:col-span-2 space-y-2'>
              <Label>Comentarios de la solicitud</Label>
              <Textarea
                placeholder='Indique cualquier situación, indicación o información adicional que consideres necesaria para el requerimiento.'
                value={message}
                onChange={e => setMessage(e.target.value)}
                className='min-h-[100px]'
              />
            </div>
          </div>

          <div className='mt-6 flex flex-col gap-4 sm:flex-row sm:justify-between items-center'>
            <div className='flex gap-4 w-full sm:w-auto'>
              <ButtonSend
                onClick={handleSendRequest}
                disabled={customProducts.length === 0 && products.length === 0}
              >
                Enviar solicitud
              </ButtonSend>
              <Button
                variant='outline'
                onClick={clearProducts}
                className='flex-1 sm:flex-none'
              >
                Borrar solicitud
              </Button>
            </div>
          </div>
          {products.length === 0 && customProducts.length === 0 && (
            <p className='text-xs text-muted-foreground mt-4'>
              Para enviar la solicitud, debes agregar al menos un producto con o
              sin código.
            </p>
          )}
        </CardContent>
      </Card>
      <p className='text-sm text-muted-foreground text-center'>
        Este sistema se encuentra en fase de desarrollo. Si tienes algún
        problema comunícate con{' '}
        <a
          href='mailto:soporte.ti.diprofire@gmail.com'
          className='hover:underline'
          target='_blank'
        >
          soporte.ti.diprofire@gmail.com
        </a>
      </p>
    </div>
  )
}
