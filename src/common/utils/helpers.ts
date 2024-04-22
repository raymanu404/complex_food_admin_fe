import { format } from 'date-fns'

const formatDate = (date: Date): string => {
  const formattedDate = format(date, 'yyyy dd MM HH mm ss')

  return formattedDate
}

export { formatDate }
