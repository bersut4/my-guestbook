import { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import SchoolIcon from '@mui/icons-material/School'
import TranslateIcon from '@mui/icons-material/Translate'
import WorkOutlineIcon from '@mui/icons-material/WorkOutlineOutlined'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import { initialAboutMeData } from '../data/aboutMeData'

const InfoRow = ({ icon, label, value }) => (
  <Stack direction="row" spacing={1.5} sx={{ alignItems: 'flex-start' }}>
    <Box sx={{ color: 'var(--color-secondary)', mt: 0.3 }}>{icon}</Box>
    <Box>
      <Typography variant="caption" sx={{ color: 'var(--color-text-secondary)', letterSpacing: 1 }}>
        {label}
      </Typography>
      <Typography variant="body1" sx={{ color: 'var(--color-text-primary)' }}>
        {value}
      </Typography>
    </Box>
  </Stack>
)

const AboutMePage = () => {
  const [aboutMeData, setAboutMeData] = useState(initialAboutMeData)
  const [activeTab, setActiveTab] = useState(0)
  const fileInputRef = useRef(null)
  const photoUrlRef = useRef('')

  const { basicInfo, sections } = aboutMeData
  const activeSection = sections[activeTab]

  useEffect(() => () => {
    if (photoUrlRef.current) URL.revokeObjectURL(photoUrlRef.current)
  }, [])

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (photoUrlRef.current) URL.revokeObjectURL(photoUrlRef.current)
    const nextUrl = URL.createObjectURL(file)
    photoUrlRef.current = nextUrl

    setAboutMeData((prev) => ({
      ...prev,
      basicInfo: { ...prev.basicInfo, photo: nextUrl },
    }))
  }

  return (
    <Box sx={{ backgroundColor: 'var(--color-bg-primary)', minHeight: 'calc(100vh - 64px)', py: 8 }}>
      <Container maxWidth="md">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Box sx={{ width: 4, height: 28, backgroundColor: 'var(--color-secondary)', borderRadius: 1 }} />
          <Typography variant="overline" sx={{ color: 'var(--color-secondary)', letterSpacing: 3 }}>
            ABOUT ME
          </Typography>
        </Box>
        <Typography variant="h2" sx={{ mb: 4, color: 'var(--color-text-primary)' }}>
          About Me
        </Typography>

        {/* 기본 정보 카드 */}
        <Card sx={{ mb: 5 }}>
          <CardContent
            sx={{
              p: { xs: 3, sm: 4 },
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'center', sm: 'flex-start' },
              gap: 4,
            }}
          >
            <Box sx={{ position: 'relative', flexShrink: 0 }}>
              <Box
                component="label"
                htmlFor="about-photo-upload"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 140,
                  height: 140,
                  borderRadius: '50%',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  backgroundColor: 'var(--color-bg-card)',
                  border: basicInfo.photo ? '2px solid var(--color-border-gold)' : '2px dashed var(--color-border-gold)',
                  transition: 'border-color 0.2s ease',
                  '&:hover': { borderColor: 'var(--color-secondary)' },
                }}
              >
                {basicInfo.photo ? (
                  <Box
                    component="img"
                    src={basicInfo.photo}
                    alt={`${basicInfo.name} 프로필 사진`}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <Stack spacing={0.5} sx={{ alignItems: 'center', color: 'var(--color-text-secondary)' }}>
                    <PhotoCameraIcon />
                    <Typography variant="caption">사진 업로드</Typography>
                  </Stack>
                )}
              </Box>
              <IconButton
                component="label"
                htmlFor="about-photo-upload"
                size="small"
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  backgroundColor: 'var(--color-secondary)',
                  color: 'var(--color-primary-dark)',
                  '&:hover': { backgroundColor: 'var(--color-button-hover)' },
                }}
              >
                <PhotoCameraIcon sx={{ fontSize: 16 }} />
              </IconButton>
              <input
                id="about-photo-upload"
                ref={fileInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handlePhotoChange}
              />
            </Box>

            <Box sx={{ flex: 1, width: '100%', textAlign: { xs: 'center', sm: 'left' } }}>
              <Typography variant="h4" sx={{ color: 'var(--color-text-primary)', mb: 2 }}>
                {basicInfo.name}
              </Typography>
              <Stack spacing={1.5} sx={{ alignItems: { xs: 'center', sm: 'flex-start' } }}>
                <InfoRow icon={<SchoolIcon />} label="학력" value={basicInfo.education} />
                <InfoRow icon={<TranslateIcon />} label="전공" value={basicInfo.major} />
                <InfoRow icon={<WorkOutlineIcon />} label="경력" value={basicInfo.experience} />
              </Stack>
            </Box>
          </CardContent>
        </Card>

        {/* 콘텐츠 섹션 */}
        <Tabs
          value={activeTab}
          onChange={(_, next) => setActiveTab(next)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            mb: 2,
            borderBottom: '1px solid var(--color-border-dark)',
            '& .MuiTab-root': { color: 'var(--color-text-secondary)', fontWeight: 600 },
            '& .Mui-selected': { color: 'var(--color-secondary) !important' },
            '& .MuiTabs-indicator': { backgroundColor: 'var(--color-secondary)' },
          }}
        >
          {sections.map((section) => (
            <Tab key={section.id} label={section.title} />
          ))}
        </Tabs>

        <Card>
          <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
            <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h5" sx={{ color: 'var(--color-text-primary)' }}>
                {activeSection.title}
              </Typography>
              {activeSection.showInHome && (
                <Chip
                  label="홈 화면에도 표시"
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(45,212,191,0.12)',
                    color: 'var(--color-secondary)',
                    border: '1px solid rgba(45,212,191,0.3)',
                  }}
                />
              )}
            </Stack>
            <Typography
              variant="body1"
              sx={{ color: 'var(--color-text-secondary)', lineHeight: 1.9, whiteSpace: 'pre-line' }}
            >
              {activeSection.content}
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  )
}

export default AboutMePage
