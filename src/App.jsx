import { HashRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import AboutMePage from './pages/AboutMePage'
import ProjectsPage from './pages/ProjectsPage'
import { PortfolioProvider } from './context/PortfolioContext'
import { AdminProvider } from './context/AdminContext'

function App() {
  return (
    <AdminProvider>
      <PortfolioProvider>
        <HashRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutMePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
          </Routes>
        </HashRouter>
      </PortfolioProvider>
    </AdminProvider>
  )
}

export default App
