export const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  endIndex,
  onPageChange
}: {
  currentPage: number
  totalPages: number
  totalItems: number
  endIndex: number
  onPageChange: (page: number) => void
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  return (
    <div className='flex flex-wrap justify-between items-center mt-4 gap-4'>
      <span className='text-foreground text-xs'>{`Mostrando ${endIndex}/${totalItems}`}</span>
      <div className='flex flex-wrap gap-2'>
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className='px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50'
        >
          Anterior
        </button>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className='px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50'
        >
          Siguiente
        </button>
      </div>
    </div>
  )
}