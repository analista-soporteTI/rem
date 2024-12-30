'use client'

import { InstantSearch, Configure } from 'react-instantsearch'
import { SearchBar } from '@/components/search/SearchBar'
import { CustomInfiniteHits } from '@/components/search/CustomInfiniteHits'
import { indexName, searchClient } from '@/components/search/algoliaConfig'

export const ProductCatalog = () => {
  return (
    <section className='mb-6'>
      <InstantSearch
        indexName={indexName}
        searchClient={searchClient}
        future={{
          preserveSharedStateOnUnmount: true
        }}
      >
        <div className='mb-10 flex flex-wrap gap-6 lg:gap-10 xl:gap-20'>
          <div className='w-full max-w-xl'>
            <SearchBar />
          </div>
        </div>
        <Configure />
        <CustomInfiniteHits />
      </InstantSearch>
    </section>
  )
}
