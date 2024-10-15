export interface ButtonSendProps {
  children: React.ReactNode
  variant?: 'default' | 'outline' | 'ghost' | 'link'
  onClick: () => Promise<void>
}