import { format, parseISO } from 'date-fns'
import { form } from 'sanity/desk'

export default function Duration({ startDate, endDate }) {
  // return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>

  const start = parseISO(startDate)
  const end = parseISO(endDate)

  if (format(start, 'LLLL d, yyyy') === format(end, 'LLLL d, yyyy')) {
    if (format(start, 'h:mm aaa') === format(end, 'h:mm aaa')) {
      return (
        <span>
          <time dateTime={startDate}>{format(start, 'EEEE d LLLL yyyy')}</time>
        </span>
      )
    } else {
      return (
        <span>
          <time dateTime={startDate}>{format(start, 'EEEE d LLLL yyyy')}</time>
          <br />
          <span>
            {format(start, 'h:mm aaa')} – {format(end, 'h:mm aaa')}
          </span>
        </span>
      )
    }
  } else if (format(start, 'LLLL yyyy') === format(end, 'LLLL yyyy')) {
    return (
      <span>
        <time dateTime={startDate}>{format(start, 'd')}</time>
        {'–'}
        <time dateTime={endDate}>{format(end, 'd LLLL yyyy')}</time>
      </span>
    )
  } else if (format(start, 'yyyy') === format(end, 'yyyy')) {
    return (
      <span>
        <time dateTime={startDate}>{format(start, 'd LLLL')}</time>
        {' – '}
        <time dateTime={endDate}>{format(end, 'd LLLL yyyy')}</time>
      </span>
    )
  } else {
    return (
      <span>
        <time dateTime={startDate}>{format(start, 'd LLLL yyyy')}</time>
        {' – '}
        <time dateTime={endDate}>{format(end, 'd LLLL yyyy')}</time>
      </span>
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
