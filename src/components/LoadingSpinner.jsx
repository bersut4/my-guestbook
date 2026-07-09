import Box from '@mui/material/Box'

// CSS @keyframes(loading-spin) 기반 커스텀 로딩 스피너.
const LoadingSpinner = ({ size = 44, label = '불러오는 중' }) => (
  <Box role="status" aria-label={label} sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
    <Box
      className="loading-spinner-ring"
      sx={{
        width: size,
        height: size,
        borderRadius: '50%',
        border: '3px solid var(--color-border-dark)',
        borderTopColor: 'var(--color-secondary)',
        borderRightColor: 'var(--color-secondary)',
        animation: 'loading-spin 0.85s linear infinite',
      }}
    />
  </Box>
)

export default LoadingSpinner
