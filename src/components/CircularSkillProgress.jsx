import { memo } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useInView } from '../hooks/useInView'
import { useCountUp } from '../hooks/useCountUp'

const SIZE = 96
const STROKE = 8
const RADIUS = (SIZE - STROKE) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

// SVG stroke-dasharray/dashoffset으로 원형 스킬 레벨을 표시하고,
// 스크롤 진입 시 useCountUp과 함께 링과 숫자가 동시에 차오르게 한다.
const CircularSkillProgress = memo(function CircularSkillProgress({ level, color = 'var(--color-secondary)', label }) {
  const [ref, inView] = useInView({ threshold: 0.4 })
  const animatedLevel = useCountUp(level, { start: inView, duration: 1200 })
  const offset = CIRCUMFERENCE - (animatedLevel / 100) * CIRCUMFERENCE

  return (
    <Box ref={ref} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
      <Box sx={{ position: 'relative', width: SIZE, height: SIZE }}>
        <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={SIZE / 2} cy={SIZE / 2} r={RADIUS} fill="none" stroke="var(--color-border-dark)" strokeWidth={STROKE} />
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke={color}
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
          />
        </svg>
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="body2" sx={{ color: 'var(--color-text-primary)', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
            {Math.round(animatedLevel)}%
          </Typography>
        </Box>
      </Box>
      {label && (
        <Typography variant="caption" sx={{ color: 'var(--color-text-secondary)', fontWeight: 600, textAlign: 'center' }}>
          {label}
        </Typography>
      )}
    </Box>
  )
})

export default CircularSkillProgress
