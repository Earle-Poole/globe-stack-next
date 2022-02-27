import styled from 'styled-components'
import midnightBasemap from '@/static/midnight-basemap.png'
import midnightLowBasemap from '@/static/midnight-low-basemap.png'
import daybreakBasemap from '@/static/daybreak-basemap.png'
import daybreakLowBasemap from '@/static/daybreak-low-basemap.png'
import satelliteBasemap from '@/static/satellite-basemap.png'
import googleMapsBasemap from '@/static/google-maps-basemap.png'
import mapStyles from '@/components/organisms/map/mapStyleConstants'
import useUIStore, { ThemeOption } from '@/organisms/ui-overlay/uiStore'
import Image from 'next/image'
import Toggle, { ToggleWrapper } from '@/atoms/toggle/Toggle'
import { theme } from '@/templates/home/Home'
import useMapStore from '@/organisms/map/mapStore'
import { ChangeEventHandler } from 'react'

const Settings = () => {
  const primaryMap = useMapStore((store) => store.primaryGoogleMap)
  const secondaryMap = useMapStore((store) => store.secondaryGoogleMap)
  const overviewRectangle = useMapStore((store) => store.overviewRectangle)
  const selectedTheme = useUIStore((store) => store.theme)
  const setTheme = useUIStore((store) => store.setTheme)
  const onThemeButtonClick = (themeOption: ThemeOption) => () => {
    setTheme(themeOption)
    overviewRectangle?.setOptions({
      fillColor: theme[themeOption].primaryColor,
    })
    localStorage.setItem('theme', themeOption)
  }
  const setUOM = useUIStore((store) => store.setUOM)

  const onUOMToggle: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUOM(e.target.checked ? 'km' : 'mi')
  }
  const onBasemapButtonClick = (buttonName: string) => () => {
    const options: {
      mapTypeId: string
      styles: google.maps.MapTypeStyle[] | undefined
    } = {
      mapTypeId: '',
      styles: undefined,
    }

    switch (buttonName) {
      case 'Midnight':
        localStorage.setItem(
          'basemap',
          JSON.stringify({
            mapTypeId: 'roadmap',
            styles: mapStyles.midnightcommander,
          })
        )
        options.mapTypeId = 'roadmap'
        options.styles = mapStyles.midnightcommander
        break
      case 'MidnightLow':
        localStorage.setItem(
          'basemap',
          JSON.stringify({
            mapTypeId: 'roadmap',
            styles: mapStyles.minimalMidnight,
          })
        )
        options.mapTypeId = 'roadmap'
        options.styles = mapStyles.minimalMidnight
        break
      case 'Satellite':
        localStorage.setItem(
          'basemap',
          JSON.stringify({
            mapTypeId: 'satellite',
            styles: undefined,
          })
        )
        options.mapTypeId = 'satellite'
        options.styles = undefined
        break
      case 'Daybreak':
        localStorage.setItem(
          'basemap',
          JSON.stringify({
            mapTypeId: 'roadmap',
            styles: mapStyles.wy,
          })
        )
        options.mapTypeId = 'roadmap'
        options.styles = mapStyles.wy
        break
      case 'DaybreakLow':
        localStorage.setItem(
          'basemap',
          JSON.stringify({
            mapTypeId: 'roadmap',
            styles: mapStyles.minimal,
          })
        )
        options.mapTypeId = 'roadmap'
        options.styles = mapStyles.minimal
        break
      case 'Google Maps':
        localStorage.setItem(
          'basemap',
          JSON.stringify({
            mapTypeId: 'roadmap',
            styles: undefined,
          })
        )
        options.mapTypeId = 'roadmap'
        options.styles = undefined
        break
    }
    primaryMap?.setOptions(options)
    secondaryMap?.setOptions(options)
  }

  const themeIsSelected = (theme: ThemeOption) => {
    return selectedTheme === theme
  }

  return (
    <SettingsWrapper>
      <MapThemeWrapper>
        <SectionHeader>Basemap Settings</SectionHeader>
        <SectionBody>
          <ButtonWrapper onClick={onBasemapButtonClick('Midnight')}>
            <IconWrapper>
              <Image height='50' width='95' src={midnightBasemap} alt='' />
            </IconWrapper>
            Midnight
          </ButtonWrapper>
          <ButtonWrapper onClick={onBasemapButtonClick('MidnightLow')}>
            <IconWrapper>
              <Image height='50' width='95' src={midnightLowBasemap} alt='' />
            </IconWrapper>
            Midnight
            <br />
            Low Detail
          </ButtonWrapper>
          <ButtonWrapper onClick={onBasemapButtonClick('Satellite')}>
            <IconWrapper>
              <Image height='50' width='95' src={satelliteBasemap} alt='' />
            </IconWrapper>
            Satellite
          </ButtonWrapper>
          <ButtonWrapper onClick={onBasemapButtonClick('Daybreak')}>
            <IconWrapper>
              <Image height='50' width='95' src={daybreakBasemap} alt='' />
            </IconWrapper>
            Daybreak
          </ButtonWrapper>
          <ButtonWrapper onClick={onBasemapButtonClick('DaybreakLow')}>
            <IconWrapper>
              <Image height='50' width='95' src={daybreakLowBasemap} alt='' />
            </IconWrapper>
            Daybreak
            <br />
            Low Detail
          </ButtonWrapper>
          <ButtonWrapper onClick={onBasemapButtonClick('Google Maps')}>
            <IconWrapper>
              <Image height='50' width='95' src={googleMapsBasemap} alt='' />
            </IconWrapper>
            Google Maps
          </ButtonWrapper>
        </SectionBody>
      </MapThemeWrapper>
      <UIThemeWrapper>
        <SectionHeader>UI Theme Settings</SectionHeader>
        <SectionBody>
          <LightThemeButtonWrapper
            isSelected={themeIsSelected('light')}
            onClick={onThemeButtonClick('light')}>
            <IconWrapper />
            Light
          </LightThemeButtonWrapper>
          <DarkThemeButtonWrapper
            isSelected={themeIsSelected('dark')}
            onClick={onThemeButtonClick('dark')}>
            <IconWrapper />
            Dark
          </DarkThemeButtonWrapper>
        </SectionBody>
      </UIThemeWrapper>
      <MapSettingsWrapper>
        <SectionHeader>Map Config Settings</SectionHeader>
        <SectionBody>
          <ToggleWithTextWrapper>
            <span>MI</span>
            <Toggle size={45} onChange={onUOMToggle} />
            <span>KM</span>
          </ToggleWithTextWrapper>
        </SectionBody>
      </MapSettingsWrapper>
    </SettingsWrapper>
  )
}

