import { useEffect, useRef } from 'react'
import Box from '@mui/material/Box'

const BUBBLES = [
  { left: '6%',  size: 10, duration: 9,   delay: 0 },
  { left: '16%', size: 6,  duration: 7,   delay: 2 },
  { left: '26%', size: 14, duration: 11,  delay: 1 },
  { left: '37%', size: 8,  duration: 8,   delay: 4 },
  { left: '48%', size: 5,  duration: 6,   delay: 3 },
  { left: '58%', size: 12, duration: 10,  delay: 0.5 },
  { left: '68%', size: 7,  duration: 8.5, delay: 2.5 },
  { left: '78%', size: 9,  duration: 9.5, delay: 5 },
  { left: '87%', size: 6,  duration: 7.5, delay: 1.5 },
  { left: '94%', size: 11, duration: 10.5, delay: 3.5 },
]

const FISH = [
  { top: '36%', size: 34, duration: 26, delay: 0,  direction: 'ltr', color: 'var(--color-secondary)' },
  { top: '52%', size: 22, duration: 19, delay: 6,  direction: 'rtl', color: 'var(--color-text-secondary)' },
  { top: '68%', size: 28, duration: 32, delay: 3,  direction: 'ltr', color: 'var(--color-accent)' },
  { top: '80%', size: 18, duration: 22, delay: 10, direction: 'rtl', color: 'var(--color-secondary)' },
  { top: '22%', size: 16, duration: 24, delay: 8,  direction: 'ltr', color: 'var(--color-text-secondary)' },
  { top: '44%', size: 12, duration: 17, delay: 12, direction: 'rtl', color: 'var(--color-accent)' },
  { top: '60%', size: 20, duration: 29, delay: 5,  direction: 'rtl', color: 'var(--color-text-secondary)' },
]

const GOD_RAYS = [
  { left: '12%', width: 120, rotate: -10, duration: 8,  delay: 0 },
  { left: '38%', width: 90,  rotate: 7,   duration: 10, delay: 2.5 },
  { left: '64%', width: 150, rotate: -6,  duration: 9,  delay: 1 },
  { left: '84%', width: 100, rotate: 9,   duration: 11, delay: 4 },
]

const SURFACE_END = 0.25
const DEPTH_END = 0.85
const SEABED_START = 0.85

const OCEAN_SHALLOW_TOP = '#1A4E68'
const OCEAN_SHALLOW_BOTTOM = '#123047'
const OCEAN_DEEP_TOP = '#0A1C2B'
const OCEAN_DEEP_BOTTOM = '#040B12'

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)
const lerp = (a, b, t) => a + (b - a) * t

