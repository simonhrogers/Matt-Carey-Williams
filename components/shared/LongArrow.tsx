import LongArrowSVG from '@/assets/svg/LongArrowRight.svg'

export default function LongArrow({direction = 'right'}) {
  return (
    <LongArrowSVG className={`long-arrow-svg long-arrow-svg-${direction}`} />
  )
}