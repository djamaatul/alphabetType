import Head from 'next/head'
import { useEffect, useState } from 'react'
import { debounce } from 'lodash'

export default function Home() {
  const [count, setCount] = useState(0)
  const [passed, setPassed] = useState([])

  const [randomChar, setRandomChar] = useState([])

  useEffect(() => {
    setRandomChar([...Array(100)].map(() => String.fromCharCode(64 + (Math.random() * 24 + 1))))
  }, [])

  useEffect(() => {

    const eventKey = debounce((key) => {
      if (key.keyCode > 64 && key.keyCode < 90) {
        const container = document.getElementById('container')
        const transform = window.getComputedStyle(container).transform.split(',')
        transform[4] = parseInt(transform[4]) - 120
        container.style.transform = transform.join(",")

        setCount((prev) => prev + 1)
        setPassed((prev) => ([...prev, key.key.toUpperCase()]))
      }
    }, 1)
    document.addEventListener('keyup', eventKey)

    return () => {
      return document.removeEventListener('keyup', eventKey)
    }
  }, [count, passed])

  return (
    <div className='flex flex-col justify-center h-screen w-full overflow-hidden gap-4'>
      <div className='translate-x-[50%] flex gap-24' id='container'>
        {randomChar.map((e, i) => (
          <span className={`text-2xl font-semibold ${passed?.[i] === e ? "text-green-500" : count > i && "text-red-500"} ${(count >= i && count === i) && "text-blue-500"}`} key={i}>
            {e}
          </span>))}
      </div>
      <div className='flex justify-center'>{count}/100</div>
    </div >
  )
}
