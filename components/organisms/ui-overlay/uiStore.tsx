import produce from 'immer'
import create from 'zustand'

const initialState = {
  leftPanelExpanded: false,
  hoveredCoords: { lat: 0, lng: 0 },
  topMenuButtons: {
    bookmarks: { isActive: false },
    selections: { isActive: false },
    settings: { isActive: false },
  },
  theme: 'dark' as ThemeOption,
  uom: 'mi' as UOMOption,
}

const useUIStore = create<UIStore>((set, get) => ({
  ...initialState,
  setLeftPanel: (expanded) =>
    set({
      leftPanelExpanded: expanded,
    }),
  setHoveredCoords: (latLng) =>
    set({
      hoveredCoords: latLng,
    }),
  setTopMenuButton: (type, menuButtonObj) =>
    set(
      produce((state) => {
        state.topMenuButtons[type] = menuButtonObj
      })
    ),
  setTheme: (theme: ThemeOption) =>
    set({
      theme,
    }),
  setUOM: (uom: UOMOption) =>
    set({
      uom,
    }),
}))

export default useUIStore

interface UIStore {
  leftPanelExpanded: boolean
  hoveredCoords: google.maps.LatLngLiteral
  theme: ThemeOption
  uom: UOMOption
  setLeftPanel: (expanded: boolean) => void
  setHoveredCoords: (coords: google.maps.LatLngLiteral) => void
  topMenuButtons: {
    bookmarks: { isActive: boolean }
    selections: { isActive: boolean }
    settings: { isActive: boolean }
  }
  setTheme: (theme: ThemeOption) => void
  setTopMenuButton: (
    type: MenuButtonTypes,
    menuButtonObj: MenuButtonObj
  ) => void
  setUOM: (uom: UOMOption) => void
}

export type UOMOption = 'km' | 'mi'
export type ThemeOption = 'light' | 'dark'

interface MenuButtonObj {
  isActive: boolean
}

export type MenuButtonTypes = 'selections' | 'bookmarks' | 'settings'
