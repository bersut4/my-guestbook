import { Suspense, lazy, useEffect } from 'react'
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import ErrorBoundary from './components/ErrorBoundary'
import FeedbackSnackbar from './components/FeedbackSnackbar'
import ScrollProgressBar from './components/ScrollProgressBar'
import SectionDotNav from './components/SectionDotNav'
import CustomCursor from './components/CustomCursor'
import { PortfolioProvider } from './context/PortfolioContext'
import { AdminProvider } from './context/AdminContext'
import { ThemeModeProvider } from './context/ThemeModeContext'

const AboutMePage = lazy(() => import('./pages/AboutMePage'))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'))

const RouteLoadingFallback = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
    <CircularProgress sx={{ color: 'var(--color-secondary)' }} />
  </Box>
)

const ScrollToTopOnRouteChange = () => {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return null
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeModeProvider>
        <AdminProvider>
          <PortfolioProvider>
            <HashRouter>
              <CustomCursor />
              <ScrollProgressBar />
              <Navbar />
              <ScrollToTopOnRouteChange />
              <SectionDotNav />
              <Suspense fallback={<RouteLoadingFallback />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutMePage />} />
                  <Route path="/projects" element={<ProjectsPage />} />
                </Routes>
              </Suspense>
              <FeedbackSnackbar />
            </HashRouter>
          </PortfolioProvider>
        </AdminProvider>
      </ThemeModeProvider>
    </ErrorBoundary>
  )
}

export default App
