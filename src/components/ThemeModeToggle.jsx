import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import { useThemeMode } from '../context/ThemeModeContext'

const ICON_LAYER_SX = {
  position: 'absolute',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.35s ease',
}

// 해/달 아이콘이 서로 회전하며 자리를 바꾸는 라이트/다크 모드 토글.
const ThemeModeToggle = () => {
  const { mode, toggleMode } = useThemeMode()
  const isLight = mode === 'light'

  return (
    <Tooltip title={isLight ? '다크 모드로 전환' : '라이트 모드로 전환'}>
      <IconButton
        onClick={toggleMode}
        aria-label={isLight ? '다크 모드로 전환' : '라이트 모드로 전환'}
        sx={{ position: 'relative', width: 40, height: 40, color: 'var(--color-secondary)' }}
      >
        <Box
          aria-hidden="true"
          sx={{
            ...ICON_LAYER_SX,
            transform: isLight ? 'rotate(0deg) scale(1)' : 'rotate(-90deg) scale(0.4)',
            opacity: isLight ? 1 : 0,
          }}
        >
          <LightModeIcon fontSize="small" />
        </Box>
        <Box
          aria-hidden="true"
          sx={{
            ...ICON_LAYER_SX,
            transform: isLight ? 'rotate(90deg) scale(0.4)' : 'rotate(0deg) scale(1)',
            opacity: isLight ? 0 : 1,
          }}
        >
          <DarkModeIcon fontSize="small" />
        </Box>
      </IconButton>
    </Tooltip>
  )
}

export default ThemeModeToggle
