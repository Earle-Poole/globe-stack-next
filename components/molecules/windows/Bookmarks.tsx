import { ReactElement } from 'react'
import styled from 'styled-components'
import useMapStore from '@/organisms/map/mapStore'

interface BookmarkObj {
  label: string
  icon: ReactElement | undefined
  coordinates: { lat: number; lng: number }
  zoom: number
}

const Bookmark = (props: {
  className: string
  cardinalIndicator?: 'N' | 'S' | 'E' | 'W'
}) => {
  return (
    <BookmarkWrapper>
      {props.cardinalIndicator ? <div>{props.cardinalIndicator}</div> : null}
      <i className={props.className}></i>
    </BookmarkWrapper>
  )
}

const Bookmarks = () => {
  const primaryMap = useMapStore((store) => store.primaryGoogleMap)
  const onClickHandler = (bookmark: BookmarkObj) => () => {
    if (primaryMap) {
      primaryMap.setCenter(bookmark.coordinates)
      primaryMap.setZoom(bookmark.zoom)
    }
  }

  const bookmarkList: BookmarkObj[] = [
    {
      label: 'N. America',
      icon: (
        <Bookmark
          cardinalIndicator='N'
          className='fas fa-globe-americas'></Bookmark>
      ),
      coordinates: { lat: 39.3, lng: -97.9 },
      zoom: 5,
    },
    {
      label: 'S. America',
      icon: (
        <Bookmark
          cardinalIndicator='S'
          className='fas fa-globe-americas'></Bookmark>
      ),
      coordinates: { lat: -17.5, lng: -60 },
      zoom: 4,
    },
    {
      label: 'Africa',
      icon: <Bookmark className='fas fa-globe-africa'></Bookmark>,
      coordinates: { lat: 8.45, lng: 20.8 },
      zoom: 4,
    },
    {
      label: 'Europe',
      icon: <Bookmark className='fas fa-globe-europe'></Bookmark>,
      coordinates: { lat: 48.8, lng: 8.2 },
      zoom: 5,
    },
    {
      label: 'W. Asia',
      icon: (
        <Bookmark
          cardinalIndicator='W'
          className='fas fa-globe-asia'></Bookmark>
      ),
      coordinates: { lat: 32.7, lng: 53.5 },
      zoom: 5,
    },
    {
      label: 'S. Asia',
      icon: (
        <Bookmark
          cardinalIndicator='S'
          className='fas fa-globe-asia'></Bookmark>
      ),
      coordinates: { lat: 27.7, lng: 85.5 },
      zoom: 5,
    },
    {
      label: 'E. Asia',
      icon: (
        <Bookmark
          cardinalIndicator='E'
          className='fas fa-globe-asia'></Bookmark>
      ),
      coordinates: { lat: 33.1, lng: 106.6 },
      zoom: 5,
    },
  ]
  return (
    <BookmarksWrapper>
      {bookmarkList.map((bookmark) => (
        <BookmarkButtonWrapper
          key={bookmark.label}
          onClick={onClickHandler(bookmark)}>
          <IconWrapper>{bookmark.icon}</IconWrapper>
          <TitleWrapper>{bookmark.label}</TitleWrapper>
        </BookmarkButtonWrapper>
      ))}
    </BookmarksWrapper>
  )
}

export default Bookmarks

const BookmarksWrapper = styled.div`
  height: calc(100% - 10px);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  color: ${(props) => props.theme.fontColor};
`

const BookmarkButtonWrapper = styled.div`
  cursor: pointer;
  height: 65px;
  aspect-ratio: 1/1;
  margin: 5px;

  &:hover {
    box-shadow: 0 0 1px 1px #000000aa;
  }
`
const IconWrapper = styled.div``
const TitleWrapper = styled.div`
  font-size: 12px;
  text-align: center;
`

const BookmarkWrapper = styled.div`
  position: relative;
  font-size: 32px;
  display: flex;
  justify-content: center;
  padding: 5px;

  div {
    font-size: 12px;
    position: absolute;
    top: 2px;
    right: 2px;
  }
`
