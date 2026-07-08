import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import useMediaQuery from '@mui/material/useMediaQuery'
import { MOBILE_QUERY } from '../utils/breakpoints'

const SECTIONS = [
  { id: 'hero-section', label: '홈' },
  { id: 'about-section-home', label: '소개' },
  { id: 'skills-section', label: '기술 스택' },
  { id: 'projects-section', label: '프로젝트' },
  { id: 'contact-section', label: '연락하기' },
  { id: 'guestbook-section', label: '방명록' },
]

const LAST_SECTION_ID = SECTIONS[SECTIONS.length - 1].id

const scrollToId = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const SectionDotNav = () => {
  const location = useLocation()
  const isMobile = useMediaQuery(MOBILE_QUERY)
  const [activeId, setActiveId] = useState(SECTIONS[0].id)
  const observerRef = useRef(null)
  const rafRef = useRef(null)
  const isHome = location.pathname === '/'

  useEffect(() => {
    if (!isHome) return undefined

    const elements = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean)
    if (elements.length === 0) return undefined

    // A short last section can end up entirely outside the shrunken
    // rootMargin band even when the page is scrolled all the way down,
    // so it never reports as intersecting. Force it active once we hit
    // the bottom of the page as a fallback for the IntersectionObserver.
    const checkAtBottom = () => {
      rafRef.current = null
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      if (scrollable > 0 && window.scrollY >= scrollable - 2) {
        setActiveId(LAST_SECTION_ID)
      }
    }

    const onScroll = () => {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(checkAtBottom)
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (mostVisible) setActiveId(mostVisible.target.id)
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    )

    elements.forEach((el) => observerRef.current.observe(el))
    window.addEventListener('scroll', onScroll, { passive: true })
    checkAtBottom()

    return () => {
      observerRef.current?.disconnect()
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [isHome])

  if (!isHome || isMobile) return null

  return (
    <Box
      aria-label="섹션 바로가기"
      sx={{
        position: 'fixed',
        right: 20,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 5,
        display: 'flex',
        flexDirection: 'column',
        gap: 1.25,
      }}
    >
      {SECTIONS.map((section) => {
        const isActive = activeId === section.id
        return (
          <Tooltip key={section.id} title={section.label} placement="left">
            <Box
              component="button"
              type="button"
              onClick={() => scrollToId(section.id)}
              aria-label={`${section.label} 섹션으로 이동`}
              aria-current={isActive ? 'true' : undefined}
              sx={{
                width: 24,
                height: 24,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              <Box
                sx={{
                  width: isActive ? 10 : 7,
                  height: isActive ? 10 : 7,
                  borderRadius: '50%',
                  backgroundColor: isActive ? 'var(--color-secondary)' : 'rgba(143,184,199,0.4)',
                  boxShadow: isActive ? '0 0 8px rgba(45,212,191,0.65)' : 'none',
                  transition: 'width 0.25s ease, height 0.25s ease, background-color 0.25s ease, box-shadow 0.25s ease',
                }}
              />
            </Box>
          </Tooltip>
        )
      })}
    </Box>
  )
}

export default SectionDotNav
