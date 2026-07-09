import { memo } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import { useInView } from '../hooks/useInView'
import { useCountUp } from '../hooks/useCountUp'
import { iconHoverSx } from '../utils/hoverEffects'

// 진행률 바와 숫자가 스크롤 진입 시 동시에 차오르는 스킬 바.
const AnimatedSkillBar = memo(function AnimatedSkillBar({ icon: Icon, name, level, color }) {
  const [ref, inView] = useInView({ threshold: 0.4 })
  const animatedLevel = useCountUp(level, { start: inView, duration: 1100 })

  return (
    <Box ref={ref}>
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 0.75 }}>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Tooltip title={`${name} · ${level}%`} arrow placement="top">
            <Icon sx={{ fontSize: 18, color, ...iconHoverSx(color) }} />
          </Tooltip>
          <Typography variant="body2" sx={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>
            {name}
          </Typography>
        </Stack>
        <Typography
          variant="body2"
          sx={{ color, fontWeight: 700, fontVariantNumeric: 'tabular-nums', minWidth: 36, textAlign: 'right' }}
        >
          {Math.round(animatedLevel)}%
        </Typography>
      </Stack>
      <LinearProgress
        variant="determinate"
        value={animatedLevel}
        aria-label={`${name} 숙련도 ${level}%`}
        sx={{
          height: 8,
          borderRadius: 4,
          backgroundColor: 'var(--color-border-dark)',
          '& .MuiLinearProgress-bar': {
            backgroundColor: color,
            borderRadius: 4,
          },
        }}
      />
    </Box>
  )
})

export default AnimatedSkillBar
