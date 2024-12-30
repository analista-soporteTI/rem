import { getTursoClient } from '@/lib/turso'

export async function fetchUser () {
  const turso = await getTursoClient()

  const { rows: users } = await turso.execute('SELECT * FROM users')

  const usersArray = users.map((row: any) => ({
    user_id: row.user_id,
    name: row.name,
    email: row.email
  }))

  return usersArray
}