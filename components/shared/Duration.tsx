import { format, parseISO } from 'date-fns'

export default function Duration({ startDate, endDate }) {
  // return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>

  const start = parseISO(startDate)
  const end = parseISO(endDate)

  if (format(start, 'LLLL d, yyyy') === format(end, 'LLLL d, yyyy')) {
    if (format(start, 'h:mm aaa') === format(end, 'h:mm aaa')) {
      return (
        <p>
          <time dateTime={startDate}>{format(start, 'EEEE d LLLL yyyy')}</time>
        </p>
      )
    } else {
      return (
        <p>
          <time dateTime={startDate}>{format(start, 'EEEE d LLLL yyyy')}</time>
          <br />
          <span>
            {format(start, 'h:mm aaa')} – {format(end, 'h:mm aaa')}
          </span>
        </p>
      )
    }
  } else {
    return (
      <p>
        <time dateTime={startDate}>{format(start, 'EEEE d LLLL yyyy')}</time>
        {' – '}
        <time dateTime={endDate}>{format(end, 'EEEE d LLLL yyyy')}</time>
      </p>
    )
  }

  // return (
  //   <p>
  //     {format(start, 'LLLL d, yyyy')}
  //     {end && (
  //       <>
  //         {' – '}
  //         {format(end, 'LLLL d, yyyy')}
  //       </>
  //     )}
  //   </p>
  // )
}