const hexToRgb = (hex) => {
  const n = parseInt(hex.replace('#', ''), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

const lerpColor = (hexA, hexB, t) => {
  const [r1, g1, b1] = hexToRgb(hexA)
  const [r2, g2, b2] = hexToRgb(hexB)
  const r = Math.round(lerp(r1, r2, t))
  const g = Math.round(lerp(g1, g2, t))
  const b = Math.round(lerp(b1, b2, t))
  return `rgb(${r}, ${g}, ${b})`
}

const FishSilhouette = ({ size, color }) => (
  <svg width={size} height={size * 0.5} viewBox="0 0 40 20">
    <path
      d="M2 10 C 8 0, 24 0, 30 5 L 40 0 L 34 10 L 40 20 L 30 15 C 24 20, 8 20, 2 10 Z"
      fill={color}
      opacity="0.8"
    />
    <circle cx="8" cy="9" r="1.4" fill="var(--color-primary-dark)" opacity="0.8" />
  </svg>
)

const OceanBackground = () => {
  const oceanRef = useRef(null)
  const waveBackRef = useRef(null)
  const waveFrontRef = useRef(null)
  const seabedRef = useRef(null)
  const godRaysRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    const update = () => {
      rafRef.current = null
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = maxScroll > 0 ? clamp(window.scrollY / maxScroll, 0, 1) : 0

      const surfaceT = clamp(progress / SURFACE_END, 0, 1)
      const surfaceY = lerp(33, -4, surfaceT)
      if (oceanRef.current) oceanRef.current.style.top = `${surfaceY}vh`
      if (waveBackRef.current) waveBackRef.current.style.top = `${surfaceY}vh`
      if (waveFrontRef.current) waveFrontRef.current.style.top = `${surfaceY}vh`

      const depthT = clamp(progress / DEPTH_END, 0, 1)
      if (oceanRef.current) {
        const top = lerpColor(OCEAN_SHALLOW_TOP, OCEAN_DEEP_TOP, depthT)
        const bottom = lerpColor(OCEAN_SHALLOW_BOTTOM, OCEAN_DEEP_BOTTOM, depthT)
        oceanRef.current.style.background = `linear-gradient(180deg, ${top} 0%, ${bottom} 100%)`
      }

      const seabedT = clamp((progress - SEABED_START) / (1 - SEABED_START), 0, 1)
      if (seabedRef.current) {
        seabedRef.current.style.opacity = String(seabedT)
        seabedRef.current.style.transform = `translateY(${lerp(20, 0, seabedT)}px)`
      }

      if (godRaysRef.current) {
        godRaysRef.current.style.opacity = String(lerp(1, 0.1, depthT))
      }
    }

    const onScroll = () => {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    const resizeObserver = new ResizeObserver(onScroll)
    resizeObserver.observe(document.body)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      resizeObserver.disconnect()
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <Box
      aria-hidden="true"
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        background: 'linear-gradient(180deg, var(--color-sky-top) 0%, var(--color-sky-bottom) 100%)',
      }}
    >
      <Box ref={oceanRef} sx={{ position: 'absolute', left: 0, right: 0, bottom: 0, top: '33vh' }}>
        <Box ref={godRaysRef} sx={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          {GOD_RAYS.map((ray, i) => (
            <Box
              key={i}
              data-ocean-decor
              sx={{
                position: 'absolute',
                top: 0,
                left: ray.left,
                width: ray.width,
                height: '70vh',
                background: 'linear-gradient(180deg, rgba(230,241,245,0.4) 0%, rgba(230,241,245,0) 85%)',
                filter: 'blur(6px)',
                mixBlendMode: 'screen',
                transformOrigin: 'top center',
                '--ray-rotate': `${ray.rotate}deg`,
                transform: `rotate(${ray.rotate}deg)`,
                animation: `ocean-godray-shimmer ${ray.duration}s ease-in-out ${ray.delay}s infinite backwards`,
              }}
            />
          ))}
        </Box>
      </Box>

      {BUBBLES.map((bubble, i) => (
        <Box
          key={i}
          data-ocean-decor
          sx={{
            position: 'absolute',
            left: bubble.left,
            bottom: '-5%',
            width: bubble.size,
            height: bubble.size,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.55), rgba(255,255,255,0.05) 70%)',
            animation: `ocean-bubble-rise ${bubble.duration}s ease-in ${bubble.delay}s infinite backwards`,
          }}
        />
      ))}

      {FISH.map((fish, i) => (
        <Box
          key={i}
          data-ocean-decor
          sx={{
            position: 'absolute',
            top: fish.top,
            left: 0,
            animation: `ocean-fish-swim-${fish.direction} ${fish.duration}s linear ${fish.delay}s infinite backwards`,
          }}
        >
          <Box sx={{ transform: fish.direction === 'ltr' ? 'scaleX(-1)' : 'none' }}>
            <FishSilhouette size={fish.size} color={fish.color} />
          </Box>
        </Box>
      ))}

      <Box
        ref={waveBackRef}
        data-ocean-decor
        sx={{
          position: 'absolute',
          left: 0,
          width: '200%',
          height: 48,
          top: '33vh',
          opacity: 0.5,
          animation: 'ocean-wave-drift-back 14s linear infinite',
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 2400 48" preserveAspectRatio="none">
          <path
            d="M0 24 C 200 0, 400 48, 600 24 S 1000 0, 1200 24 S 1600 48, 1800 24 S 2200 0, 2400 24 L2400 48 L0 48 Z"
            fill="var(--color-wave-trough)"
          />
        </svg>
      </Box>

      <Box
        ref={waveFrontRef}
        data-ocean-decor
        sx={{
          position: 'absolute',
          left: 0,
          width: '200%',
          height: 40,
          top: '33vh',
          animation: 'ocean-wave-drift-front 9s linear infinite',
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 2400 40" preserveAspectRatio="none">
          <path
            d="M0 20 C 150 40, 350 0, 500 20 S 850 40, 1000 20 S 1350 0, 1500 20 S 1850 40, 2000 20 S 2350 0, 2400 20 L2400 40 L0 40 Z"
            fill="var(--color-wave-crest)"
          />
        </svg>
      </Box>

      <Box
        ref={seabedRef}
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: '20vh',
          opacity: 0,
          background: 'linear-gradient(180deg, var(--color-sand-dark) 0%, var(--color-sand) 100%)',
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1200 200"
          preserveAspectRatio="none"
          style={{ position: 'absolute', inset: 0 }}
        >
          {/* 왼쪽 산호초 군락 (가지형 산호) */}
          <g opacity="0.95" fill="none" strokeLinecap="round">
            <path d="M115 200 A 55 38 0 0 1 225 200 Z" fill="var(--color-badge-hot)" stroke="none" />
            <path d="M130 196 Q 170 176 210 196" stroke="var(--color-sand-dark)" strokeWidth="3" opacity="0.35" />
            <path d="M136 188 Q 170 168 204 188" stroke="var(--color-sand-dark)" strokeWidth="3" opacity="0.3" />

            <path d="M95 200 L90 150" stroke="var(--color-accent)" strokeWidth="8" />
            <path d="M90 150 L78 122" stroke="var(--color-accent)" strokeWidth="5" />
            <path d="M90 150 L98 118" stroke="var(--color-accent)" strokeWidth="5" />
            <path d="M98 118 L104 96" stroke="var(--color-accent)" strokeWidth="3" />

            <path d="M140 200 L148 148" stroke="var(--color-badge-hot)" strokeWidth="8" />
            <path d="M148 148 L136 116" stroke="var(--color-badge-hot)" strokeWidth="5" />
            <path d="M148 148 L160 114" stroke="var(--color-badge-hot)" strokeWidth="5" />
            <path d="M136 116 L128 92" stroke="var(--color-badge-hot)" strokeWidth="3" />
            <path d="M160 114 L168 90" stroke="var(--color-badge-hot)" strokeWidth="3" />

            <path d="M185 200 L192 155" stroke="var(--color-accent)" strokeWidth="7" />
            <path d="M192 155 L182 128" stroke="var(--color-accent)" strokeWidth="4" />
            <path d="M192 155 L202 130" stroke="var(--color-accent)" strokeWidth="4" />

            <path d="M225 200 L219 152" stroke="var(--color-badge-hot)" strokeWidth="7" />
            <path d="M219 152 L208 126" stroke="var(--color-badge-hot)" strokeWidth="4" />
            <path d="M219 152 L230 124" stroke="var(--color-badge-hot)" strokeWidth="4" />

            <circle cx="104" cy="96" r="4" fill="var(--color-secondary)" stroke="none" data-ocean-decor style={{ animation: 'ocean-coral-glow 3.2s ease-in-out 0s infinite backwards', transformOrigin: '104px 96px' }} />
            <circle cx="128" cy="92" r="4.5" fill="var(--color-secondary)" stroke="none" data-ocean-decor style={{ animation: 'ocean-coral-glow 3.6s ease-in-out 0.6s infinite backwards', transformOrigin: '128px 92px' }} />
            <circle cx="168" cy="90" r="4" fill="var(--color-secondary)" stroke="none" data-ocean-decor style={{ animation: 'ocean-coral-glow 2.8s ease-in-out 1.2s infinite backwards', transformOrigin: '168px 90px' }} />
            <circle cx="182" cy="128" r="3.5" fill="var(--color-secondary)" stroke="none" data-ocean-decor style={{ animation: 'ocean-coral-glow 3.4s ease-in-out 1.8s infinite backwards', transformOrigin: '182px 128px' }} />
            <circle cx="230" cy="124" r="3.5" fill="var(--color-secondary)" stroke="none" data-ocean-decor style={{ animation: 'ocean-coral-glow 3s ease-in-out 0.9s infinite backwards', transformOrigin: '230px 124px' }} />
          </g>

          {/* 해초 (양치식물 스타일) */}
          <g>
            <path d="M345 200 Q340 150 348 102" stroke="var(--color-secondary)" strokeWidth="3" fill="none" strokeLinecap="round" />
            <ellipse cx="341" cy="185" rx="7" ry="3" fill="var(--color-secondary)" transform="rotate(-25 341 185)" />
            <ellipse cx="347" cy="172" rx="7" ry="3" fill="var(--color-secondary)" transform="rotate(20 347 172)" />
            <ellipse cx="339" cy="158" rx="6" ry="2.5" fill="var(--color-secondary)" transform="rotate(-20 339 158)" />
            <ellipse cx="345" cy="144" rx="6" ry="2.5" fill="var(--color-secondary)" transform="rotate(20 345 144)" />
            <ellipse cx="341" cy="128" rx="5" ry="2" fill="var(--color-secondary)" transform="rotate(-18 341 128)" />
            <ellipse cx="346" cy="114" rx="4.5" ry="2" fill="var(--color-secondary)" transform="rotate(18 346 114)" />

            <path d="M368 200 Q373 160 366 122" stroke="var(--color-secondary)" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.75" />
            <ellipse cx="371" cy="182" rx="5.5" ry="2.3" fill="var(--color-secondary)" opacity="0.75" transform="rotate(25 371 182)" />
            <ellipse cx="366" cy="168" rx="5" ry="2.2" fill="var(--color-secondary)" opacity="0.75" transform="rotate(-20 366 168)" />
            <ellipse cx="370" cy="152" rx="4.5" ry="2" fill="var(--color-secondary)" opacity="0.7" transform="rotate(22 370 152)" />
            <ellipse cx="366" cy="136" rx="4" ry="1.8" fill="var(--color-secondary)" opacity="0.7" transform="rotate(-18 366 136)" />
          </g>

          {/* 불가사리 */}
          <path
            d="M480 158 L487 172 L502 173 L490 183 L494 198 L480 189 L466 198 L470 183 L458 173 L473 172 Z"
            fill="var(--color-accent)"
            opacity="0.9"
          />

          {/* 게 (귀여운 캐릭터 스타일) */}
          <g transform="translate(660, 172)" opacity="0.95">
            {/* 집게발 */}
            <path
              d="M-16 -12 C-24 -26 -40 -34 -48 -24 C-54 -14 -48 -2 -36 -6 C-40 2 -32 10 -24 4 C-18 0 -14 -6 -16 -12 Z"
              fill="var(--color-badge-hot)"
            />
            <path
              d="M16 -12 C24 -26 40 -34 48 -24 C54 -14 48 -2 36 -6 C40 2 32 10 24 4 C18 0 14 -6 16 -12 Z"
              fill="var(--color-badge-hot)"
            />

            {/* 다리 (물결) */}
            <path d="M-26 14 Q-34 18 -30 24 Q-26 30 -34 35" stroke="var(--color-badge-hot)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            <path d="M-22 20 Q-30 24 -27 30 Q-24 36 -32 40" stroke="var(--color-badge-hot)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            <path d="M-16 25 Q-23 30 -21 36 Q-19 42 -27 45" stroke="var(--color-badge-hot)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            <path d="M26 14 Q34 18 30 24 Q26 30 34 35" stroke="var(--color-badge-hot)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            <path d="M22 20 Q30 24 27 30 Q24 36 32 40" stroke="var(--color-badge-hot)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            <path d="M16 25 Q23 30 21 36 Q19 42 27 45" stroke="var(--color-badge-hot)" strokeWidth="3.5" fill="none" strokeLinecap="round" />

            {/* 몸통 */}
            <ellipse cx="0" cy="0" rx="30" ry="26" fill="var(--color-badge-hot)" />
            <path d="M-15 10 A 15 11 0 0 0 15 10 Z" fill="var(--color-accent)" opacity="0.75" />

            {/* 눈 */}
            <circle cx="-9" cy="-6" r="7" fill="#FFFFFF" />
            <circle cx="9" cy="-6" r="7" fill="#FFFFFF" />
            <circle cx="-8" cy="-5" r="3.2" fill="var(--color-primary-dark)" />
            <circle cx="10" cy="-5" r="3.2" fill="var(--color-primary-dark)" />

            {/* 미소 */}
            <path d="M-5 6 Q0 10 5 6" stroke="var(--color-primary-dark)" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          </g>

          {/* 오른쪽 산호초 군락 (가지형 산호) */}
          <g opacity="0.95" fill="none" strokeLinecap="round">
            <path d="M975 200 A 55 38 0 0 1 1085 200 Z" fill="var(--color-accent)" stroke="none" />
            <path d="M990 196 Q 1030 176 1070 196" stroke="var(--color-sand-dark)" strokeWidth="3" opacity="0.35" />
            <path d="M996 188 Q 1030 168 1064 188" stroke="var(--color-sand-dark)" strokeWidth="3" opacity="0.3" />

            <path d="M1105 200 L1110 150" stroke="var(--color-accent)" strokeWidth="8" />
            <path d="M1110 150 L1122 122" stroke="var(--color-accent)" strokeWidth="5" />
            <path d="M1110 150 L1102 118" stroke="var(--color-accent)" strokeWidth="5" />
            <path d="M1102 118 L1096 96" stroke="var(--color-accent)" strokeWidth="3" />

            <path d="M1060 200 L1052 148" stroke="var(--color-badge-hot)" strokeWidth="8" />
            <path d="M1052 148 L1064 116" stroke="var(--color-badge-hot)" strokeWidth="5" />
            <path d="M1052 148 L1040 114" stroke="var(--color-badge-hot)" strokeWidth="5" />
            <path d="M1064 116 L1072 92" stroke="var(--color-badge-hot)" strokeWidth="3" />
            <path d="M1040 114 L1032 90" stroke="var(--color-badge-hot)" strokeWidth="3" />

            <path d="M1015 200 L1008 155" stroke="var(--color-accent)" strokeWidth="7" />
            <path d="M1008 155 L1018 128" stroke="var(--color-accent)" strokeWidth="4" />
            <path d="M1008 155 L998 130" stroke="var(--color-accent)" strokeWidth="4" />

            <path d="M975 200 L981 152" stroke="var(--color-badge-hot)" strokeWidth="7" />
            <path d="M981 152 L992 126" stroke="var(--color-badge-hot)" strokeWidth="4" />
            <path d="M981 152 L970 124" stroke="var(--color-badge-hot)" strokeWidth="4" />

            <circle cx="1096" cy="96" r="4" fill="var(--color-secondary)" stroke="none" data-ocean-decor style={{ animation: 'ocean-coral-glow 3.2s ease-in-out 0.3s infinite backwards', transformOrigin: '1096px 96px' }} />
            <circle cx="1072" cy="92" r="4.5" fill="var(--color-secondary)" stroke="none" data-ocean-decor style={{ animation: 'ocean-coral-glow 3.6s ease-in-out 0.9s infinite backwards', transformOrigin: '1072px 92px' }} />
            <circle cx="1032" cy="90" r="4" fill="var(--color-secondary)" stroke="none" data-ocean-decor style={{ animation: 'ocean-coral-glow 2.8s ease-in-out 1.5s infinite backwards', transformOrigin: '1032px 90px' }} />
            <circle cx="1018" cy="128" r="3.5" fill="var(--color-secondary)" stroke="none" data-ocean-decor style={{ animation: 'ocean-coral-glow 3.4s ease-in-out 2.1s infinite backwards', transformOrigin: '1018px 128px' }} />
            <circle cx="970" cy="124" r="3.5" fill="var(--color-secondary)" stroke="none" data-ocean-decor style={{ animation: 'ocean-coral-glow 3s ease-in-out 1.2s infinite backwards', transformOrigin: '970px 124px' }} />
          </g>
        </svg>
      </Box>
    </Box>
  )
}

export default OceanBackground
