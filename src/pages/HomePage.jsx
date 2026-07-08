import { Suspense, lazy } from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import OceanBackground from '../components/OceanBackground'
import HeroSection from '../sections/HeroSection'
import AboutSection from '../sections/AboutSection'
import SkillTreeSection from '../sections/SkillTreeSection'
import ProjectsSection from '../sections/ProjectsSection'
import ContactSection from '../sections/ContactSection'

const GuestbookSection = lazy(() => import('../sections/GuestbookSection'))

const SectionLoadingFallback = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
    <CircularProgress sx={{ color: 'var(--color-secondary)' }} />
  </Box>
)

const HomePage = () => (
  <>
    <OceanBackground />
    <Box sx={{ position: 'relative', zIndex: 1 }}>
      <HeroSection />
      <AboutSection />
      <SkillTreeSection />
      <ProjectsSection />
      <ContactSection />
      <Suspense fallback={<SectionLoadingFallback />}>
        <GuestbookSection />
      </Suspense>
    </Box>
  </>
)

export default HomePage
