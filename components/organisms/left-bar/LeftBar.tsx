import styled from 'styled-components'
import useUIStore from '@/organisms/ui-overlay/uiStore'
import useMapStore from '@/organisms/map/mapStore'
import LeftDrawer from '../../molecules/left-drawer/LeftDrawer'
import Coords from '@/components/atoms/coords/Coords'

const zoom = {
  IN: 'in',
  OUT: 'out',
} as const

const LeftBar = () => {
  const primaryMap = useMapStore((store) => store.primaryGoogleMap)

  const zoomButtonClick = (type: typeof zoom[keyof typeof zoom]) => {
    if (primaryMap) {
      const currentZoom = primaryMap.getZoom() ?? 1
      switch (type) {
        case zoom.IN: {
          primaryMap.setZoom(currentZoom + 1)
          return
        }
        case zoom.OUT: {
          primaryMap.setZoom(currentZoom - 1)
          return
        }
      }
    }
  }

  const globeButtonClick = () => {
    if (primaryMap) {
      primaryMap.setZoom(1)
    }
  }

  const zoomIn = () => zoomButtonClick(zoom.IN)
  const zoomOut = () => zoomButtonClick(zoom.OUT)

  const leftPanelExpanded = useUIStore((store) => store.leftPanelExpanded)
  const setLeftPanel = useUIStore((store) => store.setLeftPanel)
  const leftExpandButtonClick = () => {
    setLeftPanel(!leftPanelExpanded)
  }

  return (
    <LeftBarWrapper data-testid='left-bar'>
      {leftPanelExpanded ? <LeftDrawer /> : null}
      <ButtonsWrapper>
        <ZoomInButton onClick={zoomIn}>
          <span>+</span>
        </ZoomInButton>
        <ZoomOutButton onClick={zoomOut}>
          <span>-</span>
        </ZoomOutButton>
        <GlobeButton onClick={globeButtonClick}>
          <i className='fas fa-globe-americas'></i>
        </GlobeButton>
        <LeftExpandButton
          isExpanded={leftPanelExpanded}
          onClick={leftExpandButtonClick}>
          <i className='fas fa-arrow-right'></i>
        </LeftExpandButton>
        <Coords />
      </ButtonsWrapper>
    </LeftBarWrapper>
  )
}

const LeftBarWrapper = styled.div`
  bottom: 0;
  display: flex;
  left: 0;
  /* pointer-events: auto; */
  position: absolute;
  top: 2.75rem;
`

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  pointer-events: none;
  position: relative;
`

const MapButton = styled.div`
  align-items: center;
  background: ${(props) => props.theme.primaryBackgroundColor};
  color: ${(props) => props.theme.fontColor};
  transition: color 0.2s;
  cursor: pointer;
  display: flex;
  font-size: 1.5rem;
  font-weight: 600;
  height: 2rem;
  justify-content: center;
  line-height: 1.5rem;
  margin: 3px 0 0;
  pointer-events: auto;
  user-select: none;
  width: 1.875rem; // 30px
  span {
    pointer-events: none;
  }
  &:hover {
    color: ${(props) => props.theme.primaryColor};
  }
`

const ZoomInButton = styled(MapButton)``
const ZoomOutButton = styled(MapButton)``
const GlobeButton = styled(MapButton)`
  font-size: 1.25rem;
`

interface LeftExpandButtonProps {
  isExpanded: boolean
}

const LeftExpandButton = styled.div<LeftExpandButtonProps>`
  --left-expand-height: 90px;
  align-items: center;
  background: ${(props) => props.theme.secondaryBackgroundColor};
  border-radius: 0 0.5rem 0.5rem 0;
  border: 2px solid #000000cc;
  border-left: unset;
  cursor: pointer;
  display: flex;
  height: var(--left-expand-height);
  justify-content: center;
  pointer-events: auto;
  position: absolute;
  top: calc(50% - (var(--left-expand-height) / 2));
  width: 1.875rem; // 30px

  i {
    transform: ${(props) =>
      props.isExpanded ? 'rotateZ(-540deg)' : 'rotateZ(0deg)'};
    transition: transform 0.5s ease-in-out;
  }
`

export default LeftBar
