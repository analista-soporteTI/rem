'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Toaster } from '@/components/ui/toaster'
import { toast } from '@/hooks/use-toast'
import { useProducts } from '@/hooks/useProducts'
import imgNotFound from '@/assets/not found.png'
import { HitCardProps } from '@/types/hitcard'

export const HitCard = ({ hit }: HitCardProps) => {
  const { addProduct } = useProducts()
  const [quantity, setQuantity] = useState(1)

  const handleAddProduct = () => {
    addProduct({ ...hit, quantity: 0 }, quantity)
    toast({
      title: 'Producto añadido',
      description: `${hit.Product}, ${quantity} ${
        quantity > 1 ? 'unidades' : 'unidad'
      }`,
      variant: 'default',
      duration: 1200,
      className: 'shadow-none border-2 border-border'
    })
  }

  return (
    <Card key={hit.objectID} className='w-[290px]'>
      <CardHeader>
        <Image
          src={hit.Imagen || imgNotFound}
          alt={`Imagen referencial del producto ${hit.Product}`}
          width={120}
          height={120}
          className='mx-auto'
        />
      </CardHeader>
      <CardContent>
        <CardTitle className='text-base mb-2'>
          {hit.Product}
        </CardTitle>
        <CardDescription className='border-t pt-2'>
          SKU: {hit.SKU}
        </CardDescription>
        <p className='text-sm text-muted-foreground'>
          Stock disponible: {hit.Stock} und.
        </p>
      </CardContent>
      <CardFooter className='flex justify-between gap-4'>
        <Input
          type='number'
          placeholder='1'
          className='max-w-[80px]'
          value={quantity}
          onChange={e => setQuantity(Number(e.currentTarget.value))}
          min={1}
        />
        <Button onClick={handleAddProduct}>Añadir a REM</Button>
        <Toaster />
      </CardFooter>
    </Card>
  )
}
