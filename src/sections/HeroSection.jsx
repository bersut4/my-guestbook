import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import PersonIcon from '@mui/icons-material/Person'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { usePortfolio } from '../context/PortfolioContext'

const scrollToProjects = () => {
  document.getElementById('projects-section')?.scrollIntoView({ behavior: 'smooth' })
}

const scrollPastHero = () => {
  window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' })
}

const HeroSection = () => {
  const navigate = useNavigate()
  const { homeData } = usePortfolio()
  const { basicInfo } = homeData

  return (
    <Box
      sx={{
        minHeight: { xs: 560, md: 640 },
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 40%, rgba(45,212,191,0.10) 0%, transparent 65%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: { xs: 8, md: 10 } }}>
        <Grid container spacing={{ xs: 6, md: 4 }} sx={{ alignItems: 'center' }}>
          <Grid size={{ xs: 12, md: 7 }} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Box
              data-hero-decor
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                px: 2,
                py: 0.5,
                borderRadius: 999,
                border: '1px solid rgba(45,212,191,0.35)',
                backgroundColor: 'rgba(45,212,191,0.08)',
                mb: 3,
                animation: 'hero-fade-up 0.6s ease-out both',
              }}
            >
              <Typography
                variant="overline"
                sx={{ color: 'var(--color-secondary)', letterSpacing: 4, fontSize: '0.75rem', lineHeight: 1 }}
              >
                {basicInfo.name} · WEB DESIGNER
              </Typography>
            </Box>

            <Typography
              variant="h1"
              data-hero-decor
              sx={{
                fontSize: { xs: '2rem', sm: '2.6rem', md: '3.25rem' },
                fontWeight: 800,
                lineHeight: 1.25,
                mb: 3,
                letterSpacing: 0.5,
                background:
                  'linear-gradient(90deg, var(--color-text-primary) 20%, var(--color-secondary) 70%, var(--color-accent) 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                WebkitTextFillColor: 'transparent',
                animation: 'hero-fade-up 0.6s ease-out 0.15s both',
              }}
            >
              몰입한 시간만큼 실력이 되는 사람입니다
            </Typography>

            <Box
              sx={{
                width: 60,
                height: 2,
                backgroundColor: 'var(--color-secondary)',
                mx: { xs: 'auto', md: 0 },
                mb: 3,
              }}
            />

            <Typography
              variant="body1"
              data-hero-decor
              sx={{
                color: 'var(--color-text-secondary)',
                fontSize: '1.1rem',
                lineHeight: 1.9,
                maxWidth: 480,
                mx: { xs: 'auto', md: 0 },
                mb: 5,
                animation: 'hero-fade-up 0.6s ease-out 0.3s both',
              }}
            >
              일본어 전공, 개발 경력 0년 — 지금은 이 포트폴리오를 직접 만듭니다.
            </Typography>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              data-hero-decor
              sx={{
                justifyContent: { xs: 'center', md: 'flex-start' },
                animation: 'hero-fade-up 0.6s ease-out 0.45s both',
              }}
            >
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                onClick={scrollToProjects}
                sx={{
                  px: 4,
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 10px 28px rgba(45,212,191,0.35)' },
                }}
              >
                프로젝트 보기
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/about')}
                sx={{
                  px: 4,
                  color: 'var(--color-secondary)',
                  borderColor: 'var(--color-secondary)',
                  transition: 'transform 0.25s ease, background-color 0.25s ease, border-color 0.25s ease',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    borderColor: 'var(--color-button-hover)',
                    backgroundColor: 'rgba(45,212,191,0.08)',
                  },
                }}
              >
                더 알아보기
              </Button>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box
              data-hero-decor
              sx={{
                position: 'relative',
                width: { xs: 200, md: 260 },
                height: { xs: 200, md: 260 },
                animation: 'hero-fade-up 0.7s ease-out 0.2s both',
              }}
            >
              <Box
                data-hero-decor
                sx={{
                  position: 'absolute',
                  inset: -20,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(45,212,191,0.25) 0%, transparent 70%)',
                  filter: 'blur(10px)',
                  animation: 'hero-float 6s ease-in-out infinite',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  padding: '3px',
                  background: 'linear-gradient(135deg, var(--color-secondary), var(--color-accent))',
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    backgroundColor: 'var(--color-bg-card)',
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
                      loading="lazy"
                      decoding="async"
                      sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <PersonIcon sx={{ fontSize: 96, color: 'var(--color-text-secondary)' }} />
                  )}
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <IconButton
        onClick={scrollPastHero}
        aria-label="다음 섹션으로 스크롤"
        data-hero-decor
        sx={{
          position: 'absolute',
          left: '50%',
          bottom: 24,
          transform: 'translateX(-50%)',
          color: 'var(--color-secondary)',
          animation: 'hero-bounce 2s ease-in-out infinite',
          zIndex: 1,
        }}
      >
        <KeyboardArrowDownIcon fontSize="large" />
      </IconButton>
    </Box>
  )
}

export default HeroSection
