import { updateProducts } from '@/lib/db/insertProducts'

export default async function updateProductsDb () {
  try {
    await updateProducts()
    return new Response('Products updated successfully', { status: 200 })
  } catch (error) {
    return new Response('Error updating products: ' + error, {
      status: 500
    })
  }
}
