import { v4 as uuidv4 } from 'uuid'

export const generateUniqueCode = () => {
  const uuid = uuidv4()

  const letters = uuid.replace(/[^a-zA-Z]/g, '')
  const numbers = uuid.replace(/[^0-9]/g, '')

  const twoLetters = letters.slice(0, 2).toUpperCase()
  const fourNumbers = numbers.slice(0, 4)

  return `${twoLetters}${fourNumbers}`
}
