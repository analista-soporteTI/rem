'use client'

import { useEffect, useState } from 'react'
import { Rem } from '@/types/rem'
import { User } from '@/types/excel'
import { RemDetailLoader } from '@/components/rem/details/RemDetailLoader'
import { RemDetailHeader } from '@/components/rem/details/RemDetailHeader'
import { RemDetailUser } from '@/components/rem/details/RemDetailUser'
import { RemDetailInfo } from '@/components/rem/details/RemDetailInfo'
import { RemDetailProducts } from '@/components/rem/details/RemDetailProducts'

interface RemDetailProps {
  rem: Rem
  user: User
}

export const RemDetail = ({ rem, user }: RemDetailProps) => {
  const [isLoading, setIsLoading] = useState(true)
  const [remStatus, setRemStatus] = useState(rem.status)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) return <RemDetailLoader />

  return (
    <div className='min-h-screen bg-gray-50/40 p-4 md:p-6 lg:p-8'>
      <div className='mx-auto max-w-5xl space-y-6 pt-14'>
        <RemDetailHeader
          remCode={rem.rem_code}
          status={remStatus}
          onStatusChange={setRemStatus}
        />
        <RemDetailUser user={user} message={rem.message} />
        <RemDetailInfo
          remCode={rem.rem_code}
          dateSend={rem.date_send}
          dateRequest={rem.date_request}
          ceco={rem.ceco}
        />
        <RemDetailProducts
          products={rem.products}
          customProducts={rem.custom_products}
        />
      </div>
    </div>
  )
}
