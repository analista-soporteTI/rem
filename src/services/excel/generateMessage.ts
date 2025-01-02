import { CellData } from '@/types/excel'
import { STYLES } from '@/services/excel/excel-styles'

export const generateMessage = (message: string): CellData[][] => [
  [
    {
      v: 'Message',
      s: {
        ...STYLES.header,
        border: STYLES.border,
        alignment: { horizontal: 'center' }
      }
    }
  ],
  [
    {
      v: message || '',
      s: {
        ...STYLES.cell.base,
        border: STYLES.border,
        alignment: { vertical: 'top', wrapText: true }
      }
    }
  ]
]
