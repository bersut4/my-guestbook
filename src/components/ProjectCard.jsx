import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import LaunchIcon from '@mui/icons-material/Launch'
import { getTechIcon } from '../utils/techIcons'
import { getMobileThumbnailUrl } from '../utils/thumbnail'
import { buttonHoverSx, imageZoomSx, skillChipHoverSx } from '../utils/hoverEffects'
import { useMagnetic } from '../hooks/useMagnetic'

const ProjectCard = ({ project }) => {
  const { title, description, tech_stack: techStack = [], detail_url: detailUrl, thumbnail_url: thumbnailUrl } = project
  const mobileThumbnailUrl = getMobileThumbnailUrl(thumbnailUrl)
  const demoBtnRef = useMagnetic(0.15, 70)

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        willChange: 'transform',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
        '@media (hover: hover) and (pointer: fine)': {
          '&:hover': {
            transform: 'translateY(-6px) scale(1.02)',
            boxShadow: '0 12px 32px rgba(45,212,191,0.25)',
            borderColor: 'var(--color-border-gold)',
          },
        },
        '&:active': { transform: 'translateY(-2px) scale(0.99)' },
      }}
    >
      <Box
        component="a"
        href={detailUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${title} 사이트 새 탭에서 열기`}
        data-cursor="view"
        sx={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: 300,
          py: 3,
          backgroundColor: 'var(--color-bg-primary)',
          backgroundImage: 'radial-gradient(circle at 50% 35%, rgba(45,212,191,0.10), transparent 65%)',
          '@media (hover: hover) and (pointer: fine)': {
            '&:hover .phone-mockup': { transform: 'translateY(-4px) scale(1.03)' },
            '&:hover .project-overlay': { opacity: 1 },
          },
        }}
      >
        {/* 모바일 목업 프레임 */}
        <Box
          className="phone-mockup"
          sx={{
            position: 'relative',
            width: 148,
            height: '100%',
            flexShrink: 0,
            backgroundColor: '#0A1A22',
            borderRadius: '22px',
            border: '3px solid var(--color-border-dark)',
            boxShadow: '0 14px 28px rgba(0,0,0,0.55)',
            overflow: 'hidden',
            transition: 'transform 0.3s ease',
          }}
        >
          {/* 노치 */}
          <Box
            sx={{
              position: 'absolute',
              top: 6,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 44,
              height: 12,
              borderRadius: '8px',
              backgroundColor: '#071019',
              zIndex: 2,
            }}
          />
          {/* 화면 */}
          <Box
            sx={{
              position: 'absolute',
              inset: '4px',
              borderRadius: '17px',
              overflow: 'hidden',
              backgroundColor: 'var(--color-bg-card)',
            }}
          >
            <Box
              component="img"
              src={mobileThumbnailUrl}
              alt={`${title} 모바일 화면`}
              loading="lazy"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'top',
                ...imageZoomSx(),
              }}
            />
          </Box>
        </Box>

        {/* 호버 시 나타나는 정보 오버레이 */}
        <Box
          className="project-overlay"
          aria-hidden="true"
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            pb: 2,
            background: 'linear-gradient(180deg, transparent 45%, rgba(7,16,25,0.88) 100%)',
            opacity: 0,
            transition: 'opacity 0.3s ease',
            pointerEvents: 'none',
          }}
        >
          <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center', color: 'var(--color-secondary)' }}>
            <LaunchIcon sx={{ fontSize: 16 }} />
            <Typography variant="caption" sx={{ fontWeight: 700, letterSpacing: 0.5 }}>
              새 탭에서 보기
            </Typography>
          </Stack>
        </Box>
      </Box>

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h3" sx={{ fontSize: '1.15rem', mb: 1, color: 'var(--color-text-primary)' }}>
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'var(--color-text-secondary)',
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {description}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
          {techStack.map((tech) => {
            const Icon = getTechIcon(tech)
            return (
              <Chip
                key={tech}
                icon={<Icon sx={{ fontSize: '16px !important' }} />}
                label={tech}
                size="small"
                sx={{
                  backgroundColor: 'rgba(45,212,191,0.12)',
                  color: 'var(--color-secondary)',
                  border: '1px solid rgba(45,212,191,0.3)',
                  ...skillChipHoverSx('rgba(45,212,191,0.9)'),
                }}
              />
            )
          })}
        </Box>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button
          ref={demoBtnRef}
          fullWidth
          variant="outlined"
          endIcon={<LaunchIcon />}
          href={detailUrl}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: 'var(--color-secondary)',
            borderColor: 'var(--color-secondary)',
            ...buttonHoverSx(),
            '&:hover': { borderColor: 'var(--color-button-hover)', backgroundColor: 'rgba(45,212,191,0.08)' },
          }}
        >
          Live Demo 보기
        </Button>
      </CardActions>
    </Card>
  )
}

export default ProjectCard
