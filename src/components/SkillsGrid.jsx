import { memo, useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'
import Slider from '@mui/material/Slider'
import Chip from '@mui/material/Chip'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import AddIcon from '@mui/icons-material/Add'
import StarIcon from '@mui/icons-material/Star'
import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check'
import { addableSkills, skillCategories, sortByLevelDesc } from '../data/skillsData'
import { getSkillIcon } from '../utils/skillIcons'
import { usePortfolio } from '../context/PortfolioContext'
import { cardHoverSx, iconHoverSx, skillChipHoverSx } from '../utils/hoverEffects'
import { useInView } from '../hooks/useInView'
import { useCountUp } from '../hooks/useCountUp'
import CircularSkillProgress from './CircularSkillProgress'

const SkillCard = memo(function SkillCard({ skill, onUpdateLevel }) {
  const [cardRef, inView] = useInView({ threshold: 0.3 })
  const displayLevel = useCountUp(skill.level, { start: inView, duration: 1000 })
  const [isEditing, setIsEditing] = useState(false)
  const [draftLevel, setDraftLevel] = useState(skill.level)
  const Icon = getSkillIcon(skill.name)
  const categoryColor = skillCategories[skill.category]?.color ?? 'var(--color-secondary)'

  const startEdit = () => {
    setDraftLevel(skill.level)
    setIsEditing(true)
  }

  const confirmEdit = () => {
    onUpdateLevel(skill.id, draftLevel)
    setIsEditing(false)
  }

  return (
    <Tooltip title={skill.description} arrow placement="top" disableHoverListener={isEditing}>
      <Card
        ref={cardRef}
        sx={{
          height: '100%',
          borderTop: `3px solid ${categoryColor}`,
          ...cardHoverSx(`${categoryColor}33`),
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', mb: 1.5 }}>
            <Box sx={{ color: categoryColor, display: 'flex', ...iconHoverSx(categoryColor) }}>
              <Icon />
            </Box>
            <Typography variant="subtitle1" sx={{ color: 'var(--color-text-primary)', fontWeight: 700, flex: 1 }}>
              {skill.name}
            </Typography>
            {skill.isMain && <StarIcon sx={{ fontSize: 16, color: 'var(--color-secondary)' }} />}
          </Stack>

          <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
            <Chip
              label={skill.category}
              size="small"
              sx={{
                backgroundColor: `${categoryColor}22`,
                color: categoryColor,
                border: `1px solid ${categoryColor}55`,
                height: 22,
                fontSize: '0.7rem',
              }}
            />
            {isEditing ? (
              <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
                <Typography variant="body2" sx={{ color: categoryColor, fontWeight: 700, minWidth: 32 }}>
                  {draftLevel}%
                </Typography>
                <IconButton
                  size="small"
                  onClick={confirmEdit}
                  aria-label={`${skill.name} 숙련도 ${draftLevel}%로 저장`}
                  sx={{ color: categoryColor }}
                >
                  <CheckIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </Stack>
            ) : (
              <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
                <Typography variant="body2" sx={{ color: categoryColor, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
                  {Math.round(displayLevel)}%
                </Typography>
                <IconButton
                  size="small"
                  onClick={startEdit}
                  aria-label={`${skill.name} 숙련도 수정`}
                  sx={{ color: 'var(--color-text-secondary)' }}
                >
                  <EditIcon sx={{ fontSize: 14 }} />
                </IconButton>
              </Stack>
            )}
          </Stack>

          {isEditing ? (
            <Slider
              value={draftLevel}
              onChange={(_, value) => setDraftLevel(value)}
              size="small"
              aria-label={`${skill.name} 숙련도`}
              valueLabelDisplay="auto"
              sx={{ color: categoryColor }}
            />
          ) : (
            <LinearProgress
              variant="determinate"
              value={displayLevel}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: 'var(--color-border-dark)',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: categoryColor,
                },
              }}
            />
          )}
        </CardContent>
      </Card>
    </Tooltip>
  )
})

const AddableSkillChip = memo(function AddableSkillChip({ item, onAdd }) {
  const Icon = getSkillIcon(item.name)
  return (
    <Chip
      label={item.name}
      onClick={() => onAdd(item)}
      icon={<Icon sx={{ fontSize: '16px !important' }} />}
      role="button"
      aria-label={`${item.name} 기술 추가`}
      sx={{
        backgroundColor: 'var(--color-bg-secondary)',
        color: 'var(--color-text-primary)',
        border: '1px solid var(--color-border-dark)',
        cursor: 'pointer',
        ...skillChipHoverSx('var(--color-secondary)'),
      }}
    />
  )
})

const SkillsGrid = () => {
  const { aboutMeData, addSkill, updateSkillLevel } = usePortfolio()
  const skills = aboutMeData.skills
  const [viewMode, setViewMode] = useState('category')
  const [dialogOpen, setDialogOpen] = useState(false)

  const availableToAdd = useMemo(() => {
    const existingNames = new Set(skills.map((skill) => skill.name))
    return addableSkills.filter((item) => !existingNames.has(item.name))
  }, [skills])

  const categoriesInUse = useMemo(
    () => Object.keys(skillCategories).filter((category) => skills.some((skill) => skill.category === category)),
    [skills]
  )

  const sortedByLevel = useMemo(() => sortByLevelDesc(skills), [skills])

  return (
    <Box>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{ justifyContent: 'space-between', alignItems: { xs: 'stretch', sm: 'center' }, mb: 3 }}
      >
        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={(_, next) => next && setViewMode(next)}
          size="small"
          aria-label="스킬 정렬 방식"
          sx={{
            '& .MuiToggleButton-root': { color: 'var(--color-text-secondary)', textTransform: 'none', px: 2 },
            '& .Mui-selected': {
              color: 'var(--color-secondary) !important',
              backgroundColor: 'rgba(45,212,191,0.12) !important',
            },
          }}
        >
          <ToggleButton value="category" aria-label="카테고리별로 정렬">카테고리별</ToggleButton>
          <ToggleButton value="level" aria-label="숙련도순으로 정렬">숙련도순</ToggleButton>
          <ToggleButton value="ring" aria-label="원형 그래프로 보기">원형 그래프</ToggleButton>
        </ToggleButtonGroup>

        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => setDialogOpen(true)}
          sx={{
            color: 'var(--color-secondary)',
            borderColor: 'var(--color-secondary)',
            '&:hover': { borderColor: 'var(--color-button-hover)', backgroundColor: 'rgba(45,212,191,0.08)' },
          }}
        >
          스킬 추가
        </Button>
      </Stack>

      {viewMode === 'ring' ? (
        <Grid container spacing={3}>
          {sortedByLevel.map((skill) => (
            <Grid key={skill.id} size={{ xs: 6, sm: 4, md: 3 }}>
              <CircularSkillProgress
                level={skill.level}
                color={skillCategories[skill.category]?.color}
                label={skill.name}
              />
            </Grid>
          ))}
        </Grid>
      ) : viewMode === 'level' ? (
        <Grid container spacing={2.5}>
          {sortedByLevel.map((skill) => (
            <Grid key={skill.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <SkillCard skill={skill} onUpdateLevel={updateSkillLevel} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Stack spacing={4}>
          {categoriesInUse.map((category) => (
            <Box key={category}>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 2 }}>
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    backgroundColor: skillCategories[category].color,
                  }}
                />
                <Typography variant="subtitle2" sx={{ color: 'var(--color-text-primary)', letterSpacing: 1 }}>
                  {category.toUpperCase()}
                </Typography>
              </Stack>
              <Grid container spacing={2.5}>
                {skills
                  .filter((skill) => skill.category === category)
                  .map((skill) => (
                    <Grid key={skill.id} size={{ xs: 12, sm: 6, md: 4 }}>
                      <SkillCard skill={skill} onUpdateLevel={updateSkillLevel} />
                    </Grid>
                  ))}
              </Grid>
            </Box>
          ))}
        </Stack>
      )}

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="xs"
        fullWidth
        slotProps={{
          paper: { sx: { backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border-dark)' } },
        }}
      >
        <DialogTitle sx={{ color: 'var(--color-text-primary)' }}>스킬 추가</DialogTitle>
        <DialogContent>
          {availableToAdd.length === 0 ? (
            <Typography variant="body2" sx={{ color: 'var(--color-text-secondary)', py: 2 }}>
              추가할 수 있는 기술을 모두 추가했어요.
            </Typography>
          ) : (
            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1, py: 1 }}>
              {availableToAdd.map((item) => (
                <AddableSkillChip key={item.name} item={item} onAdd={addSkill} />
              ))}
            </Stack>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default SkillsGrid
