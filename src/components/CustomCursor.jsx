import { useEffect, useRef } from 'react'

const TRAIL_COUNT = 6
const FISH_EASE = 0.18
const TRAIL_EASE = 0.35

const HOVER_SELECTOR = 'a, button, [role="button"], input, textarea, select, [data-cursor]'

const prefersFinePointer = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(hover: hover) and (pointer: fine)').matches
const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

// 마우스를 부드럽게 뒤따라오는 복어 커서 + 뒤에 남는 트레일(잔상).
// 평상시엔 홀쭉한 복어, 클릭 가능한 요소(a/button/input 등) 위에서는 부풀어오른 복어로 바뀐다.
// 데스크톱 정밀 포인터에서만 활성화된다.
const CustomCursor = () => {
  const fishRef = useRef(null)
  const trailRefs = useRef([])

  useEffect(() => {
    if (!prefersFinePointer()) return

    document.documentElement.classList.add('custom-cursor-active')

    const reduceMotion = prefersReducedMotion()
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const fish = { x: mouse.x, y: mouse.y }
    const trail = Array.from({ length: TRAIL_COUNT }, () => ({ x: mouse.x, y: mouse.y }))

    const onMouseMove = (event) => {
      mouse.x = event.clientX
      mouse.y = event.clientY
    }

    const onMouseOver = (event) => {
      if (event.target.closest(HOVER_SELECTOR)) fishRef.current?.setAttribute('data-hover', 'true')
    }

    const onMouseOut = (event) => {
      const target = event.target.closest(HOVER_SELECTOR)
      if (!target) return
      if (event.relatedTarget && target.contains(event.relatedTarget)) return
      fishRef.current?.removeAttribute('data-hover')
    }

    const onMouseDown = () => fishRef.current?.setAttribute('data-pressed', 'true')
    const onMouseUp = () => fishRef.current?.removeAttribute('data-pressed')

    let rafId = requestAnimationFrame(function tick() {
      const fishEase = reduceMotion ? 1 : FISH_EASE
      fish.x += (mouse.x - fish.x) * fishEase
      fish.y += (mouse.y - fish.y) * fishEase
      if (fishRef.current) {
        fishRef.current.style.transform = `translate3d(${fish.x}px, ${fish.y}px, 0)`
      }

      let leaderX = mouse.x
      let leaderY = mouse.y
      trail.forEach((point, i) => {
        const ease = reduceMotion ? 1 : TRAIL_EASE
        point.x += (leaderX - point.x) * ease
        point.y += (leaderY - point.y) * ease
        const node = trailRefs.current[i]
        if (node) {
          const scale = 1 - i / TRAIL_COUNT
          node.style.transform = `translate3d(${point.x}px, ${point.y}px, 0) scale(${scale})`
          node.style.opacity = String(scale * 0.35)
        }
        leaderX = point.x
        leaderY = point.y
      })

      rafId = requestAnimationFrame(tick)
    })

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout', onMouseOut)
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)

    return () => {
      document.documentElement.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div className="cursor-root" aria-hidden="true">
      {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            trailRefs.current[i] = el
          }}
          className="cursor-trail-dot"
        />
      ))}
      <div ref={fishRef} className="cursor-fish" />
    </div>
  )
}

export default CustomCursor
