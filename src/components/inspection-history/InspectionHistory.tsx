'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useInspections } from '@/hooks/useInspections'
import { fetchInspections } from '@/lib/db/fetchInspections'
import { RemCatalogLoader } from '@/components/rem/RemCatalogLoader'
import { InspectionHistoryCard } from '@/components/inspection-history/InspectionHistoryCard'
import { Pagination } from '@/components/Pagination'
import { motion, AnimatePresence } from 'framer-motion'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ListRestart } from 'lucide-react'
import { debounce } from '@/utils/debounce'

interface InspectionCatalogProps {
  data: any[]
}

const ITEMS_PER_PAGE = 12
const REFRESH_INTERVAL = 10 * 60 * 1000

export const InspectionHistory = ({ data }: InspectionCatalogProps) => {
  const [loading, setLoading] = useState(true)
  const { inspections, setInspections, clearInspections } = useInspections()
  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState('')

  const debouncedSearch = useMemo(
    () => debounce((value: string) => setSearch(value), 300),
    []
  )

  const fetchData = useCallback(async () => {
    try {
      clearInspections()
      const newInspections = await fetchInspections()
      setInspections(newInspections)
    } catch (error) {
      console.error('Failed to fetch inspections:', error)
    }
  }, [clearInspections, setInspections])

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

    clearInspections()
    setInspections(data)
    setLoading(false)
  }, [data, setInspections, clearInspections])

  const filteredAndSortedInspections = useMemo(() => {
    const filtered = inspections.filter(inspection => {
      const searchMatch =
        inspection.id.includes(search.toUpperCase()) ||
        inspection.vehiculo.patente.includes(search.toUpperCase()) ||
        inspection.conductor.nombre.includes(search.toUpperCase()) ||
        inspection.conductor.supervisor.includes(search.toUpperCase())

      return searchMatch
    })

    const sortedItems = filtered.sort((a, b): any => {
      const dateA = new Date(a.fecha_creacion).getTime()
      const dateB = new Date(b.fecha_creacion).getTime()
      return dateB - dateA
    })

    return [...sortedItems]
  }, [inspections, search])

  const paginatedInspections = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredAndSortedInspections.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    )
  }, [filteredAndSortedInspections, currentPage])

  const totalItems = inspections.length
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE)
  const endIndex = Math.min(currentPage * ITEMS_PER_PAGE, totalItems)

  const handleRefresh = useCallback(async () => {
    setLoading(true)
    try {
      clearInspections()
      const newInspections = await fetchInspections()
      setInspections(newInspections)
    } catch (error) {
      console.error('Failed to refresh inspections:', error)
    } finally {
      setLoading(false)
    }
  }, [setInspections, clearInspections])

  if (!data?.length) {
    return (
      <p className='text-center text-gray-500'>
        No hay inspecciones registradas.
      </p>
    )
  }

  console.log('inspections',inspections)

  return (
    <>
      <section className='flex flex-wrap gap-4'>
        <Label
          htmlFor='inspectionCodeFilter'
          className='flex flex-col gap-1 w-full max-w-xl'
          title='Código REM'
        >
          <Input
            type='text'
            id='inspectionCodeFilter'
            placeholder='Filtrar por código, patente o nombre'
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
      </section>
      <section className='flex flex-wrap gap-4 mt-10'>
        {loading ? (
          <RemCatalogLoader />
        ) : (
          <AnimatePresence mode='popLayout'>
            {paginatedInspections.map(inspection => (
              <motion.div
                key={inspection.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <InspectionHistoryCard key={inspection.id} inspection={inspection} />
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
    </>
  )
}
