import useUIStore from '@/components/organisms/ui-overlay/uiStore';
import { theme } from '@/components/templates/home/Home';
import { useEffect } from 'react';

const callClientSide = (fn: () => void) => {
  if (typeof window !== 'undefined') {
    fn();
  }
};

// accepts a number that represents meters. returns a that number converted to km or mi, based on useUIStore's uom
const useConvertMetersToKmOrMi = (meters: number) => {
  const uom = useUIStore((state) => state.uom);
  const conversion = uom === 'mi' ? 0.000621371 : 0.001;
  return meters * conversion;
};

type GoogleShape =
  | google.maps.Polygon
  | google.maps.Polyline
  | google.maps.Rectangle
  | google.maps.Circle;

const useUpdatePolygonColor = (polygon: GoogleShape) => {
  const currentTheme = useUIStore((state) => state.theme);

  useEffect(() => {
    if (polygon) {
      polygon.setOptions({
        strokeColor: theme[currentTheme].primaryColor,
      });
    }
  }, [currentTheme, polygon]);
};

export { callClientSide, useConvertMetersToKmOrMi, useUpdatePolygonColor };
