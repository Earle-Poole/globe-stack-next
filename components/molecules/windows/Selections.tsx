import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import useMapStore from '@/organisms/map/mapStore'
import { Polyline, Polygon, Rectangle, Circle } from './Selections.Tools'
import { tools } from '@/utils/constants'
import { ToolValues } from '@/utils/constants.types'

const Selections = () => {
  const [selectedTool, setSelectedTool] = useState<ToolValues | null>(null)
  const primaryMap = useMapStore((store) => store.primaryGoogleMap)

  useEffect(() => {
    if (selectedTool && primaryMap) {
      primaryMap.setOptions({
        draggable: false,
      })
      return
    }

    if (primaryMap) {
      primaryMap.setOptions({
        draggable: true,
      })
    }
  }, [primaryMap, selectedTool])

  const onToolClickHandler = (tool: ToolValues | null) => () => {
    if (tool === selectedTool) {
      setSelectedTool(null)
      return
    }

    setSelectedTool(tool)
  }

  const SelectedTool = () => {
    switch (selectedTool) {
      case tools.CIRCLE:
        return <Circle />
      case tools.POLYGON:
        return <Polygon />
      case tools.POLYLINE:
        return <Polyline />
      case tools.RECTANGLE:
        return <Rectangle />
      default:
        return null
    }
  }
  return (
    <SelectionsWrapper>
      <ToolSelectionWrapper>
        <PolylineButton
          isSelected={selectedTool === tools.POLYLINE}
          onClick={onToolClickHandler(tools.POLYLINE)}>
          <i className='fal fa-route'></i>
          <span>Polyline</span>
        </PolylineButton>
        <PolygonButton
          isSelected={selectedTool === tools.POLYGON}
          onClick={onToolClickHandler(tools.POLYGON)}>
          <i className='fal fa-draw-polygon'></i>
          <span>Polygon</span>
        </PolygonButton>
        <RectangleButton
          isSelected={selectedTool === tools.RECTANGLE}
          onClick={onToolClickHandler(tools.RECTANGLE)}>
          <i className='fal fa-draw-square'></i>
          <span>Rectangle</span>
        </RectangleButton>
        <CircleButton
          isSelected={selectedTool === tools.CIRCLE}
          onClick={onToolClickHandler(tools.CIRCLE)}>
          <i className='fal fa-draw-circle'></i>
          <span>Circle</span>
        </CircleButton>
      </ToolSelectionWrapper>
      <SelectedToolSection>
        {selectedTool ? <SelectedTool /> : null}
      </SelectedToolSection>
    </SelectionsWrapper>
  )
}

export default React.memo(Selections)

const SelectionsWrapper = styled.div`
  height: 100%;
`

const ToolSelectionWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

interface ButtonWrapperProps {
  isSelected: boolean
}
const ButtonWrapper = styled.div<ButtonWrapperProps>`
  align-items: center;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin: 10px;
  width: 65px;
  ${(props) =>
    props.isSelected
      ? `
    box-shadow: ${props.theme.insetBoxShadow};
    `
      : ''}
  i {
    font-size: 32px;
    margin-bottom: 5px;
    ${(props) =>
      props.isSelected
        ? `
    color: ${props.theme.primaryColor};
    `
        : ''}
  }

  span {
    font-size: 12px;
  }
`

const PolylineButton = styled(ButtonWrapper)``
const PolygonButton = styled(ButtonWrapper)``
const RectangleButton = styled(ButtonWrapper)``
const CircleButton = styled(ButtonWrapper)``

const SelectedToolSection = styled.div``
