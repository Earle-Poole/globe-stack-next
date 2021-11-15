import styled from 'styled-components'
import { MenuButtonTypes } from '@/organisms/ui-overlay/uiStore'
import Bookmarks from './Bookmarks'
import Selections from './Selections'
import Settings from './Settings'

interface WindowContainerProps {
  type: MenuButtonTypes
}

const WindowContainer = (props: WindowContainerProps) => {
  const SelectedWindow = () => {
    switch (props.type) {
      case 'bookmarks':
        return <Bookmarks />
      case 'selections':
        return <Selections />
      case 'settings':
        return <Settings />
    }
  }
  const headerString = props.type[0].toUpperCase() + props.type.substring(1)

  return (
    <WindowContainerWrapper>
      <WindowHeader className='windowDragHandle'>{headerString}</WindowHeader>
      <WindowBody>
        <SelectedWindow />
      </WindowBody>
    </WindowContainerWrapper>
  )
}

export default WindowContainer

const WindowContainerWrapper = styled.div`
  height: 100%;
  overflow: hidden;
  border-radius: 6px;
  background: ${(props) => props.theme.primaryBackgroundColor};
  color: ${(props) => props.theme.fontColor};
`
const windowHeaderHeight = '25px'
const WindowHeader = styled.div`
  background: ${(props) => props.theme.primaryColor};
  padding: 0 5px;
  user-select: none;
  font-weight: 600;
  display: flex;
  align-items: center;
  height: ${windowHeaderHeight};
`
const WindowBody = styled.div`
  height: calc(100% - ${windowHeaderHeight});
  overflow: overlay;
  padding: 0 10px;
`
