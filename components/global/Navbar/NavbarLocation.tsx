'use client'

import { useEffect, useRef, useState } from "react"

export function NavbarLocation() {

  const [items] = useState([
    'at Cork Street',
    'at Porchester Place',
    // 'at your mum\'s house',
  ])
  const [index, setIndex] = useState(0)
  const nodeRef = useRef(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((currentIndex) => (currentIndex + 1) % items.length)
    }, 5000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div className="navbar-location">
      <div ref={nodeRef} className="location">
        {items[index]}
      </div>
    </div>
  )
}

// import { TypeAnimation } from 'react-type-animation';
 
// const NavbarLocation = () => {

//   const items = [
//     'at Cork Street',
//     'at Porchester Place',
//   ]

//   let sequence = []

//   for (let i = 0; i < items.length; i++) {
//     sequence.push(items[i])
//     sequence.push(5000)
//   }

//   return (
//     <div className="navbar-location">
//       <TypeAnimation
//         sequence={sequence}
//         wrapper="div"
//         cursor={false}
//         preRenderFirstString={true}
//         repeat={Infinity}
//         className='location'
//         speed={{type: 'keyStrokeDelayInMs', value: 125}}
//         deletionSpeed={{type: 'keyStrokeDelayInMs', value: 125}}
//       />
//     </div>
//   )
// }

// 'use client'

// import { useEffect, useRef, useState } from "react"
// import { SwitchTransition, CSSTransition } from "react-transition-group"

// export function NavbarLocation() {

//   const [items] = useState([
//     'at Cork Street',
//     'at Porchester Place',
//     // 'at your mum\'s house',
//   ])
//   const [index, setIndex] = useState(0)
//   const nodeRef = useRef(null)

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setIndex((currentIndex) => (currentIndex + 1) % items.length)
//     }, 5000)

//     return () => {
//       clearInterval(timer)
//     }
//   }, [])

//   return (
//     <div className="navbar-location">
//       <SwitchTransition>
//         <CSSTransition
//           key={index}
//           nodeRef={nodeRef}
//           timeout={1000}
//           classNames='fade'
//         >
//           <div ref={nodeRef} className="location">
//             {items[index]}
//           </div>
//         </CSSTransition>
//       </SwitchTransition>
//     </div>
//   )
// }

export default NavbarLocation