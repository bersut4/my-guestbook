import { memo } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CodeIcon from '@mui/icons-material/Code'
import ConstructionIcon from '@mui/icons-material/Construction'
import PublicIcon from '@mui/icons-material/Public'
import SchoolIcon from '@mui/icons-material/School'
import { usePortfolio } from '../context/PortfolioContext'
import { useProjects } from '../hooks/useProjects'
import { useInView } from '../hooks/useInView'
import { useCountUp } from '../hooks/useCountUp'
import { iconHoverSx } from '../utils/hoverEffects'
import ScrollReveal from '../components/ScrollReveal'

const StatItem = memo(function StatItem({ icon, value, suffix, label, inView, delay }) {
  const animated = useCountUp(value, { start: inView, duration: 1400 })

  return (
    <ScrollReveal delay={delay} threshold={0.3}>
      <Box sx={{ textAlign: 'center' }}>
        <Box sx={{ color: 'var(--color-secondary)', display: 'inline-flex', mb: 1, ...iconHoverSx() }}>{icon}</Box>
        <Typography
          variant="h3"
          sx={{ color: 'var(--color-text-primary)', fontWeight: 800, fontVariantNumeric: 'tabular-nums' }}
        >
          {Math.round(animated)}
          {suffix}
        </Typography>
        <Typography variant="body2" sx={{ color: 'var(--color-text-secondary)', mt: 0.5 }}>
          {label}
        </Typography>
      </Box>
    </ScrollReveal>
  )
})

// 스크롤 진입 시 프로젝트 수 / 기술 스택 수 등 실제 데이터를 숫자 카운팅으로 임팩트 있게 보여준다.
const StatsSection = () => {
  const { aboutMeData } = usePortfolio()
  const { projects } = useProjects()
  const [ref, inView] = useInView({ threshold: 0.3 })

  const stats = [
    { icon: <CodeIcon fontSize="large" />, value: projects.length, suffix: '개', label: '완성한 프로젝트' },
    { icon: <ConstructionIcon fontSize="large" />, value: aboutMeData.skills.length, suffix: '개', label: '보유 기술 스택' },
    { icon: <PublicIcon fontSize="large" />, value: aboutMeData.basicInfo.languages.length, suffix: '개', label: '구사 가능 언어' },
    { icon: <SchoolIcon fontSize="large" />, value: aboutMeData.basicInfo.experienceYears ?? 0, suffix: '년', label: '일본어 학습 연차' },
  ]

  return (
    <Box id="stats-section" ref={ref} sx={{ py: 8, scrollMarginTop: 80 }}>
      <Container maxWidth="md">
        <Grid container spacing={4}>
          {stats.map((stat, index) => (
            <Grid key={stat.label} size={{ xs: 6, sm: 3 }}>
              <StatItem {...stat} inView={inView} delay={index * 0.1} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default memo(StatsSection)
