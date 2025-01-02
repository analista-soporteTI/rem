import { CellData, RemRequestData, User } from '@/types/excel'
import { STYLES } from '@/services/excel/excel-styles'
import { formatDate } from '@/utils/dateFormatter'

const createInfoRow = (
  label1: string,
  value1: string,
  label2: string,
  value2: string
): CellData[] => [
  {
    v: label1,
    s: { ...STYLES.cell.base, ...STYLES.cell.label, border: STYLES.border }
  },
  {
    v: value1,
    s: { ...STYLES.cell.base, ...STYLES.cell.value, border: STYLES.border }
  },
  {
    v: '',
    s: { ...STYLES.cell.base, ...STYLES.cell.value, border: STYLES.border }
  },
  {
    v: label2,
    s: { ...STYLES.cell.base, ...STYLES.cell.label, border: STYLES.border }
  },
  {
    v: value2,
    s: { ...STYLES.cell.base, ...STYLES.cell.value, border: STYLES.border }
  }
]

export const generateHeader = (
  data: RemRequestData,
  user: User
): CellData[][] => [
  [{ v: '', s: { border: null } }],
  [
    {
      v: `REM ${data.rem_code} ${data.ceco}`,
      s: { ...STYLES.cell.title }
    }
  ],
  [{ v: '', s: { border: null } }],
  createInfoRow('CENTRO DE COSTO', data.ceco, 'OC', ''),
  createInfoRow('NOMBRE DE LA OBRA', '', 'Nº DE REQUERIMIENTO', data.rem_code),
  createInfoRow(
    'SOLICITANTE REM',
    user.name,
    'Fecha emisión',
    formatDate(data.dateSend)
  ),
  createInfoRow(
    'CORREO DE CONTACTO',
    user.email,
    'Fecha entrega',
    formatDate(data.dateRequest)
  )
]
