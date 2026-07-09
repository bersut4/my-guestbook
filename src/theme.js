import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2DD4BF',
      light: '#5EEAD4',
      dark: '#0D9488',
      contrastText: '#071019',
    },
    secondary: {
      main: '#FF8A65',
      contrastText: '#071019',
    },
    background: {
      default: 'var(--color-bg-primary)',
      paper: 'var(--color-bg-card)',
    },
    text: {
      primary: 'var(--color-text-primary)',
      secondary: 'var(--color-text-secondary)',
      disabled: 'var(--color-text-muted)',
    },
    divider: 'var(--color-border-dark)',
    error: { main: '#FF6B6B' },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: '2.5rem', fontWeight: 700 },
    h2: { fontSize: '2rem',   fontWeight: 700 },
    h3: { fontSize: '1.5rem', fontWeight: 600 },
    h4: { fontSize: '1.25rem',fontWeight: 600 },
    body1: { fontSize: '1rem',    lineHeight: 1.7 },
    body2: { fontSize: '0.875rem',lineHeight: 1.6 },
  },
  spacing: 8,
  shape: { borderRadius: 8 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 700,
          borderRadius: 8,
        },
        containedPrimary: {
          color: 'var(--color-primary-dark)',
          backgroundImage: 'linear-gradient(135deg, #2DD4BF 0%, #2DD4BF 60%, #5EEAD4 100%)',
          backgroundSize: '200% 200%',
          backgroundPosition: '0% 50%',
          transition: 'background-position 0.5s ease',
          '@media (hover: hover) and (pointer: fine)': {
            '&:hover': { backgroundPosition: '100% 50%' },
          },
        },
        sizeLarge: {
          minHeight: 44,
          paddingLeft: 32,
          paddingRight: 32,
          borderRadius: 999,
        },
        sizeMedium: {
          minHeight: 40,
        },
        sizeSmall: {
          minHeight: 36,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        sizeLarge: {
          minWidth: 44,
          minHeight: 44,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'var(--color-bg-card)',
          border: '1px solid var(--color-border-dark)',
          borderRadius: 12,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'var(--color-bg-primary)',
          borderBottom: '1px solid var(--color-border-gold)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: 'var(--color-border-dark)' },
            '&:hover fieldset': { borderColor: 'var(--color-secondary)' },
            '&.Mui-focused fieldset': { borderColor: 'var(--color-secondary)' },
          },
        },
      },
    },
  },
})

export default theme
