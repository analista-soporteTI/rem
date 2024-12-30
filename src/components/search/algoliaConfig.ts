import algoliasearch from 'algoliasearch'
import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID
const searchKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY
const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME
const apiKey = process.env.ALGOLIA_API_KEY

export { indexName, appId, searchKey, apiKey }
export const searchClient = algoliasearch(appId ?? '', searchKey ?? '')
export const apiClient = algoliasearch(appId ?? '', apiKey ?? '')
