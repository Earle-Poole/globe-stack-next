import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { setCookie } from '../../../utils/fn';
import { useSignInStore } from './SignInStore';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const keepSignedInRef = useRef<HTMLInputElement>(null!);

  const setIsLoggedIn = useSignInStore((store) => store.setIsLoggedIn);

  const onChangeHandler =
    (type: 'username' | 'password') => (event: React.ChangeEvent<HTMLInputElement>) => {
      switch (type) {
        case 'username':
          setUsername(event.target.value);
          break;
        case 'password':
          setPassword(event.target.value);
          break;
      }
    };

  // a function that makes a call to /signin with the username and password as the payload
  const onSubmitHandler = async (event: React.MouseEvent) => {
    if (username && password) {
      try {
        const res = await fetch('/api/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            password,
          }),
        });

        if (res.status === 200) {
          const data = (await res.json()) as { isSuccess: boolean };
          if (data.isSuccess) {
            setIsLoggedIn(true);
            if (keepSignedInRef.current.checked) {
              setCookie(btoa('isLoggedIn'), btoa('true'), 7);
            }
          }
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      throw new Error('Username and password are required');
    }
  };

  const usernameInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    usernameInputRef.current?.focus();
  }, []);

  return (
    <SignInWrapper>
      <h1>Sign In</h1>
      <form>
        <UsernameWrapper>
          <label>Username</label>
          <input type='username' ref={usernameInputRef} onChange={onChangeHandler('username')} />
        </UsernameWrapper>
        <PasswordWrapper>
          <label>Password</label>
          <input type='password' onChange={onChangeHandler('password')} />
        </PasswordWrapper>
        <KeepSignedInWrapper>
          <label>Keep signed in</label>
          <input type='checkbox' ref={keepSignedInRef} />
        </KeepSignedInWrapper>
        <SignInButton type='button' onClick={onSubmitHandler}>
          Sign In
        </SignInButton>
      </form>
    </SignInWrapper>
  );
};

export default SignIn;

const SignInWrapper = styled.div`
  width: 26rem;
  border: 1px solid black;
  background: #f5f5f5;
  border-radius: 0.5rem;
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
`;

const InputWrapper = styled.div`
  grid-column-start: 4;
  grid-column-end: span 6;
`

const UsernameWrapper = styled(InputWrapper)`
  grid-row-start: 1;
`;
const PasswordWrapper = styled(InputWrapper)`
  grid-row-start: 2;
`;
const KeepSignedInWrapper = styled(InputWrapper)`
  grid-row-start: 3;
`;
const SignInButton = styled.button`
  grid-row-start: 4;
  grid-column-start: 5;
  grid-column-end: 9;
`