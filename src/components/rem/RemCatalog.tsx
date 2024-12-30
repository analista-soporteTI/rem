'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { RemCard } from '@/components/rem/RemCard'
import { useRems } from '@/hooks/useRem'
import { Input } from '@/components/ui/input'
import { debounce } from '@/utils/debounce'
import { Pagination } from '@/components/Pagination'
import { RemCatalogLoader } from '@/components/rem/RemCatalogLoader'
import { Label } from '@/components/ui/label'
import { fetchRem } from '@/lib/db/fetchRems'
import { Button } from '../ui/button'
import { ListRestart } from 'lucide-react'
import { Rem } from '@/types/rem'
import { motion, AnimatePresence } from 'framer-motion'

interface RemCatalogProps {
  data: Rem[]
}

const ITEMS_PER_PAGE = 12
const REFRESH_INTERVAL = 10 * 60 * 1000

export function RemCatalog ({ data }: RemCatalogProps) {
  const [loading, setLoading] = useState(true)
  const [showPendingOnly, setShowPendingOnly] = useState(true)
  const { rems, setRems, pinRem, unpinRem, isPinned } = useRems()
  const [remCode, setRemCode] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const debouncedSetRemCode = useMemo(
    () => debounce((value: string) => setRemCode(value), 300),
    []
  )

  const fetchData = useCallback(async () => {
    try {
      const newRems = await fetchRem()
      setRems(newRems)
    } catch (error) {
      console.error('Failed to fetch rems:', error)
    }
  }, [setRems])

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

    setRems(data)
    setLoading(false)
  }, [data, setRems])

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
      const codeMatch = rem.rem_code.includes(remCode.toUpperCase())
      const statusMatch = showPendingOnly ? rem.status === 'Pendiente' : true
      return codeMatch && statusMatch
    })

    const sortedItems = filtered.sort(sortBySolicitud)

    const pinnedItems = sortedItems.filter(rem => isPinned(rem.rem_code))
    const unpinnedItems = sortedItems.filter(rem => !isPinned(rem.rem_code))

    return [...pinnedItems, ...unpinnedItems]
  }, [rems, remCode, showPendingOnly, isPinned])

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
      const newRems = await fetchRem()
      setRems(newRems)
    } catch (error) {
      console.error('Failed to refresh rems:', error)
    } finally {
      setLoading(false)
    }
  }, [setRems])

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
            placeholder='Filtrar por código de solicitud (ejemplo: AA5555)'
            onChange={e => debouncedSetRemCode(e.target.value)}
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
