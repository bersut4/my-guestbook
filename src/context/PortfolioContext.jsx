import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { initialAboutMeData } from '../data/aboutMeData'
import { initialSkills, sortByLevelDesc } from '../data/skillsData'

const SUMMARY_LENGTH = 100

const PortfolioContext = createContext(null)

export const PortfolioProvider = ({ children }) => {
  const [aboutMeData, setAboutMeData] = useState({
    basicInfo: initialAboutMeData.basicInfo,
    sections: initialAboutMeData.sections,
    skills: initialSkills,
  })

  const updateSection = useCallback((id, content) => {
    setAboutMeData((prev) => ({
      ...prev,
      sections: prev.sections.map((section) => (section.id === id ? { ...section, content } : section)),
    }))
  }, [])

  const updatePhoto = useCallback((photo) => {
    setAboutMeData((prev) => ({ ...prev, basicInfo: { ...prev.basicInfo, photo } }))
  }, [])

  const updateSkillLevel = useCallback((id, level) => {
    setAboutMeData((prev) => ({
      ...prev,
      skills: prev.skills.map((skill) => (skill.id === id ? { ...skill, level } : skill)),
    }))
  }, [])

  const addSkill = useCallback((skill) => {
    setAboutMeData((prev) => ({
      ...prev,
      skills: [
        ...prev.skills,
        {
          id: Date.now(),
          level: 30,
          description: '새로 추가한 기술이에요.',
          isMain: false,
          ...skill,
        },
      ],
    }))
  }, [])

  const homeData = useMemo(() => {
    const homeContent = aboutMeData.sections
      .filter((section) => section.showInHome)
      .map((section) => ({
        id: section.id,
        title: section.title,
        summary:
          section.content.length > SUMMARY_LENGTH
            ? `${section.content.slice(0, SUMMARY_LENGTH)}...`
            : section.content,
      }))

    return {
      homeContent,
      topSkills: sortByLevelDesc(aboutMeData.skills).slice(0, 4),
      basicInfo: aboutMeData.basicInfo,
    }
  }, [aboutMeData])

  const value = useMemo(
    () => ({ aboutMeData, updateSection, updatePhoto, updateSkillLevel, addSkill, homeData }),
    [aboutMeData, updateSection, updatePhoto, updateSkillLevel, addSkill, homeData]
  )

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>
}

export const usePortfolio = () => {
  const context = useContext(PortfolioContext)
  if (!context) {
    throw new Error('usePortfolio는 PortfolioProvider 내부에서만 사용할 수 있습니다.')
  }
  return context
}
