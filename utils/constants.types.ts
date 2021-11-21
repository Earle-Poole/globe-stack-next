export type ToolsObj = {
  CIRCLE: 'circle'
  RECTANGLE: 'rectangle'
  POLYGON: 'polygon'
  POLYLINE: 'polyline'
}

export type ToolKeys = keyof ToolsObj
export type ToolValues = ToolsObj[ToolKeys]


export type WindowsObj = {
  BOOKMARKS: 'bookmarks'
  SETTINGS: 'settings'
  SELECTIONS: 'selections'
}

export type WindowKeys = keyof WindowsObj
export type WindowValues = WindowsObj[WindowKeys]