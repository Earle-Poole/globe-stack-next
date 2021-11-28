import styled from 'styled-components';
import WindowContainer from './WindowContainer';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import GridLayout from 'react-grid-layout';
import useUIStore from '@/organisms/ui-overlay/uiStore';
import { callClientSide } from '@/utils/tacklebox';
import { windows } from '@/utils/constants';

const WindowGrid = () => {
  const bookmarksIsActive = useUIStore((store) => store.topMenuButtons.bookmarks.isActive);
  const selectionsIsActive = useUIStore((store) => store.topMenuButtons.selections.isActive);
  const settingsIsActive = useUIStore((store) => store.topMenuButtons.settings.isActive);

  const defaultGridOptions = { x: 12, y: 0, w: 2, h: 3, minW: 2, maxW: 5 };

  let defaultWidth = 0;
  callClientSide(() => {
    defaultWidth = window.innerWidth;
  });

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
          <div data-grid={defaultGridOptions} key={windows.BOOKMARKS}>
            <WindowContainer type={windows.BOOKMARKS} />
          </div>
        ) : null}
        {settingsIsActive ? (
          <div data-grid={defaultGridOptions} key={windows.SETTINGS}>
            <WindowContainer type={windows.SETTINGS} />
          </div>
        ) : null}
        {selectionsIsActive ? (
          <div data-grid={defaultGridOptions} key={windows.SELECTIONS}>
            <WindowContainer type={windows.SELECTIONS} />
          </div>
        ) : null}
      </GridLayout>
    </WindowGridWrapper>
  );
};

export default WindowGrid;

const WindowGridWrapper = styled.section`
  height: calc(100% - 45px);
  overflow: hidden;

  .react-grid-item.react-grid-placeholder {
    background: ${(props) => props.theme.primaryColor};
    opacity: 0.2;
    transition-duration: 100ms;
    z-index: 2;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
  }

  .react-grid-item > .react-resizable-handle::after {
    border-color: ${(props) => props.theme.primaryColor};
    box-shadow: 2px 2px 1px 0px ${(props) => props.theme.primaryBackgroundColor};
    right: 5px;
    bottom: 7px; 
  }

  .react-grid-layout {
    height: 100% !important;
  }
  .react-grid-item {
    pointer-events: auto;
  }
`;
