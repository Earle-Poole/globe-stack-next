import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { throttle } from '@/utils/fn'
import { callClientSide } from '@/utils/tacklebox'

const Logo = () => {
  let defaultWidth = 0

  callClientSide(() => {
    defaultWidth = window.innerWidth
  })

  const [windowWidth, setWindowWidth] = useState(defaultWidth)

  const setWindowInnerWidth = useCallback(() => {
    setWindowWidth(defaultWidth)
  }, [defaultWidth])

  useEffect(() => {
    const windowResizeTuple: [string, () => void] = [
      'resize',
      throttle(setWindowInnerWidth, 250),
    ]
    window.addEventListener(...windowResizeTuple)

    return () => {
      window.removeEventListener(...windowResizeTuple)
    }
  }, [setWindowInnerWidth])

  return (
    <LogoWrapper>
      <Globe className={'fal fa-globe'} />
      <Globe className={'fal fa-globe'} />
      <Globe className={'fal fa-globe'} />
      <LogoText>
        {windowWidth > 800 ? 'Globe' : 'G'}
        <strong>{windowWidth > 800 ? 'Stack' : 'S'}</strong>
      </LogoText>
    </LogoWrapper>
  )
}

export default Logo

const LogoWrapper = styled.div`
  color: ${(props) => props.theme.fontColor};
  user-select: none;
`

const Globe = styled.i`
  font-size: 16px;
  position: absolute;
  font-weight: 300;
  left: 10px;
  filter: drop-shadow(1px 1px 1px ${(props) => props.theme.invertedFontColor});
  &:nth-child(1) {
    color: red;
    top: 3px;
  }
  &:nth-child(2) {
    color: green;
    top: 13px;
  }
  &:nth-child(3) {
    color: blue;
    top: 23px;
  }
`

const LogoText = styled.span`
  position: absolute;
  filter: drop-shadow(2px 3px 2px ${(props) => props.theme.invertedFontColor});
  top: 0;
  left: 30px;
  font-size: 30px;

  & > strong {
    font-weight: 900;
    letter-spacing: 1.5px;
  }
`
