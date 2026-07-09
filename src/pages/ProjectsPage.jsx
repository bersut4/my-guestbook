import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import { useProjects } from '../hooks/useProjects'
import ProjectCard from '../components/ProjectCard'
import SkeletonCard from '../components/SkeletonCard'
import ScrollReveal from '../components/ScrollReveal'

const ProjectsPage = () => {
  const { projects, loading, error } = useProjects()

  return (
    <Box sx={{ backgroundColor: 'var(--color-bg-primary)', minHeight: 'calc(100vh - 64px)', py: 8 }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Box sx={{ width: 4, height: 28, backgroundColor: 'var(--color-secondary)', borderRadius: 1 }} />
          <Typography variant="overline" sx={{ color: 'var(--color-secondary)', letterSpacing: 3 }}>
            PROJECTS
          </Typography>
        </Box>
        <Typography variant="h2" sx={{ mb: 1, color: 'var(--color-text-primary)' }}>
          Projects
        </Typography>
        <Typography variant="body1" sx={{ color: 'var(--color-text-secondary)', mb: 5 }}>
          직접 기획하고 만든 웹 프로젝트들입니다. 썸네일을 클릭하면 실제 배포 사이트로 이동합니다.
        </Typography>

        {loading && (
          <Grid container spacing={4} aria-hidden="true">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
                <SkeletonCard />
              </Grid>
            ))}
          </Grid>
        )}

        {!loading && error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            프로젝트를 불러오는 중 문제가 발생했습니다: {error}
          </Alert>
        )}

        {!loading && !error && projects.length === 0 && (
          <Alert severity="info">아직 등록된 프로젝트가 없습니다.</Alert>
        )}

        {!loading && !error && projects.length > 0 && (
          <Grid container spacing={4}>
            {projects.map((project, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={project.id}>
                <ScrollReveal delay={(index % 3) * 0.1} sx={{ height: '100%' }}>
                  <ProjectCard project={project} />
                </ScrollReveal>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  )
}

export default ProjectsPage
