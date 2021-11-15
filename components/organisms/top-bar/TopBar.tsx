import styled from 'styled-components'
import Logo from './Logo.client'
import MenuButton from './MenuButton'

const TopBar = () => {
  return (
    <TopBarWrapper data-testid='top-bar'>
      <LogoWrapper>
        <Logo />
      </LogoWrapper>
      <MenuButtonsWrapper>
        <MenuButton title='Bookmarks' type='bookmarks'>
          <i className='far fa-bookmark'></i>
        </MenuButton>
        <MenuButton title='Selections' type='selections'>
          <>
            <i className='fas fa-draw-polygon'></i>
            <i className='fas fa-map-marker-alt'></i>
          </>
        </MenuButton>
        <MenuButton title='Settings' type='settings'>
          <i className='fas fa-cog'></i>
        </MenuButton>
      </MenuButtonsWrapper>
    </TopBarWrapper>
  )
}

const TopBarWrapper = styled.div`
  --topBarHeight: 45px;
  background: ${(props) => props.theme.primaryBackgroundColor};
  height: var(--topBarHeight);
  position: relative;
  display: flex;
  pointer-events: auto;
`

const LogoWrapper = styled.div`
  height: var(--topBarHeight);
  padding: 5px;
`

const MenuButtonsWrapper = styled.div`
  position: absolute;
  display: flex;
  height: var(--topBarHeight);
  align-items: center;
  right: 0;
`

export default TopBar
