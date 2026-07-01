import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import LaunchIcon from '@mui/icons-material/Launch'
import { getTechIcon } from '../utils/techIcons'
import { getMobileThumbnailUrl } from '../utils/thumbnail'

const ProjectCard = ({ project }) => {
  const { title, description, tech_stack: techStack = [], detail_url: detailUrl, thumbnail_url: thumbnailUrl } = project
  const mobileThumbnailUrl = getMobileThumbnailUrl(thumbnailUrl)

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
        '&:hover': {
          transform: 'translateY(-6px) scale(1.02)',
          boxShadow: '0 12px 32px rgba(200,160,86,0.25)',
          borderColor: 'var(--color-border-gold)',
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
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: 300,
          py: 3,
          backgroundColor: 'var(--color-bg-primary)',
          backgroundImage: 'radial-gradient(circle at 50% 35%, rgba(200,160,86,0.10), transparent 65%)',
          '&:hover .phone-mockup': { transform: 'translateY(-4px) scale(1.03)' },
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
            backgroundColor: '#111118',
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
              backgroundColor: '#0A0A14',
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
              }}
            />
          </Box>
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
                  backgroundColor: 'rgba(200,160,86,0.12)',
                  color: 'var(--color-secondary)',
                  border: '1px solid rgba(200,160,86,0.3)',
                }}
              />
            )
          })}
        </Box>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          endIcon={<LaunchIcon />}
          href={detailUrl}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: 'var(--color-secondary)',
            borderColor: 'var(--color-secondary)',
            '&:hover': { borderColor: 'var(--color-button-hover)', backgroundColor: 'rgba(200,160,86,0.08)' },
          }}
        >
          Live Demo 보기
        </Button>
      </CardActions>
    </Card>
  )
}

export default ProjectCard
