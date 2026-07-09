import { useEffect, useRef, useState } from 'react'

// 스크롤로 요소가 화면에 들어오는 시점을 감지해 애니메이션 트리거로 쓰기 위한 훅.
export const useInView = ({ threshold = 0.3, rootMargin = '0px', triggerOnce = true } = {}) => {
  const ref = useRef(null)
  const [inView, setInView] = useState(() => typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (triggerOnce) observer.unobserve(node)
        } else if (!triggerOnce) {
          setInView(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, rootMargin, triggerOnce])

  return [ref, inView]
}
