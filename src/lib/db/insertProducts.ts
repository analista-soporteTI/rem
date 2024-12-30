import { apiClient } from '@/components/search/algoliaConfig'
import { getTursoClient } from '@/lib/turso'

export const updateProducts = async () => {
  console.log('Updating products...')
  const turso = await getTursoClient()
  const BATCH_SIZE = 1000

  try {
    console.log('Fetching data from Algolia...')
    const index = apiClient.initIndex('beta_rem')

    let allHits: any[] = []
    await index.browseObjects({
      query: '',
      attributesToRetrieve: ['SKU', 'Product', 'Stock', 'Imagen'],
      batch: (hits: any) => {
        allHits = allHits.concat(hits)
      }
    })

    console.log('Total records from Algolia:', allHits.length)

    const uniqueProducts = new Map()
    allHits.forEach((product: any) => {
      if (product.SKU) {
        uniqueProducts.set(product.SKU, {
          sku: product.SKU,
          name: product.Product || '',
          image: product.Imagen || '',
          stock: Number(product.Stock) || 0
        })
      }
    })

    const products = Array.from(uniqueProducts.values())
    console.log('Unique products to process:', products.length)

    for (let i = 0; i < products.length; i += BATCH_SIZE) {
      const batch = products.slice(i, i + BATCH_SIZE)
      console.log(
        `Processing batch ${i / BATCH_SIZE + 1} of ${Math.ceil(
          products.length / BATCH_SIZE
        )}`
      )

      const productsQuery = `
        INSERT INTO products (sku, name, image, stock, description)
        VALUES ${batch.map(() => '(?, ?, ?, ?, ?)').join(', ')}
        ON CONFLICT(sku) DO UPDATE SET
          name = excluded.name,
          image = excluded.image,
          stock = excluded.stock,
          description = '';
      `

      const productsParams: (string | number)[] = []
      batch.forEach(product => {
        productsParams.push(
          String(product.sku),
          String(product.name),
          String(product.image),
          Number(product.stock),
          ''
        )
      })

      await turso.execute({
        sql: productsQuery,
        args: productsParams
      })
    }

    console.log('Finished updating products successfully')
    return true
  } catch (error) {
    console.error('Error in updateProducts:', error)
    throw new Error(`Products update failed: ${error}`)
  }
}
