import { useState } from 'react'
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
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import { visuallyHidden } from '@mui/utils'
import { usePortfolio } from '../context/PortfolioContext'
import { MOBILE_QUERY, TABLET_UP_QUERY, DESKTOP_UP_QUERY } from '../utils/breakpoints'
import { buttonHoverSx, imageZoomSx } from '../utils/hoverEffects'
import { useParallax } from '../hooks/useParallax'
import { useMagnetic } from '../hooks/useMagnetic'
import { useTypewriter } from '../hooks/useTypewriter'
import SplitText from '../components/SplitText'

const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/bersut4/', icon: GitHubIcon, external: true },
  { label: '이메일', href: 'mailto:bersut5@gmail.com', icon: EmailIcon, external: false },
]

const ROLES = ['개발자', '디자이너', '크리에이터']

// Hero는 항상 OceanBackground(하늘·바다) 위에 겹쳐지고, 그 배경 자체는 다크/라이트
// 토글과 무관하게 항상 같은 색이다. 그래서 이 위에 놓이는 텍스트/아이콘도 토글에 따라
// var(--color-*)로 바뀌면(라이트 모드에서 어두운 톤으로 반전) 배경과 비슷해져 안 보이므로
// 원래 다크 테마 색을 고정값으로 써서 토글과 무관하게 항상 잘 보이도록 한다.
const HERO_TEAL = '#2DD4BF'
const HERO_TEAL_HOVER = '#5EEAD4'
const HERO_TEXT = '#E6F1F5'
const HERO_TEXT_SECONDARY = '#8FB8C7'
const HERO_BORDER = '#16323F'

const scrollToSection = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const scrollPastHero = () => {
  window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' })
}

const TOUCH_TARGET = { minWidth: 44, minHeight: 44 }

const MagneticSocialButton = ({ label, href, icon: Icon, external }) => {
  const magneticRef = useMagnetic(0.18, 50)
  return (
    <Tooltip title={label}>
      <IconButton
        ref={magneticRef}
        component="a"
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        aria-label={label}
        sx={{
          ...TOUCH_TARGET,
          color: HERO_TEXT_SECONDARY,
          border: `1px solid ${HERO_BORDER}`,
          transition: 'transform 0.25s ease, color 0.25s ease, border-color 0.25s ease',
          '&:hover': {
            color: HERO_TEAL,
            borderColor: HERO_TEAL,
          },
        }}
      >
        <Icon fontSize="small" />
      </IconButton>
    </Tooltip>
  )
}

const HeroSection = () => {
  const { homeData } = usePortfolio()
  const { basicInfo } = homeData
  const isMobile = useMediaQuery(MOBILE_QUERY)
  const parallaxRef = useParallax(0.15)
  const projectsBtnRef = useMagnetic(0.13, 80)
  const contactBtnRef = useMagnetic(0.13, 80)
  const [rolesPaused, setRolesPaused] = useState(false)
  const typedRole = useTypewriter(ROLES, {
    paused: rolesPaused,
    typingSpeed: 140,
    deletingSpeed: 70,
    pauseDuration: 2600,
  })

  return (
    <Box
      id="hero-section"
      sx={{
        minHeight: 'auto',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        scrollMarginTop: 80,
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
                aria-hidden="true"
                sx={{
                  color: HERO_TEAL,
                  letterSpacing: 4,
                  lineHeight: 1,
                  fontSize: '0.7rem',
                  textShadow: '0 1px 6px rgba(3,10,15,0.5)',
                  opacity: rolesPaused ? 0.5 : 1,
                  transition: 'opacity 0.2s ease',
                  [`@media ${TABLET_UP_QUERY}`]: { fontSize: '0.75rem' },
                  [`@media ${DESKTOP_UP_QUERY}`]: { fontSize: '0.8rem' },
                }}
              >
                {basicInfo.name} · {typedRole}
                <Box
                  component="span"
                  className="typewriter-cursor"
                  sx={rolesPaused ? { animation: 'none', opacity: 1 } : undefined}
                >
                  |
                </Box>
              </Typography>
              <Box component="span" sx={visuallyHidden}>
                {basicInfo.name} · {ROLES.join(', ')}
              </Box>
              <IconButton
                size="small"
                onClick={() => setRolesPaused((prev) => !prev)}
                aria-label={rolesPaused ? '타이핑 애니메이션 재생' : '타이핑 애니메이션 일시정지'}
                sx={{
                  width: 28,
                  height: 28,
                  color: rolesPaused ? 'var(--color-primary-dark)' : HERO_TEAL,
                  backgroundColor: rolesPaused ? HERO_TEAL : 'rgba(45,212,191,0.12)',
                  transition: 'background-color 0.2s ease, color 0.2s ease',
                  '&:hover': {
                    backgroundColor: rolesPaused ? HERO_TEAL_HOVER : 'rgba(45,212,191,0.25)',
                  },
                }}
              >
                {rolesPaused ? <PlayArrowIcon sx={{ fontSize: 15 }} /> : <PauseIcon sx={{ fontSize: 15 }} />}
              </IconButton>
            </Box>

            <Typography
              variant="h1"
              sx={{
                fontWeight: 800,
                lineHeight: 1.3,
                mb: { xs: 2, md: 3 },
                letterSpacing: 0.5,
                fontSize: '2rem',
                [`@media ${TABLET_UP_QUERY}`]: { fontSize: '2.25rem', lineHeight: 1.3 },
                '@media (min-width:900px)': { fontSize: '2.75rem', lineHeight: 1.28 },
                [`@media ${DESKTOP_UP_QUERY}`]: { fontSize: '3.5rem', lineHeight: 1.22 },
              }}
            >
              <SplitText text="몰입한 시간만큼 실력이 되는 사람입니다" startDelay={0.15} gradient />
            </Typography>

            <Box
              sx={{
                width: 60,
                height: 2,
                backgroundColor: HERO_TEAL,
                mx: isMobile ? 'auto' : 0,
                mb: { xs: 2, md: 3 },
              }}
            />

            <Typography
              variant="body1"
              data-hero-decor
              sx={{
                color: HERO_TEXT,
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
                ref={projectsBtnRef}
                variant="contained"
                size="large"
                fullWidth={isMobile}
                endIcon={<ArrowForwardIcon />}
                onClick={() => scrollToSection('projects-section')}
                data-hero-decor
                sx={{
                  animation: 'hero-cta-pulse 2.4s ease-out infinite',
                  ...buttonHoverSx(),
                }}
              >
                프로젝트 보기
              </Button>
              <Button
                ref={contactBtnRef}
                variant="outlined"
                size="large"
                fullWidth={isMobile}
                onClick={() => scrollToSection('contact-section')}
                sx={{
                  color: HERO_TEAL,
                  borderColor: HERO_TEAL,
                  ...buttonHoverSx(),
                  '&:hover': {
                    borderColor: HERO_TEAL_HOVER,
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
              {SOCIAL_LINKS.map((social) => (
                <MagneticSocialButton key={social.label} {...social} />
              ))}
            </Stack>
          </Grid>

          <Grid size={isMobile ? 12 : 5} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box
              ref={parallaxRef}
              sx={{ transform: 'translate3d(0, var(--parallax-y, 0px), 0)', willChange: 'transform' }}
            >
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
                    ...imageZoomSx(),
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
          color: HERO_TEAL,
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
