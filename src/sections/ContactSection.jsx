import { useState } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import EmailIcon from '@mui/icons-material/Email'
import GitHubIcon from '@mui/icons-material/GitHub'
import SendIcon from '@mui/icons-material/Send'
import { usePortfolio } from '../context/PortfolioContext'
import { buttonHoverSx } from '../utils/hoverEffects'
import ScrollReveal from '../components/ScrollReveal'
import { useMagnetic } from '../hooks/useMagnetic'

const CONTACT_EMAIL = 'bersut5@gmail.com'

const ContactSection = () => {
  const { notify } = usePortfolio()
  const sendBtnRef = useMagnetic(0.3, 90)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})

  const set = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const handleSend = () => {
    const nextErrors = {}
    if (!form.name.trim()) nextErrors.name = '이름을 입력해주세요.'
    if (!form.message.trim()) nextErrors.message = '메시지를 입력해주세요.'
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    const subject = encodeURIComponent(`[포트폴리오 문의] ${form.name}님의 메시지`)
    const body = encodeURIComponent(
      `이름: ${form.name}\n답장 받을 이메일: ${form.email || '(작성 안 함)'}\n\n${form.message}`
    )
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
    notify('이메일 앱이 열립니다. 내용을 확인하고 보내주세요.')
  }

  return (
    <Box id="contact-section" sx={{ py: 8, scrollMarginTop: 80 }}>
      <Container maxWidth="md">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Box sx={{ width: 4, height: 28, backgroundColor: 'var(--color-secondary)', borderRadius: 1 }} />
          <Typography variant="overline" sx={{ color: 'var(--color-secondary)', letterSpacing: 3 }}>
            CONTACT
          </Typography>
        </Box>
        <Typography variant="h3" sx={{ mb: 2, color: 'var(--color-text-primary)' }}>
          연락하기
        </Typography>
        <Typography variant="body2" sx={{ color: 'var(--color-text-secondary)', mb: 4 }}>
          궁금한 점이나 협업 제안이 있으면 편하게 연락해주세요.
        </Typography>

        <ScrollReveal direction="left">
        <Card sx={{ mb: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <EmailIcon sx={{ color: 'var(--color-secondary)' }} />
                <Typography
                  component="a"
                  href={`mailto:${CONTACT_EMAIL}`}
                  variant="body2"
                  sx={{ color: 'var(--color-text-secondary)', '&:hover': { color: 'var(--color-secondary)' } }}
                >
                  {CONTACT_EMAIL}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <GitHubIcon sx={{ color: 'var(--color-secondary)' }} />
                <Typography
                  component="a"
                  href="https://github.com/bersut4/"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="body2"
                  sx={{ color: 'var(--color-text-secondary)', '&:hover': { color: 'var(--color-secondary)' } }}
                >
                  github.com/bersut4
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
        </ScrollReveal>

        <ScrollReveal direction="right" delay={0.15}>
        <Card>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 0.5, color: 'var(--color-text-primary)' }}>
              메시지 보내기
            </Typography>
            <Typography variant="caption" sx={{ display: 'block', mb: 2, color: 'var(--color-text-secondary)' }}>
              보내기를 누르면 작성하신 내용이 담긴 이메일 앱이 열립니다.
            </Typography>
            <Stack spacing={2}>
              <TextField
                label="이름 *"
                variant="outlined"
                size="small"
                fullWidth
                value={form.name}
                onChange={set('name')}
                error={Boolean(errors.name)}
                helperText={errors.name}
              />
              <TextField
                label="답장 받을 이메일"
                variant="outlined"
                size="small"
                type="email"
                fullWidth
                value={form.email}
                onChange={set('email')}
              />
              <TextField
                label="메시지 *"
                variant="outlined"
                multiline
                rows={3}
                fullWidth
                value={form.message}
                onChange={set('message')}
                error={Boolean(errors.message)}
                helperText={errors.message}
              />
              <Button
                ref={sendBtnRef}
                variant="contained"
                color="primary"
                size="large"
                endIcon={<SendIcon />}
                onClick={handleSend}
                sx={{ alignSelf: 'flex-end', ...buttonHoverSx() }}
              >
                보내기
              </Button>
            </Stack>
          </CardContent>
        </Card>
        </ScrollReveal>
      </Container>
    </Box>
  )
}

export default ContactSection
