import styled from 'styled-components'
import WindowContainer from './WindowContainer'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import GridLayout from 'react-grid-layout'
import useUIStore from '../../templates/ui-overlay/uiStore'

const WindowGrid = () => {
  let defaultWidth = 0
  const bookmarksIsActive = useUIStore(
    (store) => store.topMenuButtons.bookmarks.isActive
  )
  const selectionsIsActive = useUIStore(
    (store) => store.topMenuButtons.selections.isActive
  )
  const settingsIsActive = useUIStore(
    (store) => store.topMenuButtons.settings.isActive
  )

  const defaultGridOptions = { x: 12, y: 0, w: 2, h: 2, minW: 2, maxW: 5 }

  if(typeof window !== 'undefined') {
    defaultWidth = window.innerWidth
  }

  return (
    <WindowGridWrapper>
      <GridLayout
        cols={Math.round(defaultWidth / 160)}
        compactType={null}
        isBounded
        draggableHandle={'.windowDragHandle'}
        rowHeight={120}
        width={defaultWidth}>
        {bookmarksIsActive ? (
          <div data-grid={defaultGridOptions} key='bookmarks'>
            <WindowContainer type='bookmarks' />
          </div>
        ) : null}
        {settingsIsActive ? (
          <div data-grid={defaultGridOptions} key='settings'>
            <WindowContainer type='settings' />
          </div>
        ) : null}
        {selectionsIsActive ? (
          <div data-grid={defaultGridOptions} key='selections'>
            <WindowContainer type='selections' />
          </div>
        ) : null}
      </GridLayout>
    </WindowGridWrapper>
  )
}

export default WindowGrid

const WindowGridWrapper = styled.section`
  height: calc(100% - 45px);

  .react-grid-layout {
    height: 100% !important;
  }
  .react-grid-item {
    pointer-events: auto;
  }
`
