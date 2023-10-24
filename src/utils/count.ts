import { useState, useRef } from 'react'

interface timer {
  current: number
}
function useCount(defaultValue: number): [number, () => void, () => void] {
  const timer = { current: 0 }

  const [count, setCount] = useState(defaultValue)

  const closeTimer = () => {
    if (timer.current) {
      clearTimeout(timer.current)
      timer.current = 0
    }
  }

  const beiginTimer = () => {
    setCount((value) => {
      if (value === 0) {
        closeTimer()
        return defaultValue
      }

      // @ts-ignore
      timer.current = setTimeout(() => {
        beiginTimer()
      }, 1000)

      return value - 1
    })
  }

  return [count, beiginTimer, closeTimer]
}

export default useCount
