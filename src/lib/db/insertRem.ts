import { getTursoClient } from '@/lib/turso'
import { CustomProduct } from '@/types/product'

export const insertRem = async (
  rem_code: string,
  ceco: string,
  dateSend: Date,
  dateRequest: Date,
  message: string,
  userId: number,
  products: any[],
  customProducts: CustomProduct[],
  delivery: number,
  currency: string
) => {
  const turso = await getTursoClient()
  let transactionStarted = false

  try {
    await turso.execute('BEGIN;')
    transactionStarted = true

    const remsQuery = `
      INSERT INTO rems (rem_code, ceco, date_send, date_request, message, status, user_id, delivery, currency)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
    `

    const remsParams = [
      rem_code,
      ceco,
      dateSend.toISOString().split('T')[0],
      dateRequest.toISOString().split('T')[0],
      message,
      'Pendiente',
      userId,
      delivery,
      currency
    ]

    await turso.execute({
      sql: remsQuery,
      args: remsParams
    })

    if (products.length > 0) {
      const remProductsQuery = `
        INSERT INTO rem_products (rem_code, sku, quantity)
        VALUES ${products.map(() => '(?, ?, ?)').join(', ')};
      `

      const remProductsParams: (string | number)[] = []
      products.forEach((product: any) => {
        remProductsParams.push(
          String(rem_code),
          String(product.SKU),
          Number(product.quantity)
        )
      })

      await turso.execute({
        sql: remProductsQuery,
        args: remProductsParams
      })
    }

    if (customProducts.length > 0) {
      const remCustomProductsQuery = `
        INSERT INTO rem_custom_products (rem_code, name, quantity)
        VALUES ${customProducts.map(() => '(?, ?, ?)').join(', ')};
      `

      const remCustomProductsParams: (string | number)[] = []
      customProducts.forEach(product => {
        remCustomProductsParams.push(
          String(rem_code),
          String(product.name),
          Number(product.quantity)
        )
      })

      await turso.execute({
        sql: remCustomProductsQuery,
        args: remCustomProductsParams
      })
    }

    await turso.execute('COMMIT;')
    transactionStarted = false
    return true
  } catch (error) {
    if (transactionStarted) {
      try {
        await turso.execute('ROLLBACK;')
      } catch (rollbackError) {
        console.error('Error during rollback:', rollbackError)
      }
    }
    console.error('Error in batch operation:', error)

    if (error) {
      throw new Error(
        'Foreign key constraint violation. Ensure related records exist in referenced tables.'
      )
    } else {
      throw new Error(`Batch operation failed. Error: ${error}`)
    }
  }
}
