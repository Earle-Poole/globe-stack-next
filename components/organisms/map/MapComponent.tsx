import { useCallback, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Loader } from '@googlemaps/js-api-loader'
import backgroundImage from '@/assets/low-poly-tile.png'
import useMapStore from './mapStore'
import { ThemeOption } from '../ui-overlay/uiStore'
import { theme } from '@/templates/home/Home'

const OVERVIEW_DIFFERENCE = 5
const OVERVIEW_MIN_ZOOM = 1
const OVERVIEW_MAX_ZOOM = 10

const restrictionBounds = {
  latLngBounds: {
    north: 85,
    south: -85,
    east: 180,
    west: -180,
  },
  strictBounds: true,
}

const mapOptions = {
  center: { lat: 44.967243, lng: -103.771556 },
  zoom: 4,
  disableDefaultUI: true,
  fullscreenControl: false,
  mapTypeControl: false,
  streetViewControl: false,
  zoomControl: false,
}

const Map = () => {
  const setGoogleMap = useMapStore((store) => store.setGoogleMap)
  const setOverviewRectangle = useMapStore(
    (store) => store.setOverviewRectangle
  )
  const mapRef = useRef<HTMLDivElement>(null!)
  const overviewMapRef = useRef<HTMLDivElement>(null!)
  const primaryMapRef = useRef<google.maps.Map>(null!)
  const secondaryMapRef = useRef<google.maps.Map>(null!)
  const overviewRectangleRef = useRef<google.maps.Rectangle>(null!)

  const renderPrimaryMap = useCallback(
    () =>
      new window.google.maps.Map(mapRef.current, {
        ...mapOptions,
        restriction: restrictionBounds,
      }),
    []
  )

  const renderSecondaryMap = useCallback(
    () =>
      new window.google.maps.Map(overviewMapRef.current, {
        ...mapOptions,
        gestureHandling: 'none',
        zoomControl: false,
        draggableCursor: 'default',
      }),
    []
  )

  const clamp = (num: number, min: number, max: number) => {
    return Math.min(Math.max(num, min), max)
  }

  const initPrimarySecondaryMaps = useCallback(() => {
    const primaryMap: google.maps.Map = renderPrimaryMap()
    const secondaryMap: google.maps.Map = renderSecondaryMap()

    primaryMapRef.current = primaryMap
    secondaryMapRef.current = secondaryMap

    const localStorageTheme = localStorage.getItem('theme') as ThemeOption | null

    const rectangleOptions: google.maps.RectangleOptions = {
      draggable: true,
      fillOpacity: 0.35,
      fillColor: localStorageTheme ? theme[localStorageTheme].primaryColor : theme.dark.primaryColor,
      map: secondaryMapRef.current,
      strokeOpacity: 0,
      strokeWeight: 0,
    }

    const localStorageBasemap = localStorage.getItem('basemap')

    if (localStorageBasemap) {
      primaryMap.setOptions(JSON.parse(localStorageBasemap))
      secondaryMap.setOptions(JSON.parse(localStorageBasemap))
    }

    const overviewRectangle = new window.google.maps.Rectangle(rectangleOptions)

    overviewRectangleRef.current = overviewRectangle

    primaryMap.addListener('bounds_changed', () => {
      secondaryMap.setCenter(primaryMap.getCenter()!)
      secondaryMap.setZoom(
        clamp(
          primaryMap.getZoom()! - OVERVIEW_DIFFERENCE,
          OVERVIEW_MIN_ZOOM,
          OVERVIEW_MAX_ZOOM
        )
      )
      overviewRectangle.setOptions({
        bounds: primaryMap.getBounds(),
      })
    })

    const overviewRectOnDrag = () => {
      primaryMap.setCenter(overviewRectangle.getBounds()?.getCenter()!)
    }

    overviewRectangle.addListener('dragend', overviewRectOnDrag)

    setGoogleMap('primary', primaryMap)
    setGoogleMap('secondary', secondaryMap)
    setOverviewRectangle(overviewRectangle)

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLatLng = new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        )
        primaryMap.setCenter(userLatLng)
        primaryMap.setZoom(9)
      })
    }

    return () => {
      overviewRectangle.setMap(null)
    }
  }, [renderPrimaryMap, renderSecondaryMap, setGoogleMap, setOverviewRectangle])

  useEffect(() => {
    const loader = new Loader({
      apiKey: `${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`,
      version: 'weekly',
    })

    loader.load().then(initPrimarySecondaryMaps)
  }, [initPrimarySecondaryMaps])

  return (
    <>
      <MapWrapper id='map' ref={mapRef} />
      <OverviewMapWrapper id='overviewMap' ref={overviewMapRef} />
    </>
  )
}

const MapWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background-repeat: no-repeat;
  background-size: cover;
  background: url(${backgroundImage.src}) #222222 !important;

  & > div {
    background-repeat: no-repeat;
    background-size: cover;
    background: url(${backgroundImage.src}) #222222 !important;
  }
`

const OverviewMapWrapper = styled.div`
  position: absolute;
  border: 2px solid #000000;
  box-shadow: -2px -2px 5px #00000099;
  border-bottom: unset;
  border-right: unset;
  height: 200px;
  width: 300px;
  bottom: 0;
  right: 0;

  background-repeat: no-repeat;
  background-size: contain;
  background: url(${backgroundImage.src}) #222222 !important;

  & > div {
    background-repeat: no-repeat;
    background-size: contain;
  background: url(${backgroundImage.src}) #222222 !important;

  }
`

export default Map
