import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useNavigate } from 'react-router-dom'
import { usePortfolio } from '../context/PortfolioContext'
import { skillCategories } from '../data/skillsData'
import { getSkillIcon } from '../utils/skillIcons'

const SkillTreeSection = () => {
  const navigate = useNavigate()
  const { homeData } = usePortfolio()

  return (
    <Box sx={{ py: 8 }}>
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

        <Card sx={{ mb: 4 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="body1" sx={{ color: 'var(--color-text-secondary)', lineHeight: 1.9, mb: 3 }}>
              제가 주로 다루는 기술이에요. 전체 스킬은 About Me 페이지에서 더 볼 수 있어요.
            </Typography>

            <Stack direction="row" spacing={1.5} sx={{ flexWrap: 'wrap', gap: 1.5 }}>
              {homeData.topSkills.map((skill) => {
                const Icon = getSkillIcon(skill.name)
                const color = skillCategories[skill.category]?.color ?? 'var(--color-secondary)'
                return (
                  <Chip
                    key={skill.id}
                    icon={<Icon sx={{ fontSize: '18px !important', color: `${color} !important` }} />}
                    label={skill.name}
                    sx={{
                      backgroundColor: `${color}15`,
                      color: 'var(--color-text-primary)',
                      border: `1px solid ${color}55`,
                      px: 1,
                    }}
                  />
                )
              })}
            </Stack>
          </CardContent>
        </Card>

        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant="outlined"
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate('/about')}
            sx={{
              px: 4,
              color: 'var(--color-secondary)',
              borderColor: 'var(--color-secondary)',
              '&:hover': { borderColor: 'var(--color-button-hover)', backgroundColor: 'rgba(45,212,191,0.08)' },
            }}
          >
            전체 스킬 보기
          </Button>
        </Box>
      </Container>
    </Box>
  )
}

export default SkillTreeSection
