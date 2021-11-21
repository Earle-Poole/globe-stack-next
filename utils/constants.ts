import {
  ToolKeys,
  ToolValues,
  WindowKeys,
  WindowValues,
} from './constants.types'

export const tools: { [key in ToolKeys]: ToolValues } = {
  CIRCLE: 'circle',
  RECTANGLE: 'rectangle',
  POLYGON: 'polygon',
  POLYLINE: 'polyline',
}

export const windows: { [key in WindowKeys]: WindowValues } = {
  BOOKMARKS: 'bookmarks',
  SETTINGS: 'settings',
  SELECTIONS: 'selections',
}
