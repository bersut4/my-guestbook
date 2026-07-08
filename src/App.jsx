import { Suspense, lazy } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import ErrorBoundary from './components/ErrorBoundary'
import FeedbackSnackbar from './components/FeedbackSnackbar'
import { PortfolioProvider } from './context/PortfolioContext'
import { AdminProvider } from './context/AdminContext'

const AboutMePage = lazy(() => import('./pages/AboutMePage'))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'))

const RouteLoadingFallback = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
    <CircularProgress sx={{ color: 'var(--color-secondary)' }} />
  </Box>
)

function App() {
  return (
    <ErrorBoundary>
      <AdminProvider>
        <PortfolioProvider>
          <HashRouter>
            <Navbar />
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
    </ErrorBoundary>
  )
}

export default App
