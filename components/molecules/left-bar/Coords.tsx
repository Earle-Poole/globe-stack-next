import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom';
import useMapStore from '@/organisms/map/mapStore';
import { copyToClipboard, throttle } from '@/utils/fn';
import useUIStore from '@/organisms/ui-overlay/uiStore';

interface CoordsCopierProps {
  disableCoordsCopy: () => void;
}
const CoordsCopier = (props: CoordsCopierProps) => {
  const [location, setLocation] = useState({ x: 0, y: 0, lat: 0, lng: 0 });
  const primaryMap = useMapStore((store) => store.primaryGoogleMap);
  const tooltipWrapperRef = useRef<HTMLInputElement>(null!);
  const mouseMoveHandler = useRef(
    throttle((e: any) => {
      setLocation({
        x:
          e.pixel.x - (tooltipWrapperRef.current.offsetWidth / 2 + 5) < 0
            ? 5
            : e.pixel.x + (tooltipWrapperRef.current.offsetWidth / 2 + 5) > window.innerWidth
            ? window.innerWidth - (tooltipWrapperRef.current.offsetWidth + 5)
            : e.pixel.x - tooltipWrapperRef.current.offsetWidth / 2,
        y: e.pixel.y > window.innerHeight - 105 ? e.pixel.y - 85 : e.pixel.y + 25,
        ...e.latLng.toJSON(),
      });
    }, 10)
  );

  useEffect(() => {
    if (primaryMap) {
      const mouseMoveHandlerRef = mouseMoveHandler.current;
      const clickHandler = (e: any) => {
        copyToClipboard(e.latLng.toString());
        props.disableCoordsCopy();
      };
      const moveListener = primaryMap.addListener('mousemove', mouseMoveHandlerRef);
      const clickListener = primaryMap.addListener('click', clickHandler);
      return () => {
        google.maps.event.removeListener(moveListener);
        google.maps.event.removeListener(clickListener);
      };
    }
  }, [primaryMap, props]);

  useEffect(() => {
    tooltipWrapperRef.current.style.left = location.x.toString() + 'px';
    tooltipWrapperRef.current.style.top = location.y.toString() + 'px';
  }, [location]);

  return (
    <CoordsCopierTooltipWrapper ref={tooltipWrapperRef} location={location}>
      <span>Click to copy coordinates</span>
      <LatLngWrapper>
        <span>Lat: {location.lat.toFixed(8)}</span>
        <span>Lng: {location.lng.toFixed(8)}</span>
      </LatLngWrapper>
    </CoordsCopierTooltipWrapper>
  );
};

interface CoordsCopierTooltipWrapperProps {
  location: { x: number; y: number };
}
const CoordsCopierTooltipWrapper = styled.div<CoordsCopierTooltipWrapperProps>`
  align-items: center;
  background: ${(props) => props.theme.primaryBackgroundColor};
  border-radius: 6px;
  color: ${(props) => props.theme.fontColor};
  display: flex;
  flex-direction: column;
  pointer-events: none;
  position: absolute;
  padding: 5px;
`;

const LatLngWrapper = styled.div`
  display: flex;

  span {
    padding: 5px;
  }
`;

const Coords = () => {
  const hoveredCoords = useUIStore((store) => store.hoveredCoords);
  const setHoveredCoords = useUIStore((store) => store.setHoveredCoords);
  const primaryGoogleMap = useMapStore((store) => store.primaryGoogleMap);

  const [isCoordsCopyEnabled, setIsCoordsCopyEnabled] = useState(false);

  useEffect(() => {
    let listener: google.maps.MapsEventListener;
    if (primaryGoogleMap) {
      listener = primaryGoogleMap.addListener(
        'mousemove',
        throttle((e: any) => {
          setHoveredCoords(e.latLng.toJSON());
        }, 33.33)
      );
    }

    return () => {
      if (listener) {
        google.maps.event.removeListener(listener);
      }
    };
  }, [primaryGoogleMap, setHoveredCoords]);

  useEffect(() => {
    // this is the only element a cursor can be applied to so that the
    // user's cursor will actually change
    const element = document.querySelector(
      '#map > div > div > div:nth-child(2) > div:nth-child(2)'
    ) as HTMLDivElement;
    if (element) {
      if (isCoordsCopyEnabled) {
        element.style.cursor = 'crosshair';
      } else {
        element.style.cursor = '';
      }
    }
  }, [isCoordsCopyEnabled]);

  const crosshairsClickHandler = () => {
    setIsCoordsCopyEnabled(!isCoordsCopyEnabled);
  };
  return (
    <CoordsWrapper>
      <i className='fas fa-crosshairs' onClick={crosshairsClickHandler}></i>
      <LatitudeWrapper>
        <span>Lat: </span>
        <span>{hoveredCoords.lat.toFixed(5)}</span>
      </LatitudeWrapper>
      <LongitudeWrapper>
        <span>Lng: </span>
        <span>{hoveredCoords.lng.toFixed(5)}</span>
      </LongitudeWrapper>
      {isCoordsCopyEnabled
        ? ReactDOM.createPortal(
            <CoordsCopier
              disableCoordsCopy={() => {
                setIsCoordsCopyEnabled(false);
              }}
            />,
            document.getElementById('__next')!
          )
        : null}
    </CoordsWrapper>
  );
};

const CoordsWrapper = styled.div`
  position: absolute;
  pointer-events: auto;
  display: flex;
  align-items: center;
  background: ${(props) => props.theme.primaryBackgroundColor};
  height: 25px;
  justify-content: space-evenly;
  width: 200px;
  white-space: nowrap;
  font-size: 14px;
  color: ${(props) => props.theme.fontColor};
  bottom: 0;
  border-radius: 0 6px 0 0;

  i {
    font-weight: 300;
    margin: auto 3px;
    cursor: pointer;
  }
`;

const LatitudeWrapper = styled.div`
  font-size: 11px;
  margin: 0 5px 0 0;
  min-width: 75px;
  max-width: 75px;
`;
const LongitudeWrapper = styled(LatitudeWrapper)``;

export default Coords;
