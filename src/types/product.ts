export interface Product {
  Product: string
  SKU: string
  Stock: number
  Imagen: string
  objectID: string
  quantity: number
}

export interface CustomProduct {
  name: string
  quantity: number
}

export interface ProductRelated {
  id_related_product: number
  id_product: number
  sku: string
  name: string
  quantity: number
  stock: number
  image: string
}

export interface NewProductRelated {
  rem_code: string
  sku: string
  quantity: number
}
