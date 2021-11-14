import create from 'zustand';

const initialState: MapState = {
  primaryGoogleMap: null,
  secondaryGoogleMap: null,
  overviewRectangle: null,
};

const useMapStore = create<MapStore>((set) => ({
  ...initialState,
  setGoogleMap: (type: 'primary' | 'secondary', googleMap: google.maps.Map) =>
    type === 'primary'
      ? set({
          primaryGoogleMap: googleMap,
        })
      : set({
          secondaryGoogleMap: googleMap,
        }),
  setOverviewRectangle: (rect: google.maps.Rectangle) =>
    set({
      overviewRectangle: rect,
    }),
}));

interface MapActions {
  setGoogleMap: (type: 'primary' | 'secondary', googleMap: google.maps.Map) => void;
  setOverviewRectangle: (rect: google.maps.Rectangle) => void;
}

interface MapState {
  primaryGoogleMap: google.maps.Map | null;
  secondaryGoogleMap: google.maps.Map | null;
  overviewRectangle: google.maps.Rectangle | null;
}

type MapStore = MapActions & MapState;

export default useMapStore;
