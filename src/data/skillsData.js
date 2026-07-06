export const skillCategories = {
  Design: { label: 'Design', color: '#FF8A65' },
  Frontend: { label: 'Frontend', color: '#2DD4BF' },
  Framework: { label: 'Framework', color: '#60A5FA' },
  Backend: { label: 'Backend', color: '#A78BFA' },
  '도구 & 기타': { label: '도구 & 기타', color: '#FBBF24' },
}

export const initialSkills = [
  {
    id: 1,
    name: 'Figma',
    level: 60,
    category: 'Design',
    description: 'UI 화면을 설계하고 프로토타입을 만들 때 사용해요.',
    isMain: false,
  },
  {
    id: 2,
    name: 'Photoshop',
    level: 65,
    category: 'Design',
    description: '이미지 보정과 합성 작업에 사용해요.',
    isMain: true,
  },
  {
    id: 3,
    name: 'Illustrator',
    level: 65,
    category: 'Design',
    description: '벡터 일러스트와 아이콘을 그릴 때 사용해요.',
    isMain: true,
  },
  {
    id: 4,
    name: 'HTML/CSS',
    level: 55,
    category: 'Frontend',
    description: '퍼블리싱 기초를 익혀 개발자와 원활히 협업할 수 있어요.',
    isMain: false,
  },
  {
    id: 5,
    name: 'AI 바이브 코딩',
    level: 70,
    category: '도구 & 기타',
    description: 'Claude Code 같은 AI 도구와 함께 코딩해요. 이 포트폴리오도 이 방식으로 만들었어요.',
    isMain: true,
  },
]

export const addableSkills = [
  { name: 'Vue.js', category: 'Frontend' },
  { name: 'Angular', category: 'Frontend' },
  { name: 'TypeScript', category: 'Frontend' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'Python', category: 'Backend' },
  { name: 'Java', category: 'Backend' },
  { name: 'Git', category: '도구 & 기타' },
  { name: 'React Native', category: '도구 & 기타' },
  { name: 'MongoDB', category: '도구 & 기타' },
]

export const sortByLevelDesc = (skills) => [...skills].sort((a, b) => b.level - a.level)
