import { Suspense, lazy } from 'react'
import Box from '@mui/material/Box'
import OceanBackground from '../components/OceanBackground'
import LoadingSpinner from '../components/LoadingSpinner'
import HeroSection from '../sections/HeroSection'
import AboutSection from '../sections/AboutSection'
import StatsSection from '../sections/StatsSection'
import SkillTreeSection from '../sections/SkillTreeSection'
import ProjectsSection from '../sections/ProjectsSection'
import ContactSection from '../sections/ContactSection'

const GuestbookSection = lazy(() => import('../sections/GuestbookSection'))

const HomePage = () => (
  <>
    <OceanBackground />
    <Box sx={{ position: 'relative', zIndex: 1 }}>
      <HeroSection />
      <AboutSection />
      <StatsSection />
      <SkillTreeSection />
      <ProjectsSection />
      <ContactSection />
      <Suspense fallback={<LoadingSpinner label="방명록 불러오는 중" />}>
        <GuestbookSection />
      </Suspense>
    </Box>
  </>
)

export default HomePage
