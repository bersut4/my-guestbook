import Box from '@mui/material/Box'

const NBSP = ' '
// 한글 완성형 글자는 폰트에 관계없이 대략 전각(1em) 너비라서, 각 글자가
// 하나의 큰 그라데이션에서 자기 위치에 맞는 조각만 보여주도록 근사치로 쓴다.
const CHAR_WIDTH_EM = 1.05
// index.css의 hero-gradient-sweep 키프레임이 background-position-x를 0~이 값만큼 더 움직인다.
// 값이 클수록 흐르는 게 더 뚜렷하게 보인다. 그라데이션 이미지 폭에도 같은 여유를 더해야
// 흐르는 동안 이미지 범위를 벗어나 글자가 투명해지는 일이 없다.
const GRADIENT_TRAVEL_EM = 8

// 문자열을 글자 단위로 쪼개 순차적으로(translateY + opacity) 등장시킨다.
// gradient=true면 전체 문장이 하나로 이어지는 그라데이션을 배경-클립으로 표현하고
// (각 글자는 그 큰 그라데이션에서 자기 위치에 해당하는 조각만 보여줌) 천천히 오른쪽으로 흐르게 한다.
// 공백은 애니메이션 없이 일반 spacing으로만 렌더링한다(inline-block 처리 시 사라지는 문제 방지).
// 스크린 리더에는 하나의 문장으로 읽히도록 부모에 aria-label을 주고 각 글자는 aria-hidden 처리한다.
const SplitText = ({ text, component = 'span', startDelay = 0, step = 0.035, gradient = false, sx, ...rest }) => {
  const chars = Array.from(text)
  // 실제 렌더링 폭이 근사치보다 살짝 클 수 있어 여유폭 + 흐름 이동폭을 더해
  // 마지막 글자가 흐르는 도중에도 이미지 범위를 벗어나 투명해지지 않게 한다.
  const totalWidthEm = (chars.length + 1) * CHAR_WIDTH_EM + GRADIENT_TRAVEL_EM

  return (
    <Box component={component} aria-label={text} sx={sx} {...rest}>
      {chars.map((char, i) => {
        if (char === ' ') {
          return (
            <Box key={i} component="span" aria-hidden="true">
              {NBSP}
            </Box>
          )
        }

        return (
          <Box
            key={i}
            component="span"
            aria-hidden="true"
            className={gradient ? 'split-char split-char--gradient' : 'split-char'}
            sx={{
              animationDelay: gradient ? `${startDelay + i * step}s, 0s` : `${startDelay + i * step}s`,
              ...(gradient && {
                '--split-offset': `${i * CHAR_WIDTH_EM}em`,
                '--split-total-width': `${totalWidthEm}em`,
              }),
            }}
          >
            {char}
          </Box>
        )
      })}
    </Box>
  )
}

export default SplitText
