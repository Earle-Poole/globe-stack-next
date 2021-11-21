import styled from 'styled-components'
import useUIStore, { MenuButtonTypes } from '@/organisms/ui-overlay/uiStore'

interface MenuButtonProps {
  children: JSX.Element | string
  type: MenuButtonTypes
  title?: string
}

const MenuButton = (props: MenuButtonProps) => {
  const setTopMenuButton = useUIStore((store) => store.setTopMenuButton)
  const menuButtonObj = useUIStore((store) => store.topMenuButtons[props.type])

  const onClickHandler = () => {
    const clone = { ...menuButtonObj }
    clone.isActive = !clone.isActive
    setTopMenuButton(props.type, clone)
  }
  return (
    <ButtonWrapper
      title={props.title}
      isActive={menuButtonObj.isActive}
      onClick={onClickHandler}>
      {props.children}
    </ButtonWrapper>
  )
}

export default MenuButton

interface ButtonWrapperProps {
  isActive: boolean
}
const ButtonWrapper = styled.div<ButtonWrapperProps>`
  padding: 5px;
  margin: 0 10px;
  font-size: 24px;
  color: ${(props) =>
    props.isActive ? props.theme.primaryColor : props.theme.fontColor};
  cursor: pointer;
  position: relative;
  transition: color 0.2s;

  &:hover {
    color: ${(props) => props.theme.primaryColor};
  }
  i {
    font-weight: 300;
  }

  .fa-draw-polygon {
  }

  .fa-map-marker-alt {
    font-weight: 600;
    font-size: 16px;
    position: absolute;
    bottom: 8px;
    left: 2px;
    text-shadow: 0 0 1px ${(props) => props.theme.invertedFontColor},
      0 0 1px ${(props) => props.theme.invertedFontColor},
      0 0 3px ${(props) => props.theme.invertedFontColor};
  }
`
