'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle
} from '@/components/ui/card'
import { Toaster } from '@/components/ui/toaster'
import { toast } from '@/hooks/use-toast'
import { useProducts } from '@/hooks/useProducts'
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
    <Card
      key={hit.objectID}
      className='w-[290px] hover:shadow-lg transition-shadow duration-200'
    >
      <CardContent className='p-4 space-y-2'>
        <CardTitle className='text-base font-semibold line-clamp-2'>
          {hit.Product}
        </CardTitle>
        <CardDescription className='flex flex-col pt-2 border-t border-gray-200 text-muted-foreground'>
          <span>SKU: {hit.SKU}</span>
          <span>Stock: {hit.Stock} und.</span>
        </CardDescription>
      </CardContent>
      <CardFooter className='px-4 py-4 bg-gray-50 border-t flex items-center justify-between gap-3'>
        <Input
          type='number'
          placeholder='1'
          className='w-24 text-center'
          value={quantity}
          onChange={e => setQuantity(Number(e.currentTarget.value))}
          min={1}
        />
        <Button
          onClick={handleAddProduct}
          className='flex-1 bg-primary hover:bg-primary/90'
        >
          Añadir a REM
        </Button>
        <Toaster />
      </CardFooter>
    </Card>
  )
}
