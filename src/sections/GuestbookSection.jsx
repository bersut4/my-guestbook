import { useState } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import GuestbookForm from '../components/guestbook/GuestbookForm'
import GuestbookList from '../components/guestbook/GuestbookList'

const GuestbookSection = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="md">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Box sx={{ width: 4, height: 28, backgroundColor: 'var(--color-secondary)', borderRadius: 1 }} />
          <Typography variant="overline" sx={{ color: 'var(--color-secondary)', letterSpacing: 3 }}>
            GUESTBOOK
          </Typography>
        </Box>
        <Typography variant="h3" sx={{ mb: 2, color: 'var(--color-text-primary)' }}>
          방명록
        </Typography>
        <Typography variant="body2" sx={{ color: 'var(--color-text-secondary)', mb: 4 }}>
          방문해주셔서 감사합니다. 짧은 인사나 피드백을 남겨주세요!
        </Typography>

        <GuestbookForm onSubmitted={() => setRefreshTrigger((prev) => prev + 1)} />
        <GuestbookList refreshTrigger={refreshTrigger} />
      </Container>
    </Box>
  )
}

export default GuestbookSection
