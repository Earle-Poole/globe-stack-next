import styled from 'styled-components'
import { MenuButtonTypes } from '@/organisms/ui-overlay/uiStore'
import Bookmarks from './Bookmarks'
import Selections from './Selections'
import Settings from './Settings'
import { useCallback } from 'react'
import { windows } from '@/utils/constants'
import { WindowValues } from '@/utils/constants.types'

interface WindowContainerProps {
  type: WindowValues
}

const WindowContainer = (props: WindowContainerProps) => {
  const SelectedWindow = useCallback(() => {
    switch (props.type) {
      case windows.BOOKMARKS:
        return <Bookmarks />
      case windows.SELECTIONS:
        return <Selections />
      case windows.SETTINGS:
        return <Settings />
      default:
        return null
    }
  }, [props.type])
  
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
  border: 2px solid black;
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
