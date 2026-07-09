import Box from '@mui/material/Box'

const NBSP = ' '

// 문자열을 글자 단위로 쪼개 순차적으로(translateY + opacity) 등장시킨다.
// gradient=true면 등장 애니메이션과 함께 글자마다 색이 순환하며 흘러가는 효과도 더한다.
// 스크린 리더에는 하나의 문장으로 읽히도록 부모에 aria-label을 주고 각 글자는 aria-hidden 처리한다.
const SplitText = ({
  text,
  component = 'span',
  startDelay = 0,
  step = 0.035,
  gradient = false,
  gradientStep = 0.09,
  sx,
  ...rest
}) => {
  const chars = Array.from(text)

  return (
    <Box component={component} aria-label={text} sx={sx} {...rest}>
      {chars.map((char, i) => (
        <Box
          key={i}
          component="span"
          aria-hidden="true"
          className={gradient ? 'split-char split-char--gradient' : 'split-char'}
          sx={{
            animationDelay: gradient
              ? `${startDelay + i * step}s, ${i * gradientStep}s`
              : `${startDelay + i * step}s`,
          }}
        >
          {char === ' ' ? NBSP : char}
        </Box>
      ))}
    </Box>
  )
}

export default SplitText
