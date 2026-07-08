import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Box from '@mui/material/Box'
import MenuIcon from '@mui/icons-material/Menu'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import LogoutIcon from '@mui/icons-material/Logout'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import Tooltip from '@mui/material/Tooltip'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useAdmin } from '../context/AdminContext'
import { MOBILE_QUERY } from '../utils/breakpoints'

const NAV_ITEMS = [
  { label: 'Home',       path: '/' },
  { label: 'About Me',   path: '/about' },
  { label: 'Projects',   path: '/projects' },
]

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const isMobile = useMediaQuery(MOBILE_QUERY)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { user, isAdmin, login, logout } = useAdmin()
  const [adminOpen, setAdminOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)

  const handleNav = (path) => {
    navigate(path)
    setDrawerOpen(false)
  }

  const loggedInAsAdmin = Boolean(user && isAdmin)

  const handleLogin = async () => {
    if (!email || !password) {
      setLoginError('이메일과 비밀번호를 입력해주세요.')
      return
    }
    setLoginLoading(true)
    setLoginError('')
    try {
      await login(email, password)
      setAdminOpen(false)
      setEmail('')
      setPassword('')
    } catch {
      setLoginError('이메일 또는 비밀번호가 올바르지 않습니다.')
    }
    setLoginLoading(false)
  }

  const AdminButton = () => (
    <Tooltip title={loggedInAsAdmin ? '관리자 로그아웃' : '관리자 로그인'}>
      <IconButton
        size="small"
        onClick={() => (loggedInAsAdmin ? logout() : setAdminOpen(true))}
        aria-label={loggedInAsAdmin ? '관리자 로그아웃' : '관리자 로그인'}
        sx={{
          color: loggedInAsAdmin ? 'var(--color-secondary)' : 'var(--color-text-secondary)',
          opacity: loggedInAsAdmin ? 1 : 0.35,
          '&:hover': { opacity: 1 },
        }}
      >
        {loggedInAsAdmin ? <LogoutIcon fontSize="small" /> : <AdminPanelSettingsIcon fontSize="small" />}
      </IconButton>
    </Tooltip>
  )

  return (
    <>
    <AppBar position="sticky" elevation={0}>
      <Toolbar sx={{ maxWidth: 1200, width: '100%', mx: 'auto', px: { xs: 2, md: 4 } }}>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: 700,
            cursor: 'pointer',
            letterSpacing: 2,
            color: 'var(--color-secondary)',
          }}
          onClick={() => handleNav('/')}
        >
          MY PORTFOLIO
        </Typography>

        {isMobile ? (
          <>
            <AdminButton />
            <IconButton
              sx={{ color: 'var(--color-secondary)' }}
              onClick={() => setDrawerOpen(true)}
              aria-label="메뉴 열기"
              aria-expanded={drawerOpen}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
              PaperProps={{
                sx: { backgroundColor: 'var(--color-bg-card)', borderLeft: '1px solid var(--color-border-gold)' },
                role: 'navigation',
                'aria-label': '모바일 메뉴',
              }}
            >
              <Box sx={{ width: 220, pt: 2 }}>
                <List>
                  {NAV_ITEMS.map((item) => (
                    <ListItem key={item.path} disablePadding>
                      <ListItemButton
                        selected={location.pathname === item.path}
                        onClick={() => handleNav(item.path)}
                        sx={{
                          color: 'var(--color-text-primary)',
                          '&.Mui-selected': {
                            backgroundColor: 'rgba(45,212,191,0.15)',
                            color: 'var(--color-secondary)',
                          },
                          '&:hover': { color: 'var(--color-secondary)' },
                        }}
                      >
                        <ListItemText primary={item.label} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Drawer>
          </>
        ) : (
          <Box sx={{ display: 'flex', gap: 1 }}>
            {NAV_ITEMS.map((item) => (
              <Button
                key={item.path}
                onClick={() => handleNav(item.path)}
                sx={{
                  color: location.pathname === item.path
                    ? 'var(--color-secondary)'
                    : 'var(--color-text-secondary)',
                  fontWeight: location.pathname === item.path ? 700 : 400,
                  borderBottom: location.pathname === item.path
                    ? '2px solid var(--color-secondary)'
                    : '2px solid transparent',
                  borderRadius: 0,
                  pb: 0.5,
                  '&:hover': { color: 'var(--color-secondary)', borderBottom: '2px solid rgba(45,212,191,0.4)' },
                }}
              >
                {item.label}
              </Button>
            ))}
            <AdminButton />
          </Box>
        )}
      </Toolbar>
    </AppBar>

    <Dialog
      open={adminOpen}
      onClose={() => setAdminOpen(false)}
      maxWidth="xs"
      fullWidth
      slotProps={{ paper: { sx: { backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border-dark)' } } }}
    >
      <DialogTitle sx={{ color: 'var(--color-text-primary)' }}>🔐 관리자 로그인</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="이메일"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mt: 1, mb: 2 }}
          onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
        />
        <TextField
          fullWidth
          label="비밀번호"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
        />
        {loginError && <Alert severity="error" sx={{ mt: 2 }}>{loginError}</Alert>}
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={() => setAdminOpen(false)} sx={{ color: 'var(--color-text-secondary)' }}>
          취소
        </Button>
        <Button variant="contained" onClick={handleLogin} disabled={loginLoading}>
          {loginLoading ? <CircularProgress size={20} /> : '로그인'}
        </Button>
      </DialogActions>
    </Dialog>
    </>
  )
}

export default Navbar
