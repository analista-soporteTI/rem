export interface ButtonSendProps {
  children: React.ReactNode
  variant?: 'default' | 'outline' | 'ghost' | 'link'
  disabled?: boolean
  onClick: () => Promise<void>
}