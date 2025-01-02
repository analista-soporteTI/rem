import { CustomProduct } from '@/types/product'

export interface Product {
  sku: string
  name: string
  stock: number | string
  quantity: number
  type: 'product' | 'custom'
}

export interface RemRequestData {
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

export interface CellData {
  v: string | number
  s: Record<string, any>
}

export interface User {
  user_id: string
  name: string
  email: string
}
