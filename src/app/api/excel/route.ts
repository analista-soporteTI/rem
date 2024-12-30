import { fetchUser } from '@/lib/db/fetchUser'
import { CustomProduct } from '@/types/product'
import { NextResponse } from 'next/server'
import * as XLSX from 'xlsx-js-style'

interface Product {
  sku: string
  name: string
  stock: number | string
  quantity: number
  type: 'product' | 'custom'
}

interface RemRequestData {
  rem_code: string
  userId: string
  dateSend: string
  dateRequest: string
  ceco: string
  message: string
  products: Array<{
    sku: string
    name: string
    stock: number
    quantity: number
  }>
  customProducts: CustomProduct[]
}

interface CellData {
  v: string | number
  s: Record<string, any>
}

const STYLES = {
  border: {
    top: { style: 'thin', color: { rgb: '666666' } },
    bottom: { style: 'thin', color: { rgb: '666666' } },
    left: { style: 'thin', color: { rgb: '666666' } },
    right: { style: 'thin', color: { rgb: '666666' } }
  },
  header: {
    fill: { patternType: 'solid', fgColor: { rgb: '006064' } },
    font: { name: 'Arial', bold: true, color: { rgb: 'FFFFFF' }, sz: 11 },
    alignment: { horizontal: 'center', vertical: 'center', wrapText: true }
  },
  cell: {
    base: {
      font: { name: 'Arial', sz: 11 },
      alignment: { horizontal: 'left', vertical: 'center' }
    },
    label: { fill: { patternType: 'solid', fgColor: { rgb: 'F5F5F5' } } },
    value: { fill: { patternType: 'solid', fgColor: { rgb: 'FFFFFF' } } },
    title: {
      font: { bold: true, sz: 16, name: 'Arial', color: { rgb: '006064' } }
    }
  }
}

const createInfoRow = (
  label1: string,
  value1: string,
  label2: string,
  value2: string
): CellData[] => [
  {
    v: label1,
    s: { ...STYLES.cell.base, ...STYLES.cell.label, border: STYLES.border }
  },
  {
    v: value1,
    s: { ...STYLES.cell.base, ...STYLES.cell.value, border: STYLES.border }
  },
  {
    v: '',
    s: { ...STYLES.cell.base, ...STYLES.cell.value, border: STYLES.border }
  },
  {
    v: label2,
    s: { ...STYLES.cell.base, ...STYLES.cell.label, border: STYLES.border }
  },
  {
    v: value2,
    s: { ...STYLES.cell.base, ...STYLES.cell.value, border: STYLES.border }
  }
]

const createHeaderSection = (data: RemRequestData, user: any): CellData[][] => {
  const headerRows: CellData[][] = [
    [{ v: '', s: { border: null } }],
    [
      {
        v: `REM ${data.rem_code} ${data.ceco}`,
        s: { ...STYLES.cell.title }
      }
    ],
    [{ v: '', s: { border: null } }],
    createInfoRow('CENTRO DE COSTO', data.ceco, 'OC', ''),
    createInfoRow(
      'NOMBRE DE LA OBRA',
      '',
      'Nº DE REQUERIMIENTO',
      data.rem_code
    ),
    createInfoRow(
      'SOLICITANTE REM',
      user.name,
      'Fecha emisión',
      new Date(data.dateSend).toLocaleDateString()
    ),
    createInfoRow(
      'CORREO DE CONTACTO',
      user.email,
      'Fecha entrega',
      new Date(data.dateRequest).toLocaleDateString()
    )
  ]
  return headerRows
}

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

const createProductRows = (data: RemRequestData): CellData[][] => {
  console.log(data)

  const headers = [
    { v: 'CODIGO', s: { ...STYLES.header, border: STYLES.border } },
    { v: 'PRODUCTO', s: { ...STYLES.header, border: STYLES.border } },
    { v: 'STOCK', s: { ...STYLES.header, border: STYLES.border } },
    { v: 'SOLICITADO', s: { ...STYLES.header, border: STYLES.border } },
    { v: 'UN. MED.', s: { ...STYLES.header, border: STYLES.border } }
  ]

  const standardProducts = (data.products || []).map(p => ({
    sku: p.sku,
    name: p.name,
    stock: p.stock,
    quantity: p.quantity,
    type: 'product' as const
  }))

  const custom = (data.customProducts || []).map(p => ({
    sku: '',
    name: p.name,
    stock: '',
    quantity: p.quantity,
    type: 'custom' as const
  }))

  const products: Product[] = [...standardProducts, ...custom]

  return [
    headers as CellData[],
    ...products.map((product, idx) => createProductRow(product, idx))
  ]
}

const generateExcel = (data: RemRequestData, user: any) => {
  const workbook = XLSX.utils.book_new()
  const rows: CellData[][] = [
    ...createHeaderSection(data, user),
    [{ v: '', s: { border: null } }],
    ...createProductRows(data),
    [{ v: '', s: { border: null } }],
    [
      {
        v: 'Message',
        s: {
          ...STYLES.header,
          border: STYLES.border,
          alignment: { horizontal: 'left' }
        }
      }
    ],
    [
      {
        v: data.message || '',
        s: {
          ...STYLES.cell.base,
          border: STYLES.border,
          alignment: { vertical: 'top', wrapText: true }
        }
      }
    ]
  ]

  const worksheet = XLSX.utils.aoa_to_sheet(rows)

  worksheet['!cols'] = [
    { wch: 25 },
    { wch: 50 },
    { wch: 12 },
    { wch: 25 },
    { wch: 12 },
    { wch: 25 }
  ]

  worksheet['!merges'] = [
    { s: { r: 1, c: 0 }, e: { r: 1, c: 5 } },
    { s: { r: 3, c: 1 }, e: { r: 3, c: 2 } },
    { s: { r: 4, c: 1 }, e: { r: 4, c: 2 } },
    { s: { r: 5, c: 1 }, e: { r: 5, c: 2 } },
    { s: { r: 6, c: 1 }, e: { r: 6, c: 2 } },
    { s: { r: rows.length - 2, c: 0 }, e: { r: rows.length - 2, c: 4 } },
    { s: { r: rows.length - 1, c: 0 }, e: { r: rows.length - 1, c: 4 } }
  ]

  XLSX.utils.book_append_sheet(workbook, worksheet, 'REM')
  return XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' })
}

export async function POST (request: Request) {
  try {
    const data = (await request.json()) as RemRequestData
    const users = await fetchUser()
    const user = users.find(u => u.user_id === data.userId)

    if (!user) {
      return Response.json(
        { error: 'No hay usuario registrado' },
        { status: 404 }
      )
    }

    const buffer = generateExcel(data, user)
    const headers = new Headers({
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="REM_${data.rem_code}_${data.ceco}.xlsx"`
    })

    return new NextResponse(buffer, { status: 200, headers })
  } catch (error) {
    console.error('Error generating Excel file:', error)
    return NextResponse.json(
      { error: 'Error al generar el archivo Excel' },
      { status: 500 }
    )
  }
}
