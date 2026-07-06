import Box from '@mui/material/Box'
import OceanBackground from '../components/OceanBackground'
import HeroSection from '../sections/HeroSection'
import AboutSection from '../sections/AboutSection'
import SkillTreeSection from '../sections/SkillTreeSection'
import ProjectsSection from '../sections/ProjectsSection'
import ContactSection from '../sections/ContactSection'
import GuestbookSection from '../sections/GuestbookSection'

const HomePage = () => (
  <>
    <OceanBackground />
    <Box sx={{ position: 'relative', zIndex: 1 }}>
      <HeroSection />
      <AboutSection />
      <SkillTreeSection />
      <ProjectsSection />
      <ContactSection />
      <GuestbookSection />
    </Box>
  </>
)

export default HomePage
