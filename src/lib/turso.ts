import { createClient, Client } from '@libsql/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

let tursoInstance: Client | null = null

export const getTursoClient = async (): Promise<Client> => {
  if (!tursoInstance) {
    const url = process.env.TURSO_DATABASE_URL
    const authToken = process.env.TURSO_AUTH_TOKEN
    const syncUrl = process.env.TURSO_DATABASE_URL
    const syncInterval = 60

    if (!url) {
      throw new Error('TURSO_DATABASE_URL environment variable is not set')
    }
    if (!authToken) {
      throw new Error('TURSO_AUTH_TOKEN environment variable is not set')
    }

    tursoInstance = createClient({
      url,
      authToken,
      syncUrl,
      syncInterval
    })
  }

  await tursoInstance.execute('PRAGMA foreign_keys = ON;')

  return tursoInstance
}
