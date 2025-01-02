'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { Rem } from '@/types/rem'
import { useRems } from '@/hooks/useRem'
import { fetchRem } from '@/lib/db/fetchRems'
import { debounce } from '@/utils/debounce'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { RemCatalogLoader } from '@/components/rem/RemCatalogLoader'
import { RemCard } from '@/components/rem/RemCard'
import { Pagination } from '@/components/Pagination'
import { motion, AnimatePresence } from 'framer-motion'
import { ListRestart } from 'lucide-react'

interface RemCatalogProps {
  data: Rem[]
}

const ITEMS_PER_PAGE = 12
const REFRESH_INTERVAL = 10 * 60 * 1000

export const RemCatalog = ({ data }: RemCatalogProps) => {
  const [loading, setLoading] = useState(true)
  const [showPendingOnly, setShowPendingOnly] = useState(true)
  const { rems, setRems, clearRems, pinRem, unpinRem, isPinned } = useRems()
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const debouncedSearch = useMemo(
    () => debounce((value: string) => setSearch(value), 300),
    []
  )

  const fetchData = useCallback(async () => {
    try {
      clearRems()
      const newRems = await fetchRem()
      setRems(newRems)
    } catch (error) {
      console.error('Failed to fetch rems:', error)
    }
  }, [clearRems, setRems])

  useEffect(() => {
    fetchData()

    const interval = setInterval(fetchData, REFRESH_INTERVAL)
    return () => clearInterval(interval)
  }, [fetchData])

  useEffect(() => {
    if (!data?.length) {
      setLoading(false)
      return
    }

    clearRems()
    setRems(data)
    setLoading(false)
  }, [data, setRems, clearRems])

  const handlePinToggle = useCallback(
    (remCode: string) => {
      if (isPinned(remCode)) {
        unpinRem(remCode)
      } else {
        pinRem(remCode)
      }
    },
    [pinRem, unpinRem, isPinned]
  )

  const filteredAndSortedRems = useMemo(() => {
    const sortBySolicitud = (a: Rem, b: Rem) => {
      const getNumber = (code: string) =>
        parseInt(code.replace(/[^0-9]/g, '')) || 0
      return getNumber(b.rem_code) - getNumber(a.rem_code)
    }

    const filtered = rems.filter(rem => {
      const searchMatch =
        rem.rem_code.includes(search.toUpperCase()) ||
        rem.ceco.includes(search.toUpperCase())

      const statusMatch = showPendingOnly ? rem.status === 'Pendiente' : true
      return searchMatch && statusMatch
    })

    const sortedItems = filtered.sort(sortBySolicitud)

    const pinnedItems = sortedItems.filter(rem => isPinned(rem.rem_code))
    const unpinnedItems = sortedItems.filter(rem => !isPinned(rem.rem_code))

    return [...pinnedItems, ...unpinnedItems]
  }, [rems, search, showPendingOnly, isPinned])

  const paginatedRems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredAndSortedRems.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [filteredAndSortedRems, currentPage])

  const totalItems = filteredAndSortedRems.length
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE)
  const endIndex = Math.min(currentPage * ITEMS_PER_PAGE, totalItems)

  const handleRefresh = useCallback(async () => {
    setLoading(true)
    try {
      clearRems()
      const newRems = await fetchRem()
      setRems(newRems)
    } catch (error) {
      console.error('Failed to refresh rems:', error)
    } finally {
      setLoading(false)
    }
  }, [setRems, clearRems])

  const togglePendingFilter = useCallback(() => {
    setShowPendingOnly(prev => !prev)
    setCurrentPage(1)
  }, [])

  if (!data?.length) {
    return <p className='text-center text-gray-500'>No hay rems registradas.</p>
  }

  return (
    <div className='space-y-6'>
      <section className='flex flex-wrap gap-4'>
        <Label
          htmlFor='remCodeFilter'
          className='flex flex-col gap-1 w-full max-w-xl'
          title='Código REM'
        >
          <Input
            type='text'
            id='remCodeFilter'
            placeholder='Filtrar por código o CeCo de solicitud'
            onChange={e => debouncedSearch(e.target.value)}
            className='w-full'
          />
        </Label>

        <Button
          onClick={handleRefresh}
          disabled={loading}
          className='flex items-center gap-2'
        >
          <ListRestart size={16} />
          {loading ? 'Cargando...' : 'Actualizar listado'}
        </Button>

        <Button
          onClick={togglePendingFilter}
          variant={showPendingOnly ? 'secondary' : 'default'}
        >
          {showPendingOnly ? 'Mostrar todos' : 'Mostrar pendientes'}
        </Button>
      </section>

      <section className='flex flex-wrap gap-4'>
        {loading ? (
          <RemCatalogLoader />
        ) : (
          <AnimatePresence mode='popLayout'>
            {paginatedRems.map(rem => (
              <motion.div
                key={rem.rem_code}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <RemCard
                  rem={rem}
                  pinRem={handlePinToggle}
                  isPinned={isPinned(rem.rem_code)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </section>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        endIndex={endIndex}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}
