import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'

const shimmerBlockSx = {
  position: 'relative',
  overflow: 'hidden',
  backgroundColor: 'var(--color-bg-card)',
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(90deg, transparent, rgba(45,212,191,0.14), transparent)',
    animation: 'skeleton-shimmer 1.6s ease-in-out infinite',
  },
}

const ShimmerBlock = (props) => <Box className="skeleton-shimmer-block" sx={shimmerBlockSx} {...props} />

// ProjectCard와 같은 레이아웃(썸네일 300px + 제목/설명/칩)을 흉내 낸 스켈레톤 UI.
const SkeletonCard = () => (
  <Card sx={{ height: '100%', overflow: 'hidden' }} aria-hidden="true">
    <ShimmerBlock sx={{ ...shimmerBlockSx, height: 300 }} />
    <CardContent>
      <ShimmerBlock sx={{ ...shimmerBlockSx, height: 22, width: '70%', borderRadius: 1, mb: 2 }} />
      <Stack spacing={0.75} sx={{ mb: 2 }}>
        <ShimmerBlock sx={{ ...shimmerBlockSx, height: 14, width: '100%', borderRadius: 1 }} />
        <ShimmerBlock sx={{ ...shimmerBlockSx, height: 14, width: '85%', borderRadius: 1 }} />
      </Stack>
      <Stack direction="row" spacing={1}>
        <ShimmerBlock sx={{ ...shimmerBlockSx, height: 24, width: 64, borderRadius: 3 }} />
        <ShimmerBlock sx={{ ...shimmerBlockSx, height: 24, width: 64, borderRadius: 3 }} />
      </Stack>
    </CardContent>
  </Card>
)

export default SkeletonCard
