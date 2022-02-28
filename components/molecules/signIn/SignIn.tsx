import { FC, useEffect, useLayoutEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { setCookie } from '@/utils/fn'
import { useSignInStore } from '../../organisms/signInStore'
import { signIn } from 'next-auth/react'
import GoogleSignInButtonIcon from '@/components/atoms/social-login/Google'
import { Session } from 'next-auth'

interface SignInProps {}

const SignIn: FC<SignInProps> = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const keepSignedInRef = useRef<HTMLInputElement>(null!)

  const setIsLoggedIn = useSignInStore((store) => store.setIsLoggedIn)
  const inputTypes = {
    USERNAME: 'username',
    PASSWORD: 'password',
  } as const

  const onChangeHandler =
    (type: typeof inputTypes[keyof typeof inputTypes]) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      switch (type) {
        case inputTypes.USERNAME:
          setUsername(event.target.value)
          break
        case inputTypes.PASSWORD:
          setPassword(event.target.value)
          break
      }
    }

  // a function that makes a call to /signin with the username and password as the payload
  const onSubmitHandler = async (event: React.MouseEvent) => {
    if (username && password) {
      try {
        const response = await signIn('credentials', { username, password })
        console.log('response: ', response)

        if (response) {
          setIsLoggedIn(true)
          if (keepSignedInRef.current.checked) {
            setCookie(btoa('isLoggedIn'), btoa('true'), 7)
          }
        }
      } catch (e) {
        console.log(e)
      }
    } else {
      throw new Error('Username and password are required')
    }
  }

  // used to focus the user on the Username input
  const usernameInputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    usernameInputRef.current?.focus()
  }, [])

  return (
    <SignInWrapper>
      <h1>Sign In</h1>
      <form>
        <UsernameWrapper>
          <label>Username</label>
          <input
            type={inputTypes.USERNAME}
            ref={usernameInputRef}
            onChange={onChangeHandler(inputTypes.USERNAME)}
          />
        </UsernameWrapper>
        <PasswordWrapper>
          <label>Password</label>
          <input
            type={inputTypes.PASSWORD}
            onChange={onChangeHandler(inputTypes.PASSWORD)}
          />
        </PasswordWrapper>
        <KeepSignedInWrapper>
          <label>Keep signed in</label>
          <input type='checkbox' ref={keepSignedInRef} />
        </KeepSignedInWrapper>
        <SignInButton type='button' onClick={onSubmitHandler}>
          Sign In
        </SignInButton>
      </form>
      <SignInSeparator>OR</SignInSeparator>
      <SocialSignInWrapper>
        <GoogleSignInButtonIcon onClick={async () => await signIn('google')} />
      </SocialSignInWrapper>
    </SignInWrapper>
  )
}

export default SignIn

const SocialSignInWrapper = styled.div``

const SignInSeparator = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #ccc;
  }
  &:not(:empty)::before {
    margin-right: 0.25em;
  }

  &:not(:empty)::after {
    margin-left: 0.25em;
  }
`

const SignInWrapper = styled.div`
  width: 26rem;
  border: 1/8rem solid black;
  background: #f5f5f5;
  border-radius: 1/2rem;
  text-align: center;

  form {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(2, 2fr) 1fr 2fr;
    column-gap: 1rem;
    row-gap: 2rem;
    padding: 1rem 0;
  }
`

const InputWrapper = styled.div`
  grid-column-start: 4;
  grid-column-end: span 6;
`

const UsernameWrapper = styled(InputWrapper)`
  grid-row-start: 1;
`
const PasswordWrapper = styled(InputWrapper)`
  grid-row-start: 2;
`
const KeepSignedInWrapper = styled(InputWrapper)`
  grid-row-start: 3;
`
const SignInButton = styled.button`
  grid-row-start: 4;
  grid-column-start: 5;
  grid-column-end: 9;
`
