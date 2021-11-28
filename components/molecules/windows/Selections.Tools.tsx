import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import useMapStore from '@/organisms/map/mapStore';
import { theme } from '@/components/templates/home/Home';
import useUIStore from '@/components/organisms/ui-overlay/uiStore';
import { useConvertMetersToKmOrMi } from '@/utils/tacklebox';

export const Polyline = () => {
  const [length, setLength] = useState(0);
  const primaryMap = useMapStore((store) => store.primaryGoogleMap)!;
  const polyline = useRef(new google.maps.Polyline());
  const currentTheme = useUIStore((store) => store.theme);
  const uom = useUIStore((store) => store.uom);

  polyline.current.setOptions({
    strokeColor: theme[currentTheme].primaryColor,
    strokeOpacity: 1.0,
    strokeWeight: 3,
    draggable: true,
    editable: true,
  });

  const mouseDownHandler = useCallback(
    (e: google.maps.MapMouseEvent) => {
      polyline.current.getPath().push(e.latLng);

      const computedLength = google.maps.geometry.spherical.computeLength(
        polyline.current.getPath()
      );

      if (computedLength > length) {
        setLength(computedLength);
      }
    },
    [length]
  );

  // add event listener for the primary functionality of the Polyline
  useEffect(() => {
    const currentPolyline = polyline.current;
    let mouseDownListener: google.maps.MapsEventListener | undefined;
    mouseDownListener = primaryMap.addListener('mousedown', mouseDownHandler);
    currentPolyline.setMap(primaryMap);

    return () => {
      currentPolyline.setMap(null);
      mouseDownListener && google.maps.event.removeListener(mouseDownListener);
    };
  }, [mouseDownHandler, primaryMap]);

  useEffect(() => {
    const currentPolyline = polyline.current;
    const updateLength = () => {
      setLength(google.maps.geometry.spherical.computeLength(currentPolyline.getPath()));
    };
    const insertAt = google.maps.event.addListener(
      currentPolyline.getPath(),
      'insert_at',
      updateLength
    );
    const removeAt = google.maps.event.addListener(
      currentPolyline.getPath(),
      'remove_at',
      updateLength
    );
    const setAt = google.maps.event.addListener(currentPolyline.getPath(), 'set_at', updateLength);

    return () => {
      google.maps.event.removeListener(insertAt);
      google.maps.event.removeListener(removeAt);
      google.maps.event.removeListener(setAt);
    };
  }, []);

  const formattedLength = useConvertMetersToKmOrMi(length);

  return (
    <SelectedToolWrapper>
      <SelectedToolHeader>Polyline</SelectedToolHeader>
      <SelectedToolBody>
        <StatWrapper>
          <StatLabel>Length</StatLabel>
          <StatValue>{`${formattedLength.toLocaleString(undefined, {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })} ${uom}`}</StatValue>
        </StatWrapper>
      </SelectedToolBody>
    </SelectedToolWrapper>
  );
};
export const Polygon = () => {
  const [area, setArea] = useState(0);
  const [center, setCenter] = useState(new google.maps.LatLng(0, 0));
  const primaryMap = useMapStore((store) => store.primaryGoogleMap)!;
  const polygon = useRef(new google.maps.Polygon());
  const currentTheme = useUIStore((store) => store.theme);
  const uom = useUIStore((store) => store.uom);

  polygon.current.setOptions({
    strokeColor: theme[currentTheme].primaryColor,
    strokeOpacity: 1.0,
    strokeWeight: 3,
    geodesic: true,
    draggable: true,
    editable: true,
  });

  const mouseDownHandler = useCallback((e) => {
    const path: google.maps.MVCArray<google.maps.LatLng> = polygon.current.getPath();
    path.push(e.latLng);

    const bounds = new google.maps.LatLngBounds();
    path.forEach((latLng) => {
      bounds.extend(latLng);
    });

    setArea(google.maps.geometry.spherical.computeArea(path));
    setCenter(bounds.getCenter());
  }, []);

  const handleEdit = () => {
    const editPath: google.maps.MVCArray<google.maps.LatLng> = polygon.current.getPath();
    const bounds = new google.maps.LatLngBounds();
    editPath.forEach((latLng) => {
      bounds.extend(latLng);
    });

    setArea(google.maps.geometry.spherical.computeArea(editPath));
    setCenter(bounds.getCenter());
  };

  // add event listener for the primary functionality of the Polygon
  useEffect(() => {
    const currentPolygon = polygon.current;
    let mouseDownListener: google.maps.MapsEventListener | undefined;
    mouseDownListener = primaryMap.addListener('mousedown', mouseDownHandler);
    currentPolygon.setMap(primaryMap);

    const path: google.maps.MVCArray<google.maps.LatLng> = polygon.current.getPath();
    const bounds = new google.maps.LatLngBounds();

    const insertAt = google.maps.event.addListener(path, 'insert_at', handleEdit);
    const setAt = google.maps.event.addListener(path, 'set_at', handleEdit);
    const removeAt = google.maps.event.addListener(path, 'remove_at', handleEdit);

    path.forEach((latLng) => {
      bounds.extend(latLng);
    });

    return () => {
      currentPolygon.setMap(null);
      google.maps.event.removeListener(insertAt);
      google.maps.event.removeListener(setAt);
      google.maps.event.removeListener(removeAt);
      mouseDownListener && google.maps.event.removeListener(mouseDownListener);
    };
  }, [mouseDownHandler, primaryMap]);

  const formattedArea = useConvertMetersToKmOrMi(area);

  return (
    <SelectedToolWrapper>
      <SelectedToolHeader>Polygon</SelectedToolHeader>
      <SelectedToolBody>
        <StatWrapper>
          <StatLabel>Area</StatLabel>
          <StatValue>{`${Math.sqrt(formattedArea).toLocaleString('en', {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })} ${uom}²`}</StatValue>
        </StatWrapper>
        <StatWrapper>
          <StatLabel>Center</StatLabel>
          <StatValue>{`${center.lat().toLocaleString('en', {
            maximumFractionDigits: 5,
            minimumFractionDigits: 5,
          })}, ${center.lng().toLocaleString('en', {
            maximumFractionDigits: 5,
            minimumFractionDigits: 5,
          })}`}</StatValue>
        </StatWrapper>
      </SelectedToolBody>
    </SelectedToolWrapper>
  );
};
export const Rectangle = () => {
  const [firstCorner, setFirstCorner] = useState<google.maps.LatLng | null>(null);
  const [secondCorner, setSecondCorner] = useState<google.maps.LatLng | null>(null);
  const [area, setArea] = useState(0);
  const [center, setCenter] = useState(new google.maps.LatLng(0, 0));
  const uom = useUIStore((store) => store.uom);
  const primaryMap = useMapStore((store) => store.primaryGoogleMap)!;
  const currentTheme = useUIStore((store) => store.theme);

  const rectangle = useRef(new google.maps.Rectangle());

  rectangle.current.setOptions({
    strokeColor: theme[currentTheme].primaryColor,
    strokeOpacity: 1.0,
    strokeWeight: 3,
    draggable: true,
    editable: true,
  });

  // useUpdatePolygonColor(rectangle.current)

  const mouseDownHandler = useCallback(
    (e: google.maps.MapMouseEvent) => {
      if (firstCorner === null) {
        setFirstCorner(e.latLng);
        setSecondCorner(e.latLng);
      }

      if (firstCorner !== null) {
        setSecondCorner(e.latLng);
        primaryMap.setOptions({
          draggable: true,
        });
      }
    },
    [firstCorner, primaryMap]
  );

  useEffect(() => {
    if (firstCorner && secondCorner) {
      const bounds = new google.maps.LatLngBounds();
      bounds.extend(firstCorner);
      bounds.extend(secondCorner);
      rectangle.current.setBounds(bounds);

      const ne = rectangle.current.getBounds()?.getNorthEast()!;
      const sw = rectangle.current.getBounds()?.getSouthWest()!;

      const path = [
        ne,
        new google.maps.LatLng(ne!.lat(), sw!.lng()),
        sw,
        new google.maps.LatLng(sw!.lat(), ne!.lng()),
        ne,
      ];

      setArea(google.maps.geometry.spherical.computeArea(path));
      setCenter(bounds.getCenter());
    }
  }, [firstCorner, secondCorner]);

  const handleEdit = (path: google.maps.LatLng[]) => () => {
    console.log('hit');
    console.log(path);
    const bounds = new google.maps.LatLngBounds();

    path.forEach((latLng) => {
      bounds.extend(latLng);
    });

    console.log(google.maps.geometry.spherical.computeArea(path));

    setArea(google.maps.geometry.spherical.computeArea(path));
    setCenter(bounds.getCenter());
  };

  useEffect(() => {
    const currentRectangle = rectangle.current;

    const mouseDownListener = primaryMap.addListener('mousedown', mouseDownHandler);
    currentRectangle.setMap(primaryMap);

    const ne = rectangle.current.getBounds()?.getNorthEast()!;
    const sw = rectangle.current.getBounds()?.getSouthWest()!;

    let boundsChanged: google.maps.MapsEventListener;

    if (ne && sw) {
      const path = [
        ne,
        new google.maps.LatLng(ne!.lat(), sw!.lng()),
        sw,
        new google.maps.LatLng(sw!.lat(), ne!.lng()),
        ne,
      ];
      const bounds = new google.maps.LatLngBounds();

      boundsChanged = currentRectangle.addListener('bounds_changed', handleEdit(path));

      path.forEach((latLng) => {
        bounds.extend(latLng);
      });
    }

    return () => {
      currentRectangle.setMap(null);
      google.maps.event.removeListener(boundsChanged);
      google.maps.event.removeListener(mouseDownListener);
    };
  }, [mouseDownHandler, primaryMap]);

  const formattedArea = useConvertMetersToKmOrMi(area);
  return (
    <SelectedToolWrapper>
      <SelectedToolHeader>Rectangle</SelectedToolHeader>
      <SelectedToolBody>
        <StatWrapper>
          <StatLabel>Area</StatLabel>
          <StatValue>{`${Math.sqrt(formattedArea).toLocaleString('en', {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })} ${uom}²`}</StatValue>
        </StatWrapper>
        <StatWrapper>
          <StatLabel>Center</StatLabel>
          <StatValue>{`${center.lat().toLocaleString('en', {
            maximumFractionDigits: 5,
            minimumFractionDigits: 5,
          })}, ${center.lng().toLocaleString('en', {
            maximumFractionDigits: 5,
            minimumFractionDigits: 5,
          })}`}</StatValue>
        </StatWrapper>
      </SelectedToolBody>
    </SelectedToolWrapper>
  );
};
export const Circle = () => {
  return (
    <SelectedToolWrapper>
      <SelectedToolHeader>Circle</SelectedToolHeader>
      <SelectedToolBody></SelectedToolBody>
    </SelectedToolWrapper>
  );
};

const SelectedToolWrapper = styled.div``;
const SelectedToolHeader = styled.h2`
  letter-spacing: 0.2rem;
  border-bottom: 1px dashed ${(props) => props.theme.primaryTextColor};
`;
const SelectedToolBody = styled.div``;
const StatWrapper = styled.div`
  padding: 0.1rem;
`;
const StatLabel = styled.div``;
const StatValue = styled.div``;
