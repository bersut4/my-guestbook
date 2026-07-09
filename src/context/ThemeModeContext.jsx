import { createContext, useContext, useEffect, useRef, useState } from 'react'

const STORAGE_KEY = 'theme-mode'

const ThemeModeContext = createContext(null)

const getStoredMode = () => {
  if (typeof window === 'undefined') return null
  const stored = window.localStorage.getItem(STORAGE_KEY)
  return stored === 'light' || stored === 'dark' ? stored : null
}

const getSystemMode = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'

// 라이트/다크 모드 상태를 관리한다.
// - 사용자가 한 번이라도 토글을 누르면 그 뒤로는 localStorage에 저장된 값을 그대로 따른다.
// - 아직 사용자가 직접 고른 적이 없으면 OS의 prefers-color-scheme을 실시간으로 따라간다.
// - index.html의 인라인 스크립트가 첫 페인트 전에 이미 data-theme을 설정해두므로 깜빡임이 없다.
export const ThemeModeProvider = ({ children }) => {
  const hasExplicitChoice = useRef(getStoredMode() !== null)
  const [mode, setMode] = useState(() => getStoredMode() ?? getSystemMode())

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode)
  }, [mode])

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: light)')
    const onChange = (event) => {
      if (hasExplicitChoice.current) return
      setMode(event.matches ? 'light' : 'dark')
    }
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  const toggleMode = () => {
    hasExplicitChoice.current = true
    setMode((prev) => {
      const next = prev === 'light' ? 'dark' : 'light'
      window.localStorage.setItem(STORAGE_KEY, next)
      return next
    })
  }

  return <ThemeModeContext.Provider value={{ mode, toggleMode }}>{children}</ThemeModeContext.Provider>
}

export const useThemeMode = () => {
  const context = useContext(ThemeModeContext)
  if (!context) {
    throw new Error('useThemeMode은 ThemeModeProvider 내부에서만 사용할 수 있습니다.')
  }
  return context
}
