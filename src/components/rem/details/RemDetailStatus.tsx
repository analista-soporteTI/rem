import { useState } from 'react'
import { RemDetailSelect } from '@/components/rem/details/RemDetailSelect'
import { useToast } from '@/hooks/use-toast'

interface RemDetailStatusProps {
  value: string
  onValueChange: (value: string) => void
  remCode: string
}

export const RemDetailStatus = ({
  value,
  onValueChange,
  remCode
}: RemDetailStatusProps) => {
  const [isUpdating, setIsUpdating] = useState(false)
  const { toast } = useToast()

  const handleStatusChange = async (newStatus: string) => {
    setIsUpdating(true)
    try {
      const res = await fetch(`/api/update/${remCode}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ remCode: remCode, status: newStatus })
      })

      if (!res.ok) throw new Error('Failed to update status')

      onValueChange(newStatus)
      toast({
        title: 'Estado actualizado',
        description: `El estado se actualizó a ${newStatus}`
      })
    } catch (error) {
      console.error('Error updating status:', error)
      toast({
        title: 'Error',
        description: 'No se pudo actualizar el estado',
        variant: 'destructive'
      })
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <RemDetailSelect
      value={value}
      onValueChange={handleStatusChange}
      disabled={isUpdating}
    />
  )
}
