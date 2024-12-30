'use client'

import { useRef, useEffect, useState } from 'react'
import { useSearchBox, Hits } from 'react-instantsearch'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { HitCardProps } from '@/types/hitcard'
import { SuggestionItemProps } from '@/types/suggestion-item'

const SuggestionItem = ({
  hit,
  onClick,
  setShowSuggestions
}: SuggestionItemProps) => (
  <div
    className='suggestion-item lowercase p-2 hover:bg-gray-100 cursor-pointer'
    tabIndex={0}
    role='button'
    onKeyDown={e => e.key === 'Enter' && onClick(hit.Product)}
    onClick={() => {
      onClick(hit.Product)
      setShowSuggestions(false)
    }}
  >
    <span>{hit.Product}</span>
  </div>
)

const SearchSuggestions = ({
  onSuggestionClick,
  setShowSuggestions
}: {
  onSuggestionClick: (query: string) => void
  setShowSuggestions: (value: boolean) => void
}) => {
  return (
    <div className='absolute search-suggestions bg-white border border-gray-300 mt-2 rounded-lg shadow-lg'>
      <Hits
        hitComponent={({ hit }: HitCardProps) => (
          <SuggestionItem
            hit={hit}
            onClick={onSuggestionClick}
            setShowSuggestions={setShowSuggestions}
          />
        )}
      />
    </div>
  )
}

export const SearchBar = () => {
  const { query, refine } = useSearchBox()
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchBoxRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSuggestionClick = (suggestion: string) => {
    refine(suggestion)
    setShowSuggestions(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        inputRef.current?.focus()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div className='relative' ref={searchBoxRef}>
      <div className='relative'>
        <Search className='absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
        <Input
          id='customSearchAlgolia'
          ref={inputRef}
          type='search'
          value={query}
          onChange={e => {
            refine(e.currentTarget.value)
            setShowSuggestions(true)
          }}
          placeholder='Buscar producto por nombre o SKU'
          autoComplete='off'
          className='lowercase pl-8'
        />
      </div>
      {query && showSuggestions && (
        <SearchSuggestions
          onSuggestionClick={handleSuggestionClick}
          setShowSuggestions={setShowSuggestions}
        />
      )}
    </div>
  )
}
