import { CellData, Product, RemRequestData } from '@/types/excel'
import { STYLES } from '@/services/excel/excel-styles'

const createProductRow = (product: Product, index: number): CellData[] => {
  const style = {
    ...STYLES.cell.base,
    border: STYLES.border,
    fill: {
      patternType: 'solid',
      fgColor: { rgb: index % 2 === 0 ? 'FFFFFF' : 'F8F9FA' }
    }
  }

  return [
    { v: product.sku, s: style },
    { v: product.name, s: style },
    { v: product.stock, s: { ...style, alignment: { horizontal: 'center' } } },
    {
      v: product.quantity,
      s: { ...style, alignment: { horizontal: 'center' } }
    },
    { v: 'und', s: { ...style, alignment: { horizontal: 'center' } } },
    { v: '', s: style }
  ]
}

const getHeaders = (): CellData[] => [
  { v: 'CODIGO', s: { ...STYLES.header, border: STYLES.border } },
  { v: 'PRODUCTO', s: { ...STYLES.header, border: STYLES.border } },
  { v: 'STOCK', s: { ...STYLES.header, border: STYLES.border } },
  { v: 'SOLICITADO', s: { ...STYLES.header, border: STYLES.border } },
  { v: 'UN. MED.', s: { ...STYLES.header, border: STYLES.border } },
  { v: 'COMENTARIO', s: { ...STYLES.header, border: STYLES.border } }
]

const transformProducts = (data: RemRequestData): Product[] => {
  const standardProducts = (data.products || []).map((p: any) => ({
    sku: p.sku,
    name: p.name,
    stock: p.stock,
    quantity: p.quantity,
    type: 'product' as const
  }))

  const custom = (data.customProducts || []).map((p: any) => ({
    sku: '',
    name: p.name,
    stock: '',
    quantity: p.quantity,
    type: 'custom' as const
  }))

  return [...standardProducts, ...custom]
}

export const generateProducts = (data: RemRequestData): CellData[][] => {
  const products = transformProducts(data)
  return [
    getHeaders(),
    ...products.map((product, idx) => createProductRow(product, idx))
  ]
}
