import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import useMapStore from '@/organisms/map/mapStore'

export const Polyline = () => {
  const primaryMap = useMapStore((store) => store.primaryGoogleMap)
  const polyline = useRef(new google.maps.Polyline())

  useEffect(() => {
    const mouseDownHandler = () => {
      console.log('mouse down')
    }
    const clickHandler = () => {
      console.log('click')
    }
    const currentPolyline = polyline.current
    let clickListener: google.maps.MapsEventListener | undefined
    let mouseDownListener: google.maps.MapsEventListener | undefined
    if (primaryMap) {
      currentPolyline.setMap(primaryMap)
      mouseDownListener = primaryMap.addListener('mousedown', mouseDownHandler)
      clickListener = primaryMap.addListener('click', clickHandler)
    }

    return () => {
      if (primaryMap) {
        currentPolyline.setMap(null)
        mouseDownListener && google.maps.event.removeListener(mouseDownListener)
        clickListener && google.maps.event.removeListener(clickListener)
      }
    }
  }, [primaryMap])

  return (
    <SelectedToolWrapper>
      <SelectedToolHeader>Polyline</SelectedToolHeader>
      <SelectedToolBody></SelectedToolBody>
    </SelectedToolWrapper>
  )
}
export const Polygon = () => {
  return (
    <SelectedToolWrapper>
      <SelectedToolHeader>Polygon</SelectedToolHeader>
      <SelectedToolBody></SelectedToolBody>
    </SelectedToolWrapper>
  )
}
export const Rectangle = () => {
  return (
    <SelectedToolWrapper>
      <SelectedToolHeader>Rectangle</SelectedToolHeader>
      <SelectedToolBody></SelectedToolBody>
    </SelectedToolWrapper>
  )
}
export const Circle = () => {
  return (
    <SelectedToolWrapper>
      <SelectedToolHeader>Circle</SelectedToolHeader>
      <SelectedToolBody></SelectedToolBody>
    </SelectedToolWrapper>
  )
}

const SelectedToolWrapper = styled.div``
const SelectedToolHeader = styled.div``
const SelectedToolBody = styled.div``
