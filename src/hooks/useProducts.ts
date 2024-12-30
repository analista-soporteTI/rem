'use client'

import { Product } from '@/types/product'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface CustomProduct {
  id: string
  name: string
  value: string
  quantity: number
  type: 'custom'
}

interface ProductsState {
  products: Product[]
  customProducts: CustomProduct[]
  addProduct: (product: Product, quantity: number) => void
  removeProduct: (product: Product) => void
  clearProducts: () => void
  setProducts: (products: Product[]) => void
  updateProduct: (product: Product) => void
  addCustomProduct: (name: string) => void
  removeCustomProduct: (id: string) => void
  updateCustomProduct: (id: string, updates: Partial<CustomProduct>) => void
  clearCustomProducts: () => void
}

const useProductsStore = create<ProductsState>()(
  persist(
    set => ({
      products: [],
      customProducts: [],
      addProduct: (product: Product, quantity: number) =>
        set(state => {
          const existingProductIndex = state.products.findIndex(
            p => p.SKU === product.SKU
          )
          if (existingProductIndex > -1) {
            const updatedProducts = [...state.products]
            updatedProducts[existingProductIndex] = {
              ...updatedProducts[existingProductIndex],
              quantity:
                updatedProducts[existingProductIndex].quantity + quantity
            }
            return { products: updatedProducts }
          }
          return { products: [...state.products, { ...product, quantity }] }
        }),
      updateProduct: (product: Product) =>
        set(state => {
          const existingProductIndex = state.products.findIndex(
            p => p.SKU === product.SKU
          )
          if (existingProductIndex > -1) {
            const updatedProducts = [...state.products]
            updatedProducts[existingProductIndex] = {
              ...updatedProducts[existingProductIndex],
              ...product
            }
            return { products: updatedProducts }
          }
          return state
        }),
      removeProduct: (product: Product) =>
        set(state => ({
          products: state.products.filter(p => p.SKU !== product.SKU)
        })),
      clearProducts: () => set({ products: [] }),
      setProducts: (products: Product[]) => set({ products }),
      addCustomProduct: (name: string) =>
        set(state => ({
          customProducts: [
            ...state.customProducts,
            {
              id: crypto.randomUUID(),
              name,
              value: '',
              quantity: 1,
              type: 'custom' as const
            }
          ]
        })),
      removeCustomProduct: (id: string) =>
        set(state => ({
          customProducts: state.customProducts.filter(p => p.id !== id)
        })),
      updateCustomProduct: (id: string, updates: Partial<CustomProduct>) =>
        set(state => ({
          customProducts: state.customProducts.map(p =>
            p.id === id ? { ...p, ...updates } : p
          )
        })),
      clearCustomProducts: () => set({ customProducts: [] })
    }),
    {
      name: 'products-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
)

export const useProducts = () => useProductsStore()
