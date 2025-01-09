import { Product, CustomProduct } from '@/types/product'

export interface EmailSendRemProps {
  rem_code: string
  name: string
  email: string
  dateRequest: Date
  ceco: string
  message: string
  products: Product[]
  customProducts: CustomProduct[]
  delivery: number
  currency: string
}
