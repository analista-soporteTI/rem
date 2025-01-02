import { Mail } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { User } from '@/types/excel'

interface RemDetailUserProps {
  user: User
  message: string
}

export const RemDetailUser = ({ user, message }: RemDetailUserProps) => {
  const shortName = user?.name
    ? user.name
        .split(' ')
        .map((word: string) => word[0])
        .join('')
    : 'N/A'

  return (
    <Card className='border-l-4 border-l-green-500'>
      <CardContent className='pt-6'>
        <div className='flex items-start gap-4'>
          <Avatar className='h-10 w-10 border'>
            <AvatarFallback className='bg-primary/10 text-primary'>
              {shortName}
            </AvatarFallback>
          </Avatar>
          <div className='flex-1 min-w-0'>
            <h3 className='font-medium text-base text-gray-900 mb-1.5'>
              {user.name}
            </h3>
            <div className='flex items-center gap-2 text-sm text-gray-600 mb-2'>
              <Mail className='h-4 w-4 text-gray-400' />
              <span>{user.email}</span>
            </div>
            <p className='text-sm text-gray-500'>
              {message || 'No hay mensajes para esta solicitud'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
