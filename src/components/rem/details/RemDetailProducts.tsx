import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

interface Product {
  sku?: string
  name: string
  quantity: number
}

interface RemDetailProducts {
  products: Product[]
  customProducts: Product[]
}

export const RemDetailProducts = ({ products, customProducts }: RemDetailProducts) => (
  <Card>
    <CardHeader>
      <CardTitle className='text-base font-medium'>
        Productos Solicitados
      </CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[50%]'>Producto</TableHead>
            <TableHead>Código</TableHead>
            <TableHead className='text-right'>Cantidad</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((product) => (
            <TableRow key={product.sku}>
              <TableCell className='font-medium'>{product.name}</TableCell>
              <TableCell className='text-gray-500'>{product.sku}</TableCell>
              <TableCell className='text-right'>{product.quantity}</TableCell>
            </TableRow>
          ))}
          {customProducts?.map((product) => (
            <TableRow key={product.name}>
              <TableCell className='font-medium'>{product.name}</TableCell>
              <TableCell className='text-gray-500'>N/A</TableCell>
              <TableCell className='text-right'>{product.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
)