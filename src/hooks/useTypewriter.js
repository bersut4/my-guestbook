import { useEffect, useRef, useState } from 'react'

// 여러 단어를 순서대로 타이핑 → 잠시 멈춤 → 지우기 → 다음 단어로 넘어가는 타입라이터 효과.
// setTimeout으로 타이핑 리듬을 만든다. paused가 true인 동안은 다음 스텝을 예약하지 않고
// 현재 글자 상태 그대로 멈춰 있다가, 다시 false가 되면 멈췄던 지점부터 이어서 재생한다.
// 텍스트 순차 등장은 화면 전체가 움직이는 효과가 아니라서 prefers-reduced-motion과 무관하게 항상 재생한다.
export const useTypewriter = (
  words,
  { typingSpeed = 90, deletingSpeed = 45, pauseDuration = 1600, startDelay = 300, paused = false } = {}
) => {
  const [text, setText] = useState('')
  const wordIndexRef = useRef(0)
  const phaseRef = useRef('typing')
  const timeoutRef = useRef(null)
  const startedRef = useRef(false)

  useEffect(() => {
    if (paused || words.length === 0) return

    const tick = () => {
      const currentWord = words[wordIndexRef.current % words.length]
      const phase = phaseRef.current

      setText((prev) => {
        if (phase === 'typing') {
          if (prev.length < currentWord.length) {
            timeoutRef.current = setTimeout(tick, typingSpeed)
            return currentWord.slice(0, prev.length + 1)
          }
          phaseRef.current = 'pausing'
          timeoutRef.current = setTimeout(tick, pauseDuration)
          return prev
        }

        if (phase === 'pausing') {
          phaseRef.current = 'deleting'
          timeoutRef.current = setTimeout(tick, deletingSpeed)
          return prev
        }

        // deleting
        if (prev.length > 0) {
          timeoutRef.current = setTimeout(tick, deletingSpeed)
          return prev.slice(0, -1)
        }
        wordIndexRef.current = (wordIndexRef.current + 1) % words.length
        phaseRef.current = 'typing'
        timeoutRef.current = setTimeout(tick, 300)
        return prev
      })
    }

    const delay = startedRef.current ? 0 : startDelay
    startedRef.current = true
    timeoutRef.current = setTimeout(tick, delay)

    return () => clearTimeout(timeoutRef.current)
  }, [paused, words, typingSpeed, deletingSpeed, pauseDuration, startDelay])

  return text
}
