import {ACTION_TYPES,LOGIN_TYPE,SERVICE_URL} from '../constants/constants';
import {postRequest,payloads} from '../constants/headers';
import {validate,validateJwt} from '../static/util';

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

export const login = async (state,dispatch,store) => {
  
  dispatch({type:ACTION_TYPES.OPEN_BACKDROP})
  let username = state.username;
  let password = state.password;
  let otpLogin = state.toggleSwitch;
  let payload = {...payloads.login};
  payload.username = username;
  let loggedin = false;
  if(otpLogin){
    payload.loginType = "OTP";
    payload.otp=password;
  }
  else{
    payload.loginType = "PASSWORD";
    payload.password=password;
  }
  let response = await fetch(SERVICE_URL.LOGIN,postRequest(payload));
  let body = await response.json()
  let action = {
    type: ACTION_TYPES.LOGIN,
    toastMessageSeverity: "error",
    toastMessage: "Authentication failed !!",
  
  }
  if(response.status === 200 && validateJwt(body.jwt)){
     action.toastMessageSeverity= "success";
     action.toastMessage= "Successfully logged in !!";
     loggedin = true;
     store.dispatch({type:ACTION_TYPES.LOGIN});
  }
  dispatch(action);
  return loggedin;

}




