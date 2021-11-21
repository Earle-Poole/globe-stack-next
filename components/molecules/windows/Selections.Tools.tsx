import { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import useMapStore from '@/organisms/map/mapStore'
import { theme } from '@/components/templates/home/Home'
import useUIStore from '@/components/organisms/ui-overlay/uiStore'
import { useConvertMetersToKmOrMi } from '@/utils/tacklebox'

export const Polyline = () => {
  const [length, setLength] = useState(0)
  const primaryMap = useMapStore((store) => store.primaryGoogleMap)!
  const polyline = useRef(new google.maps.Polyline())
  const currentTheme = useUIStore((store) => store.theme)
  const uom = useUIStore((store) => store.uom)

  polyline.current.setOptions({
    strokeColor: theme[currentTheme].primaryColor,
    strokeOpacity: 1.0,
    strokeWeight: 3,
    draggable: true,
    editable: true,
  })

  const mouseDownHandler = useCallback(
    (e: google.maps.MapMouseEvent) => {
      polyline.current.getPath().push(e.latLng)

      const computedLength = google.maps.geometry.spherical.computeLength(
        polyline.current.getPath()
      )

      if (computedLength > length) {
        setLength(computedLength)
      }
    },
    [length]
  )

  useEffect(() => {
    const currentPolyline = polyline.current
    let mouseDownListener: google.maps.MapsEventListener | undefined
    currentPolyline.setMap(primaryMap)
    mouseDownListener = primaryMap.addListener('mousedown', mouseDownHandler)

    return () => {
      currentPolyline.setMap(null)
      mouseDownListener && google.maps.event.removeListener(mouseDownListener)
    }
  }, [mouseDownHandler, primaryMap])

  const formattedLength = useConvertMetersToKmOrMi(length)

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
const StatWrapper = styled.div``
const StatLabel = styled.div``
const StatValue = styled.div``
