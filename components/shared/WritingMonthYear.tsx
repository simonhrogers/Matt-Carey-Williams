import { format, parseISO } from 'date-fns'

export function WritingMonthYear({date}) {

  return (
    <span className="date">
      {format(parseISO(date), 'LLLL yyyy')}
    </span>
  )
}

export default WritingMonthYear