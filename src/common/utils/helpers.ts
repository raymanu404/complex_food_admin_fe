import { format } from 'date-fns'
import { SyntheticEvent } from 'react'
import PlaceholderImage from '@/common/assets/placeholder-image.png'

const formatDate = (date: Date): string => {
  const formattedDate = format(date, 'yyyy dd MM HH mm ss')

  return formattedDate
}

const handleImageError = (event: SyntheticEvent<HTMLImageElement | Event>) => {
  const target = event.target as HTMLImageElement

  target.src = PlaceholderImage
  target.style.objectFit = 'contain'
  target.style.padding = '20px'
}

export { formatDate, handleImageError }
