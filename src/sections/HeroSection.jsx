import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import useMediaQuery from '@mui/material/useMediaQuery'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import PersonIcon from '@mui/icons-material/Person'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import GitHubIcon from '@mui/icons-material/GitHub'
import EmailIcon from '@mui/icons-material/Email'
import { usePortfolio } from '../context/PortfolioContext'
import { MOBILE_QUERY, TABLET_UP_QUERY, DESKTOP_UP_QUERY } from '../utils/breakpoints'

const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/bersut4/', icon: GitHubIcon, external: true },
  { label: '이메일', href: 'mailto:bersut5@gmail.com', icon: EmailIcon, external: false },
]

const scrollToSection = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const scrollPastHero = () => {
  window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' })
}

const TOUCH_TARGET = { minWidth: 44, minHeight: 44 }

const HeroSection = () => {
  const { homeData } = usePortfolio()
  const { basicInfo } = homeData
  const isMobile = useMediaQuery(MOBILE_QUERY)

  return (
    <Box
      sx={{
        minHeight: 'auto',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        [`@media ${TABLET_UP_QUERY}`]: { minHeight: 560 },
        [`@media ${DESKTOP_UP_QUERY}`]: { minHeight: 640 },
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 40%, rgba(45,212,191,0.10) 0%, transparent 65%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 1,
          py: 6,
          [`@media ${TABLET_UP_QUERY}`]: { py: 8 },
          [`@media ${DESKTOP_UP_QUERY}`]: { py: 10 },
        }}
      >
        <Grid
          container
          sx={{
            alignItems: 'center',
            rowGap: 5,
            columnGap: 0,
            [`@media ${TABLET_UP_QUERY}`]: { columnGap: 3 },
            [`@media ${DESKTOP_UP_QUERY}`]: { columnGap: 4 },
          }}
        >
          <Grid size={isMobile ? 12 : 7} sx={{ textAlign: isMobile ? 'center' : 'left' }}>
            <Box
              data-hero-decor
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                px: 2,
                py: 0.5,
                borderRadius: 999,
                border: '1px solid rgba(45,212,191,0.45)',
                backgroundColor: 'rgba(3,10,15,0.3)',
                mb: { xs: 2, md: 3 },
                animation: 'hero-fade-up 0.6s ease-out both',
              }}
            >
              <Typography
                variant="overline"
                sx={{
                  color: 'var(--color-secondary)',
                  letterSpacing: 4,
                  lineHeight: 1,
                  fontSize: '0.7rem',
                  textShadow: '0 1px 6px rgba(3,10,15,0.5)',
                  [`@media ${TABLET_UP_QUERY}`]: { fontSize: '0.75rem' },
                  [`@media ${DESKTOP_UP_QUERY}`]: { fontSize: '0.8rem' },
                }}
              >
                {basicInfo.name} · WEB DESIGNER
              </Typography>
            </Box>

            <Typography
              variant="h1"
              data-hero-decor
              sx={{
                fontWeight: 800,
                lineHeight: 1.3,
                mb: { xs: 2, md: 3 },
                letterSpacing: 0.5,
                fontSize: '2rem',
                [`@media ${TABLET_UP_QUERY}`]: { fontSize: '2.25rem', lineHeight: 1.3 },
                '@media (min-width:900px)': { fontSize: '2.75rem', lineHeight: 1.28 },
                [`@media ${DESKTOP_UP_QUERY}`]: { fontSize: '3.5rem', lineHeight: 1.22 },
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
                mx: isMobile ? 'auto' : 0,
                mb: { xs: 2, md: 3 },
              }}
            />

            <Typography
              variant="body1"
              data-hero-decor
              sx={{
                color: 'var(--color-text-primary)',
                textShadow: '0 1px 8px rgba(3,10,15,0.55)',
                lineHeight: 1.8,
                maxWidth: 480,
                mx: isMobile ? 'auto' : 0,
                mb: { xs: 4, md: 5 },
                fontSize: '0.95rem',
                [`@media ${TABLET_UP_QUERY}`]: { fontSize: '1.05rem', lineHeight: 1.85 },
                [`@media ${DESKTOP_UP_QUERY}`]: { fontSize: '1.1rem', lineHeight: 1.9 },
                animation: 'hero-fade-up 0.6s ease-out 0.3s both',
              }}
            >
              일본어 전공, 개발 경력 0년 — 지금은 이 포트폴리오를 직접 만듭니다.
            </Typography>

            <Stack
              direction={isMobile ? 'column' : 'row'}
              spacing={1.5}
              data-hero-decor
              sx={{
                justifyContent: isMobile ? 'center' : 'flex-start',
                animation: 'hero-fade-up 0.6s ease-out 0.45s both',
              }}
            >
              <Button
                variant="contained"
                size="large"
                fullWidth={isMobile}
                endIcon={<ArrowForwardIcon />}
                onClick={() => scrollToSection('projects-section')}
                data-hero-decor
                sx={{
                  animation: 'hero-cta-pulse 2.4s ease-out infinite',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 10px 28px rgba(45,212,191,0.35)' },
                }}
              >
                프로젝트 보기
              </Button>
              <Button
                variant="outlined"
                size="large"
                fullWidth={isMobile}
                onClick={() => scrollToSection('contact-section')}
                sx={{
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
                연락하기
              </Button>
            </Stack>

            <Stack
              direction="row"
              spacing={1.5}
              data-hero-decor
              sx={{
                justifyContent: isMobile ? 'center' : 'flex-start',
                mt: 3,
                animation: 'hero-fade-up 0.6s ease-out 0.55s both',
              }}
            >
              {SOCIAL_LINKS.map(({ label, href, icon: Icon, external }) => (
                <Tooltip key={label} title={label}>
                  <IconButton
                    component="a"
                    href={href}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    aria-label={label}
                    sx={{
                      ...TOUCH_TARGET,
                      color: 'var(--color-text-secondary)',
                      border: '1px solid var(--color-border-dark)',
                      transition: 'transform 0.25s ease, color 0.25s ease, border-color 0.25s ease',
                      '&:hover': {
                        color: 'var(--color-secondary)',
                        borderColor: 'var(--color-secondary)',
                        transform: 'translateY(-3px)',
                      },
                    }}
                  >
                    <Icon fontSize="small" />
                  </IconButton>
                </Tooltip>
              ))}
            </Stack>
          </Grid>

          <Grid size={isMobile ? 12 : 5} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box
              data-hero-decor
              sx={{
                position: 'relative',
                width: 180,
                height: 180,
                [`@media ${TABLET_UP_QUERY}`]: { width: 220, height: 220 },
                [`@media ${DESKTOP_UP_QUERY}`]: { width: 260, height: 260 },
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
                    <PersonIcon
                      sx={{
                        fontSize: 72,
                        color: 'var(--color-text-secondary)',
                        [`@media ${TABLET_UP_QUERY}`]: { fontSize: 84 },
                        [`@media ${DESKTOP_UP_QUERY}`]: { fontSize: 96 },
                      }}
                    />
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
          ...TOUCH_TARGET,
          position: 'absolute',
          left: '50%',
          bottom: { xs: 12, md: 24 },
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
