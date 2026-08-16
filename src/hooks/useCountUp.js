import { useEffect, useState } from 'react'

export function useCountUp(target, { duration = 1200, decimals = 0, enabled = true } = {}) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!enabled) {
      setValue(target)
      return
    }
    let frame
    const start = performance.now()
    const from = 0
    const animate = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = from + (target - from) * eased
      setValue(Number(current.toFixed(decimals)))
      if (progress < 1) frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [target, duration, decimals, enabled])

  return value
}
