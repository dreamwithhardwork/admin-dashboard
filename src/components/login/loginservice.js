import {ACTION_TYPES,LOGIN_TYPE,SERVICE_URL} from '../constants/constants';
import React from 'react';
import { useStore } from 'react-redux';

export const sendOtp = async (state,dispatch) => {
    console.log("send otp");
    dispatch({type:ACTION_TYPES.LINEAR_PROGRESS});
    let res = validate(state.username);
    let url;
    let action = {
        type: ACTION_TYPES.OTP_SENT,
        toastMessageSeverity: "error",
        toastMessage: "Invalid mobile number / email !!",
        passwordFieldDisplay : { display: "none" }
    }
    if (res === LOGIN_TYPE.EMAIL) {
    url = SERVICE_URL.OTP_EMAIL + state.username;
    }
     else if (res === LOGIN_TYPE.MOBILE) {
    url = SERVICE_URL.OTP_MOBILE + state.username;
    }
  else {
      dispatch(action);
     return;
  }
  let response = await fetch(url);

  if(response.status === 200){
      //Registered User
     let text = await response.text();
     if(text === "Registered User"){
        action.toastMessageSeverity= "success";
        action.toastMessage = "otp sent to your mobile/email !!";
     }
     else{
        action.toastMessageSeverity= "warning";
        action.toastMessage = "please register with the otp sent to your mobile/email !!";
     }
     
     action.passwordFieldDisplay = { display: "block" };
  }
  else{
    action.toastMessageSeverity = "error";
    action.toastMessage = "failed to send otp !!";
  }
  dispatch(action)
}

function validate(user){
    var mailformat = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/;
    if(user.length==10 && Number(user) != NaN)
    {
      return LOGIN_TYPE.MOBILE;
    }
    else if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(user))
    {
      return LOGIN_TYPE.EMAIL
    }
    else{
        return "invalid"
    }
}


