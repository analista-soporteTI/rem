import * as XLSX from 'xlsx-js-style'
import { RemRequestData, User } from '@/types/excel'
import { generateHeader } from '@/services/excel/generateHeader'
import { generateProducts } from '@/services/excel/generateProducts'
import { generateMessage } from '@/services/excel/generateMessage'

const configureWorksheet = (
  worksheet: XLSX.WorkSheet,
  totalRows: number
): void => {
  worksheet['!cols'] = [
    { wch: 25 },
    { wch: 50 },
    { wch: 12 },
    { wch: 25 },
    { wch: 12 },
    { wch: 25 }
  ]

  worksheet['!merges'] = [
    { s: { r: 1, c: 0 }, e: { r: 1, c: 5 } },
    { s: { r: 3, c: 1 }, e: { r: 3, c: 2 } },
    { s: { r: 4, c: 1 }, e: { r: 4, c: 2 } },
    { s: { r: 5, c: 1 }, e: { r: 5, c: 2 } },
    { s: { r: 6, c: 1 }, e: { r: 6, c: 2 } },
    { s: { r: totalRows - 2, c: 0 }, e: { r: totalRows - 2, c: 5 } },
    { s: { r: totalRows - 1, c: 0 }, e: { r: totalRows, c: 5 } }
  ]
}

export const generateExcel = (data: RemRequestData, user: User): Buffer => {
  const workbook = XLSX.utils.book_new()

  const rows = [
    ...generateHeader(data, user),
    [{ v: '', s: { border: null } }],
    ...generateProducts(data),
    [{ v: '', s: { border: null } }],
    ...generateMessage(data.message)
  ]

  const worksheet = XLSX.utils.aoa_to_sheet(rows)
  configureWorksheet(worksheet, rows.length)

  XLSX.utils.book_append_sheet(workbook, worksheet, 'REM')
  return XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' })
}
