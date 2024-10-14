'use client'

import { create } from 'zustand'

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
}

const loadProductsFromLocalStorage = (): Product[] => {
  const products = localStorage.getItem('products')
  return products ? JSON.parse(products) : []
}

export const useProducts = create<ProductsState>(set => ({
  products: loadProductsFromLocalStorage(),

  addProduct: (product: Product, quantity: number) =>
    set(state => {
      const exists = state.products.some(p => p.SKU === product.SKU)
      if (exists) {
        return {
          products: state.products.map(p =>
            p.SKU === product.SKU
              ? { ...p, quantity: p.quantity + quantity }
              : p
          )
        }
      }
      return { products: [...state.products, { ...product, quantity }] }
    }),

  removeProduct: (product: Product) =>
    set(state => ({
      products: state.products.filter(p => p.SKU !== product.SKU)
    })),

  clearProducts: () =>
    set(() => ({
      products: []
    }))
}))

const persistProducts = (products: Product[]) => {
  localStorage.setItem('products', JSON.stringify(products))
}

useProducts.subscribe(state => {
  persistProducts(state.products)
})
