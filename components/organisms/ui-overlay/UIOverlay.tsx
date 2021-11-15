import styled from 'styled-components'
import LeftBar from '@/molecules/left-bar/LeftBar'
import TopBar from '@/molecules/top-bar/TopBar'
import WindowGrid from '@/molecules/windows/WindowGrid'

const UIOverlay = () => {
  return (
    <UIOverlayWrapper data-testid='ui-overlay'>
      <TopBar />
      <LeftBar />
      <WindowGrid />
    </UIOverlayWrapper>
  )
}

const UIOverlayWrapper = styled.div`
  * ::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.primaryColor};
  }
  bottom: 0;
  z-index: 10;
  left: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
  top: 0;
  transition: left 0.3s;
`

export default UIOverlay
