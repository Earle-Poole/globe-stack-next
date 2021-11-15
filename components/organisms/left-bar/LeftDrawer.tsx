import React, { useState } from 'react';
import styled from 'styled-components';
import { throttle } from '../../../utils/fn';

let dragImg: HTMLImageElement;
if (typeof window === 'object') {
  dragImg = new Image(0, 0);
  dragImg.src =
    // eslint-disable-next-line max-len
    'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
}
const LeftDrawer = () => {
  const [leftDrawerWidth, setLeftDrawerWidth] = useState(250);

  const onDragHandler = throttle((e: React.DragEvent) => {
    if (e.pageX > 0) {
      const diff = e.pageX - leftDrawerWidth;
      if (!diff) {
        return;
      }
      if (Math.abs(diff) < 150) {
        setLeftDrawerWidth(e.pageX + 10);
      } else {
        diff > 0
          ? setLeftDrawerWidth(leftDrawerWidth + 150)
          : setLeftDrawerWidth(leftDrawerWidth - 150);
      }
    }
  }, 10);

  const onDragStartHandler = (e: React.DragEvent) => {
    if (dragImg) {
      e.dataTransfer.setDragImage(dragImg, 0, 0);
    }
  };

  return (
    <LeftDrawerWrapper width={leftDrawerWidth}>
      <ResizeHandle draggable onDrag={onDragHandler} onDragStart={onDragStartHandler}>
        <span>≡≡≡≡</span>
      </ResizeHandle>
    </LeftDrawerWrapper>
  );
};

interface LeftDrawerWrapperProps {
  width: number;
}
const LeftDrawerWrapper = styled.div<LeftDrawerWrapperProps>`
  background: ${(props) => props.theme.secondaryBackgroundColor};
  left: 0;
  top: 0;
  bottom: 0;
  min-width: fit-content;
  pointer-events: auto;
  width: ${(props) => props.width}px;
`;

const ResizeHandle = styled.div`
  position: absolute;
  pointer-events: auto;
  right: 30px;
  top: 0;
  bottom: 0;
  width: 20px;
  background: #dddddd88;
  cursor: grab;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    transform: rotate(-90deg);
    line-height: 0;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: -3.1px;
    position: relative;
    right: 2px;
  }
`;

export default LeftDrawer;
