export interface RemCardProps {
  rem: {
    rem_code: string
    ceco: string
    date_send: string
    date_request: string
    message: string
    status: string
  }
  handleDownloadExcel: () => void
  downloading: boolean
  sortedRems: any[]
}