'use client'

import { useEffect } from 'react'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface Product {
  Product: string
  SKU: string
  Stock: number
  Imagen: string
  objectID: string
  quantity: number
}

interface ProductsState {
  products: Product[]
  addProduct: (product: Product, quantity: number) => void
  removeProduct: (product: Product) => void
  clearProducts: () => void
  setProducts: (products: Product[]) => void
}

const isClient = typeof window !== 'undefined'

const useProductsStore = create<ProductsState>()(
  persist(
    set => ({
      products: [],
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
      removeProduct: (product: Product) =>
        set(state => ({
          products: state.products.filter(p => p.SKU !== product.SKU)
        })),
      clearProducts: () => set({ products: [] }),
      setProducts: (products: Product[]) => set({ products })
    }),
    {
      name: 'products-storage',
      storage: isClient ? createJSONStorage(() => localStorage) : undefined
    }
  )
)

export const useProducts = () => {
  const store = useProductsStore()

  useEffect(() => {
    if (isClient) {
      const storedProducts = localStorage.getItem('products-storage')
      if (storedProducts) {
        try {
          const parsedProducts = JSON.parse(storedProducts)
          if (Array.isArray(parsedProducts)) {
            store.setProducts(parsedProducts)
          }
        } catch (error) {
          console.error('Failed to parse stored products:', error)
        }
      }
    }
  }, [store])

  return store
}
