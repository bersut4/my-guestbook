import { memo } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Fade from '@mui/material/Fade'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useNavigate } from 'react-router-dom'
import { usePortfolio } from '../context/PortfolioContext'
import { skillCategories } from '../data/skillsData'
import { getSkillIcon } from '../utils/skillIcons'
import { buttonHoverSx } from '../utils/hoverEffects'
import AnimatedSkillBar from '../components/AnimatedSkillBar'
import ScrollReveal from '../components/ScrollReveal'

const SkillTreeSection = () => {
  const navigate = useNavigate()
  const { homeData } = usePortfolio()

  return (
    <Box id="skills-section" sx={{ py: 8, scrollMarginTop: 80 }}>
      <Container maxWidth="md">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Box sx={{ width: 4, height: 28, backgroundColor: 'var(--color-secondary)', borderRadius: 1 }} />
          <Typography variant="overline" sx={{ color: 'var(--color-secondary)', letterSpacing: 3 }}>
            SKILL TREE
          </Typography>
        </Box>
        <Typography variant="h3" sx={{ mb: 4, color: 'var(--color-text-primary)' }}>
          기술 스택
        </Typography>

        <ScrollReveal>
        <Card sx={{ mb: 4 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="body1" sx={{ color: 'var(--color-text-secondary)', lineHeight: 1.9, mb: 3 }}>
              제가 주로 다루는 기술과 숙련도예요. 전체 스킬은 About Me 페이지에서 더 볼 수 있어요.
            </Typography>

            <Fade in key={homeData.updatedAt} timeout={400}>
              <Grid container spacing={3} aria-label="주요 스킬 숙련도">
                {homeData.topSkills.map((skill) => {
                  const Icon = getSkillIcon(skill.name)
                  const color = skillCategories[skill.category]?.color ?? 'var(--color-secondary)'
                  return (
                    <Grid key={skill.id} size={{ xs: 12, sm: 6 }}>
                      <AnimatedSkillBar icon={Icon} name={skill.name} level={skill.level} color={color} />
                    </Grid>
                  )
                })}
              </Grid>
            </Fade>
          </CardContent>
        </Card>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant="outlined"
            size="large"
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate('/about')}
            sx={{
              color: 'var(--color-secondary)',
              borderColor: 'var(--color-secondary)',
              ...buttonHoverSx(),
              '&:hover': {
                borderColor: 'var(--color-button-hover)',
                backgroundColor: 'rgba(45,212,191,0.08)',
              },
            }}
          >
            전체 스킬 보기
          </Button>
        </Box>
        </ScrollReveal>
      </Container>
    </Box>
  )
}

export default memo(SkillTreeSection)
