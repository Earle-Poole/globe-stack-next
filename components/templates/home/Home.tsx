import Head from "next/head";
import { useEffect } from "react";
import { getCookie } from "../../../utils/fn";
import Overlay from "../../atoms/overlay/Overlay";
import SignIn from "../../molecules/signIn/SignIn";
import { useSignInStore } from "../../molecules/signIn/SignInStore";
import Map from "../../organisms/map/MapComponent";
import styles from './Home.module.css'

const Home = () => {
  const isLoggedIn = useSignInStore((state) => state.isLoggedIn);
  const setIsLoggedIn = useSignInStore((state) => state.setIsLoggedIn);

  
  useEffect(() => {
    atob(getCookie(btoa('isLoggedIn'))) !== 'true' && setIsLoggedIn(false);
  }, [setIsLoggedIn]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Globe Stack</title>
      </Head>
      <Map />
      {isLoggedIn ? null : (
        <Overlay>
          <SignIn />
        </Overlay>
      )}
    </div>
  );
};

export default Home