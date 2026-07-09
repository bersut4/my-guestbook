import Box from '@mui/material/Box'
import { useInView } from '../hooks/useInView'

const OFFSET = {
  up: 'translate3d(0, 32px, 0)',
  down: 'translate3d(0, -32px, 0)',
  left: 'translate3d(32px, 0, 0)',
  right: 'translate3d(-32px, 0, 0)',
}

// Intersection Observer로 뷰포트 진입을 감지해 페이드인 + 슬라이드하는 범용 래퍼.
// delay를 다르게 주면 섹션 내 요소들이 순차적으로(스태거) 등장한다.
const ScrollReveal = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.7,
  threshold = 0.2,
  sx,
  ...rest
}) => {
  const [ref, inView] = useInView({ threshold })

  return (
    <Box
      ref={ref}
      data-scroll-reveal
      sx={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translate3d(0, 0, 0)' : OFFSET[direction],
        transition: `opacity ${duration}s ease-out ${delay}s, transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        willChange: 'opacity, transform',
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Box>
  )
}

export default ScrollReveal
