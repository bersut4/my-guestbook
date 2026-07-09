import { useEffect, useRef } from 'react'

const prefersFinePointer = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(hover: hover) and (pointer: fine)').matches

// 커서가 요소 근처(radius)에 오면 요소가 커서 쪽으로 살짝 끌려가는 자기장 효과.
// 데스크톱(정밀 포인터)에서만 동작하고, 모바일/터치 기기에서는 아무 것도 하지 않는다.
export const useMagnetic = (strength = 0.35, radius = 90) => {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node || !prefersFinePointer()) return

    let rafId = null
    let targetX = 0
    let targetY = 0

    const apply = () => {
      rafId = null
      // 0,0일 때는 인라인 스타일을 완전히 비워서 CSS :hover 트랜지션(버튼 자체 호버 효과)이 다시 살아나게 한다.
      node.style.transform = targetX === 0 && targetY === 0 ? '' : `translate3d(${targetX}px, ${targetY}px, 0)`
    }

    const schedule = () => {
      if (!rafId) rafId = requestAnimationFrame(apply)
    }

    const onMouseMove = (event) => {
      const rect = node.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const dx = event.clientX - centerX
      const dy = event.clientY - centerY
      const distance = Math.hypot(dx, dy)

      targetX = distance < radius ? dx * strength : 0
      targetY = distance < radius ? dy * strength : 0
      schedule()
    }

    const onMouseLeave = () => {
      targetX = 0
      targetY = 0
      schedule()
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    node.addEventListener('mouseleave', onMouseLeave)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      node.removeEventListener('mouseleave', onMouseLeave)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [strength, radius])

  return ref
}
