import { useEffect, useRef, useState } from 'react'

const easeOutCubic = (t) => 1 - (1 - t) ** 3

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

// target까지 requestAnimationFrame으로 부드럽게 증가시키는 카운트업 훅.
// start가 true가 될 때(또는 target이 바뀔 때) 현재 표시값에서 새 target까지 애니메이션한다.
export const useCountUp = (target, { start = false, duration = 1200, decimals = 0 } = {}) => {
  const [value, setValue] = useState(0)
  const rafRef = useRef(null)
  const fromRef = useRef(0)

  useEffect(() => {
    if (!start) return

    if (prefersReducedMotion()) {
      const frame = requestAnimationFrame(() => setValue(target))
      fromRef.current = target
      return () => cancelAnimationFrame(frame)
    }

    const from = fromRef.current
    const to = target
    const factor = 10 ** decimals
    const startTime = performance.now()

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = easeOutCubic(progress)
      const next = from + (to - from) * eased
      setValue(Math.round(next * factor) / factor)

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        fromRef.current = to
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [start, target, duration, decimals])

  return value
}
