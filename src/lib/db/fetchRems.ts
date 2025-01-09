import { getTursoClient } from '@/lib/turso'

export async function fetchRem () {
  const turso = await getTursoClient()

  const { rows: products } = await turso.execute('SELECT * FROM products')
  const { rows: rems } = await turso.execute('SELECT * FROM rems')
  const { rows: rem_products } = await turso.execute(
    'SELECT * FROM rem_products'
  )
  const { rows: custom_products } = await turso.execute(
    'SELECT * FROM rem_custom_products'
  )

  const remsWithProducts = rems.map(rem => {
    const relatedRemProducts = rem_products.filter(
      rp => rp.rem_code === rem.rem_code
    )

    const detailedProducts = relatedRemProducts.map(rp => {
      const productInfo = products.find(prod => prod.sku === rp.sku)
      return {
        id_related_product: rp.id,
        sku: productInfo?.sku,
        quantity: rp.quantity,
        id_product: productInfo?.id,
        image: productInfo?.image,
        name: productInfo?.name,
        stock: productInfo?.stock
      }
    })

    const customProducts = custom_products.filter(
      cp => cp.rem_code === rem.rem_code
    )

    const formattedCustomProducts = customProducts.map(cp => {
      return {
        name: cp.name,
        quantity: cp.quantity
      }
    })

    const formattedData = {
      rem_code: rem.rem_code,
      ceco: rem.ceco,
      status: rem.status,
      date_send: rem.date_send,
      date_request: rem.date_request,
      message: rem.message,
      user_id: rem.user_id,
      products: detailedProducts,
      custom_products: formattedCustomProducts,
      delivery: rem.delivery,
      currency: rem.currency
    }

    return {
      ...formattedData
    }
  })

  return remsWithProducts
}
