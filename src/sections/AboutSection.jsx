import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import PersonIcon from '@mui/icons-material/Person'
import { useNavigate } from 'react-router-dom'
import { usePortfolio } from '../context/PortfolioContext'
import { skillCategories } from '../data/skillsData'
import { getSkillIcon } from '../utils/skillIcons'

const AboutSection = () => {
  const navigate = useNavigate()
  const { homeData } = usePortfolio()
  const { homeContent, topSkills, basicInfo } = homeData

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="md">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Box sx={{ width: 4, height: 28, backgroundColor: 'var(--color-secondary)', borderRadius: 1 }} />
          <Typography variant="overline" sx={{ color: 'var(--color-secondary)', letterSpacing: 3 }}>
            ABOUT ME
          </Typography>
        </Box>
        <Typography variant="h3" sx={{ mb: 4, color: 'var(--color-text-primary)' }}>
          {basicInfo.name}
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* 메인 콘텐츠: 개발 스토리 등 요약 */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Stack spacing={3}>
              {homeContent.map((item) => (
                <Card
                  key={item.id}
                  sx={{
                    '&:hover': { borderColor: 'var(--color-border-gold)', boxShadow: '0 0 20px rgba(45,212,191,0.15)' },
                    transition: 'all 0.25s ease',
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h6" sx={{ color: 'var(--color-secondary)', mb: 1.5 }}>
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: 'var(--color-text-secondary)', lineHeight: 1.9, whiteSpace: 'pre-line' }}
                    >
                      {item.summary}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Grid>

          {/* 사이드: 프로필 사진 + 기본 정보 */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ p: 3, textAlign: 'center' }}>
                <Box
                  sx={{
                    width: 88,
                    height: 88,
                    borderRadius: '50%',
                    mx: 'auto',
                    mb: 2,
                    overflow: 'hidden',
                    backgroundColor: 'var(--color-bg-card)',
                    border: '2px solid var(--color-border-gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {basicInfo.photo ? (
                    <Box
                      component="img"
                      src={basicInfo.photo}
                      alt={`${basicInfo.name} 프로필 사진`}
                      sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <PersonIcon sx={{ fontSize: 40, color: 'var(--color-text-secondary)' }} />
                  )}
                </Box>
                <Typography variant="h6" sx={{ color: 'var(--color-text-primary)', mb: 1.5 }}>
                  {basicInfo.name}
                </Typography>
                <Stack spacing={0.75} sx={{ textAlign: 'left' }}>
                  <Typography variant="body2" sx={{ color: 'var(--color-text-secondary)' }}>
                    {basicInfo.education}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'var(--color-text-secondary)' }}>
                    {basicInfo.major} 전공
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'var(--color-text-secondary)' }}>
                    {basicInfo.experience}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* 하단: 주요 스킬 */}
        <Stack direction="row" spacing={1.5} sx={{ flexWrap: 'wrap', gap: 1.5, justifyContent: 'center', mb: 4 }}>
          {topSkills.map((skill) => {
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

        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate('/about')}
            sx={{ px: 4 }}
          >
            더 알아보기
          </Button>
        </Box>
      </Container>
    </Box>
  )
}

export default AboutSection