export default Settings

const SettingsWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: ${(props) => props.theme.fontColor};
`
const SectionHeader = styled.div`
  font-size: 14px;
  margin: 0 0 10px;
  font-weight: 600;
`
const SectionBody = styled.div`
  display: flex;
  justify-content: space-evenly;
  font-size: 12px;
  flex-wrap: wrap;
`
const ToggleWithTextWrapper = styled.div`
  display: flex;
  ${ToggleWrapper} {
    padding: 0 5px;
  }
`
interface ButtonWrapperProps {
  isSelected?: boolean
}
const ButtonWrapper = styled.div<ButtonWrapperProps>`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 10px 15px;
  border-radius: 6px;
  min-height: 70px;
  min-width: 75px;
  overflow: hidden;
  cursor: pointer;
  ${(props) =>
    props.isSelected ? `box-shadow: ${props.theme.insetBoxShadow}` : ''};
`

const IconWrapper = styled.div`
  height: 50px;
  width: 95px;

  img {
    border-radius: 6px;
  }
`

const LightThemeButtonWrapper = styled(ButtonWrapper)`
  ${IconWrapper} {
    background: white;
    border-radius: 6px;
  }
`
const DarkThemeButtonWrapper = styled(ButtonWrapper)`
  ${IconWrapper} {
    background: black;
    border-radius: 6px;
  }
`

const UIThemeWrapper = styled.div``

const MapThemeWrapper = styled.div``

const MapSettingsWrapper = styled.div``
