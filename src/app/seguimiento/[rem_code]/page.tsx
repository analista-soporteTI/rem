import { fetchRem } from '@/lib/db/fetchRems'
import { fetchUser } from '@/lib/db/fetchUser'
import { RemDetail } from '@/components/rem/details/RemDetail'

export default async function RemDetailPage ({
  params
}: {
  params: Promise<{ rem_code: string }>
}) {
  const rem_id = (await params).rem_code

  const rems = await fetchRem()
  const rem = rems.find(rem => rem.rem_code === rem_id)

  const users = await fetchUser()
  const user = users?.find(user => user.user_id === rem?.user_id)

  if (!rem || !user) {
    return <p>No se encontró la solicitud</p>
  }

  return <RemDetail rem={rem} user={user} />
}
