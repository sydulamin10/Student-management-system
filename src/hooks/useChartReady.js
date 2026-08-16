import { useEffect, useState } from 'react'

/** Recharts ResponsiveContainer often needs a frame after mount/layout to size correctly. */
export function useChartReady(deps = []) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(false)
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setReady(true))
    })
    return () => cancelAnimationFrame(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return ready
}
