import { useEffect, useRef } from 'react'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

// 요소가 뷰포트를 지나는 위치에 따라 --parallax-y CSS 커스텀 프로퍼티를 갱신하는 패럴렉스 훅.
// speed가 클수록 더 크게 움직여 배경/전경 사이의 다층 스크롤感을 만든다. rAF로 스크롤 이벤트를 스로틀한다.
export const useParallax = (speed = 0.2) => {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node || prefersReducedMotion()) return

    let rafId = null

    const update = () => {
      rafId = null
      const rect = node.getBoundingClientRect()
      const viewportCenter = window.innerHeight / 2
      const elementCenter = rect.top + rect.height / 2
      const offset = (viewportCenter - elementCenter) * speed
      node.style.setProperty('--parallax-y', `${offset.toFixed(1)}px`)
    }

    const onScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [speed])

  return ref
}
