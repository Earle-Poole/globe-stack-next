import styled from 'styled-components'
import midnightBasemap from '../../../assets/midnight-basemap.png'
import midnightLowBasemap from '../../../assets/midnight-low-basemap.png'
import daybreakBasemap from '../../../assets/daybreak-basemap.png'
import daybreakLowBasemap from '../../../assets/daybreak-low-basemap.png'
import satelliteBasemap from '../../../assets/satellite-basemap.png'
import googleMapsBasemap from '../../../assets/google-maps-basemap.png'
import mapStyles from '../map/mapStylesTemplates'
import useMapStore from '../map/mapStore'
import useUIStore, { ThemeOption } from '../../templates/ui-overlay/uiStore'
import { theme } from '../../../pages/_app'
import Image from 'next/image'
import Toggle, { ToggleWrapper } from '../../atoms/toggle/Toggle'

// const basemaps = [
//   {
//     name: 'Midnight',
//     theme: 'midnightcommander',
//     mapType: 'roadmap',
//   },
//   {
//     name: 'Midnight\nLow Detail',
//     theme: 'cleanermidnight',
//     mapType: 'roadmap',
//   },
//   {
//     name: 'Satellite',
//     theme: '',
//     mapType: 'satellite',
//   },
//   {
//     name: 'Daybreak',
//     theme: 'wy',
//     mapType: 'roadmap',
//   },
//   {
//     name: 'Daybreak\nLow Detail',
//     theme: 'minimal',
//     mapType: 'roadmap',
//   },
//   {
//     name: 'Google Maps',
//     theme: null,
//     mapType: 'roadmap',
//   },
// ]

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
              <Image src={midnightBasemap} alt='' />
            </IconWrapper>
            Midnight
          </ButtonWrapper>
          <ButtonWrapper onClick={onBasemapButtonClick('MidnightLow')}>
            <IconWrapper>
              <Image src={midnightLowBasemap} alt='' />
            </IconWrapper>
            Midnight
            <br />
            Low Detail
          </ButtonWrapper>
          <ButtonWrapper onClick={onBasemapButtonClick('Satellite')}>
            <IconWrapper>
              <Image src={satelliteBasemap} alt='' />
            </IconWrapper>
            Satellite
          </ButtonWrapper>
          <ButtonWrapper onClick={onBasemapButtonClick('Daybreak')}>
            <IconWrapper>
              <Image src={daybreakBasemap} alt='' />
            </IconWrapper>
            Daybreak
          </ButtonWrapper>
          <ButtonWrapper onClick={onBasemapButtonClick('DaybreakLow')}>
            <IconWrapper>
              <Image src={daybreakLowBasemap} alt='' />
            </IconWrapper>
            Daybreak
            <br />
            Low Detail
          </ButtonWrapper>
          <ButtonWrapper onClick={onBasemapButtonClick('Google Maps')}>
            <IconWrapper>
              <Image src={googleMapsBasemap} alt='' />
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
            <Toggle
              size={45}
              onChange={(e: React.ChangeEvent) => {
                console.log(
                  (e.target as HTMLInputElement).checked ? 'KM' : 'MI'
                )
              }}
            />
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
