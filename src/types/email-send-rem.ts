import { Product } from "@/types/product"

export interface EmailSendRemProps {
  name: string
  email: string
  date: string
  ceco: string
  message: string
  products: Product[]
}