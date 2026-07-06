import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useNavigate } from 'react-router-dom'
import { initialAboutMeData } from '../data/aboutMeData'

const AboutSection = () => {
  const navigate = useNavigate()
  const homeSections = initialAboutMeData.sections.filter((section) => section.showInHome)

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
          {initialAboutMeData.basicInfo.name}
        </Typography>

        <Stack spacing={3} sx={{ mb: 4 }}>
          {homeSections.map((section) => (
            <Card
              key={section.id}
              sx={{
                '&:hover': { borderColor: 'var(--color-border-gold)', boxShadow: '0 0 20px rgba(45,212,191,0.15)' },
                transition: 'all 0.25s ease',
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" sx={{ color: 'var(--color-secondary)', mb: 1.5 }}>
                  {section.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.9,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {section.content}
                </Typography>
              </CardContent>
            </Card>
          ))}
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
