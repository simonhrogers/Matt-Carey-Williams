import { isValid, parseISO, format } from 'date-fns'

export function WritingMonthYear({date}) {
  const parsedDate = parseISO(date)

  return (
    <span className="date">
      {isValid(parsedDate) ? format(parsedDate, 'LLLL yyyy') : 'Invalid date'}
    </span>
  )
}

export default WritingMonthYear