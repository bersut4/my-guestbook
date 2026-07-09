import Box from '@mui/material/Box'

const NBSP = ' '

// 문자열을 글자 단위로 쪼개 순차적으로(translateY + opacity) 등장시킨다.
// 스크린 리더에는 하나의 문장으로 읽히도록 부모에 aria-label을 주고 각 글자는 aria-hidden 처리한다.
const SplitText = ({ text, component = 'span', startDelay = 0, step = 0.035, sx, ...rest }) => {
  const chars = Array.from(text)

  return (
    <Box component={component} aria-label={text} sx={sx} {...rest}>
      {chars.map((char, i) => (
        <Box
          key={i}
          component="span"
          aria-hidden="true"
          className="split-char"
          sx={{ animationDelay: `${startDelay + i * step}s` }}
        >
          {char === ' ' ? NBSP : char}
        </Box>
      ))}
    </Box>
  )
}

export default SplitText
