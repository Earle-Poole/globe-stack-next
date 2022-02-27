import { FC, useState } from 'react'
import focused from '@/static/google-sign-in/focused.png'
import pressed from '@/static/google-sign-in/pressed.png'
import normal from '@/static/google-sign-in/normal.png'
import Image from 'next/image'

interface GoogleSignInButtonProps {
  onClick(): void
}

const GoogleSignInButtonIcon: FC<GoogleSignInButtonProps> = ({ onClick }) => {
  const [isFocused, setIsFocused] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  const Icon = () => {
    if (isPressed) {
      return (
        <Image width={191} height={46} src={pressed} alt={'Google Sign-In'} />
      )
    }
    if (isFocused) {
      return (
        <Image width={191} height={46} src={focused} alt={'Google Sign-In'} />
      )
    }

    return <Image width={191} height={46} src={normal} alt={'Google Sign-In'} />
  }

  return (
    <div
      onMouseDown={() => {
        setIsPressed(true)
        onClick()
      }}
      onMouseUp={() => setIsPressed(false)}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}>
      <div style={{ pointerEvents: 'none' }}>
        <Icon />
      </div>
    </div>
  )
}

export default GoogleSignInButtonIcon
