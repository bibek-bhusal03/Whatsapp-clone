import React, { useContext, useState } from 'react'
import "./Login.css";
import { Button } from '@mui/material';
 import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
 import {provider, auth} from './firebase'
import { UserContext } from './UserContext';
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';
 

function Login() {
const [{}, dispatch] = useStateValue();

const auth = getAuth();
const signIn = () => {
signInWithPopup(auth, provider)
  .then((result) => {
    dispatch({
      type: actionTypes.SET_USER,
      user: result.user,
    });
     console.log(result)
  });
};
 
  return (
    <div className="login">
      <div className="login__container">
        <img src="https://png.pngtree.com/png-vector/20230225/ourmid/pngtree-whatsapp-icon-social-media-png-image_6618452.png" alt="" />
        <div className="login_text">
          <h1>Sign in to WhatsApp</h1>
        </div>
        <Button onClick={signIn}>
          Sign In With Google
        </Button>
      </div>
    </div>
  )
};

export default Login