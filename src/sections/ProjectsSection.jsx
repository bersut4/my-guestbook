import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useNavigate } from 'react-router-dom'
import { useProjects } from '../hooks/useProjects'
import ProjectCard from '../components/ProjectCard'
import SkeletonCard from '../components/SkeletonCard'
import ScrollReveal from '../components/ScrollReveal'
import { buttonHoverSx } from '../utils/hoverEffects'

const ProjectsSection = () => {
  const navigate = useNavigate()
  const { projects, loading, error } = useProjects(3)

  return (
    <Box id="projects-section" sx={{ py: 8, scrollMarginTop: 80 }}>
      <Container maxWidth="md">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Box sx={{ width: 4, height: 28, backgroundColor: 'var(--color-secondary)', borderRadius: 1 }} />
          <Typography variant="overline" sx={{ color: 'var(--color-secondary)', letterSpacing: 3 }}>
            PROJECTS
          </Typography>
        </Box>
        <Typography variant="h3" sx={{ mb: 2, color: 'var(--color-text-primary)' }}>
          Projects 섹션
        </Typography>
        <Typography variant="body2" sx={{ color: 'var(--color-text-secondary)', mb: 4 }}>
          대표 프로젝트들을 소개합니다.
        </Typography>

        {loading && (
          <Grid container spacing={3} sx={{ mb: 4 }} aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
                <SkeletonCard />
              </Grid>
            ))}
          </Grid>
        )}

        {!loading && error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            프로젝트를 불러오는 중 문제가 발생했습니다: {error}
          </Alert>
        )}

        {!loading && !error && projects.length > 0 && (
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {projects.map((project, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={project.id}>
                <ScrollReveal delay={(index % 3) * 0.1} sx={{ height: '100%' }}>
                  <ProjectCard project={project} />
                </ScrollReveal>
              </Grid>
            ))}
          </Grid>
        )}

        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant="outlined"
            size="large"
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate('/projects')}
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
            더 보기
          </Button>
        </Box>
      </Container>
    </Box>
  )
}

export default ProjectsSection
