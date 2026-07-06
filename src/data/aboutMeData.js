export const initialAboutMeData = {
  basicInfo: {
    name: '권은별',
    education: '동서대학교 일본어학과',
    major: '일본어',
    experience: '일본어 4년 (독학 기간 포함 9년) · 프로그래밍 경력 없음',
    photo: '',
  },
  sections: [
    {
      id: 'dev-story',
      title: '나의 개발 스토리',
      content:
        '어릴 때부터 컴퓨터와 코딩에 흥미는 있었지만, 배우는 데 어려움을 느껴 한 번 포기했었어요.\n\n' +
        '그러다 대학 졸업 시기가 다가오도록 진로를 정하지 못하고 꿈을 찾아 헤매던 중, 웹디자이너라는 직업을 알게 되었습니다. 여러 기술이 하나의 화면 안에서 만나는 이 일에 흥미를 느껴 공부를 시작했어요.\n\n' +
        "다시 코딩에서 어려움을 겪을 거라 예상했지만, '바이브 코딩'이라는 방법을 알게 되면서 코딩에 다시 도전해보기로 했습니다.",
      showInHome: true,
    },
    {
      id: 'philosophy',
      title: '개발 철학',
      content:
        '사용자의 눈에 잘 들어오고 기억에 남는 요소를 만드는 것, 그리고 다시 찾아오고 싶게 만드는 것이 중요하다고 생각합니다.',
      showInHome: true,
    },
    {
      id: 'personal',
      title: '개인적인 이야기',
      content: '스쿠버다이빙, 프리다이빙, 캠핑, 게임, 애니메이션을 좋아합니다.',
      showInHome: false,
    },
  ],
}
