import React from 'react'
import SignUpCard from '../components/SignUpCard.jsx'
import LoginCard from '../components/LoginCard.jsx';
import { useRecoilValue } from 'recoil';
import authScreenAtom from '../atoms/authAtom.js';

const AuthPage = () => {
    const authScreenState = useRecoilValue(authScreenAtom);
    console.log(authScreenState);

  return (
    <>
        {authScreenState === "login" ? <LoginCard/> : <SignUpCard />}
    </>
  );
};

export default AuthPage;