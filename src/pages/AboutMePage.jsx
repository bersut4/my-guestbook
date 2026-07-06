import { useRef, useState } from 'react'
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
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import SchoolIcon from '@mui/icons-material/School'
import TranslateIcon from '@mui/icons-material/Translate'
import WorkOutlineIcon from '@mui/icons-material/WorkOutlineOutlined'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import PublicIcon from '@mui/icons-material/Public'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import EditIcon from '@mui/icons-material/Edit'
import { usePortfolio } from '../context/PortfolioContext'
import SkillsGrid from '../components/SkillsGrid'

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
  const { aboutMeData, updateSection, updatePhoto } = usePortfolio()
  const [activeTab, setActiveTab] = useState(0)
  const [editingId, setEditingId] = useState(null)
  const [draftContent, setDraftContent] = useState('')
  const fileInputRef = useRef(null)
  const photoUrlRef = useRef('')

  const { basicInfo, sections } = aboutMeData
  const tabItems = [
    sections[0],
    sections[1],
    { id: 'skills', title: '기술 스택', isSkills: true },
    sections[2],
    sections[3],
  ]
  const activeItem = tabItems[activeTab]

  const handleTabChange = (_, next) => {
    setActiveTab(next)
    setEditingId(null)
  }

  const startEditing = () => {
    setDraftContent(activeItem.content)
    setEditingId(activeItem.id)
  }

  const cancelEditing = () => setEditingId(null)

  const saveEditing = () => {
    updateSection(activeItem.id, draftContent)
    setEditingId(null)
  }

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (photoUrlRef.current) URL.revokeObjectURL(photoUrlRef.current)
    const nextUrl = URL.createObjectURL(file)
    photoUrlRef.current = nextUrl
    updatePhoto(nextUrl)
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
                <Stack direction="row" spacing={1.5} sx={{ alignItems: 'flex-start' }}>
                  <Box sx={{ color: 'var(--color-secondary)', mt: 0.3 }}>
                    <PublicIcon />
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ color: 'var(--color-text-secondary)', letterSpacing: 1 }}>
                      구사 언어
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1, mt: 0.5 }}>
                      {basicInfo.languages.map((language) => (
                        <Chip
                          key={language}
                          label={language}
                          size="small"
                          sx={{
                            backgroundColor: 'rgba(255,138,101,0.12)',
                            color: 'var(--color-accent)',
                            border: '1px solid rgba(255,138,101,0.35)',
                            fontWeight: 600,
                          }}
                        />
                      ))}
                    </Stack>
                  </Box>
                </Stack>
              </Stack>
            </Box>
          </CardContent>
        </Card>

        {/* 콘텐츠 섹션 */}
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
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
          {tabItems.map((item) => (
            <Tab key={item.id} label={item.title} />
          ))}
        </Tabs>

        <Card>
          <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
            <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', mb: activeItem.isSkills ? 3 : 2 }}>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <Typography variant="h5" sx={{ color: 'var(--color-text-primary)' }}>
                  {activeItem.title}
                </Typography>
                {!activeItem.isSkills && editingId !== activeItem.id && (
                  <IconButton size="small" onClick={startEditing} sx={{ color: 'var(--color-text-secondary)' }}>
                    <EditIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                )}
              </Stack>
              {activeItem.showInHome && (
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

            {activeItem.isSkills ? (
              <SkillsGrid />
            ) : editingId === activeItem.id ? (
              <Stack spacing={2}>
                <TextField
                  value={draftContent}
                  onChange={(event) => setDraftContent(event.target.value)}
                  multiline
                  minRows={4}
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': { color: 'var(--color-text-primary)' },
                  }}
                />
                <Stack direction="row" spacing={1.5} sx={{ justifyContent: 'flex-end' }}>
                  <Button onClick={cancelEditing} sx={{ color: 'var(--color-text-secondary)' }}>
                    취소
                  </Button>
                  <Button
                    variant="contained"
                    onClick={saveEditing}
                    sx={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary-dark)' }}
                  >
                    저장
                  </Button>
                </Stack>
              </Stack>
            ) : (
              <>
                <Typography
                  variant="body1"
                  sx={{ color: 'var(--color-text-secondary)', lineHeight: 1.9, whiteSpace: 'pre-line' }}
                >
                  {activeItem.content}
                </Typography>

                {activeItem.timeline && (
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ alignItems: 'center', flexWrap: 'wrap', gap: 1, mt: 3 }}
                  >
                    {activeItem.timeline.map((step, index) => (
                      <Stack key={step} direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                        <Chip
                          label={step}
                          size="small"
                          sx={{
                            backgroundColor: 'rgba(45,212,191,0.12)',
                            color: 'var(--color-secondary)',
                            border: '1px solid rgba(45,212,191,0.3)',
                            fontWeight: 600,
                          }}
                        />
                        {index < activeItem.timeline.length - 1 && (
                          <ArrowForwardIcon sx={{ fontSize: 16, color: 'var(--color-text-secondary)' }} />
                        )}
                      </Stack>
                    ))}
                  </Stack>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  )
}

export default AboutMePage
