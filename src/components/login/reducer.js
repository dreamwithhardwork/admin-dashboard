import {ACTION_TYPES,LOGIN_TYPE} from '../constants/constants'



export const initialState = {
    username : "",
    password: "",
    passwordFieldDisplay: {display:"block"},
    toastOpen: false,
    toastMessageSeverity: "success",
    toastMessage: "success",
    backdrop: false,
    toggleSwitch:false,
    linearProgress:false,
    passwordTypeLable: "Password*",
    passwordPlaceHolder: "",
    passwordType: "password",
    otpButtonDisabled: true,
    loginButtonDisabled: true
  }

export const reducer = (state, action) => {

    const newState = {...state}
    switch(action.type){
        case ACTION_TYPES.TOGGLE_SWITCH :
            handleToggleSwitch(action.event,newState);
        break;

        case ACTION_TYPES.USERNAME_CHANGE : 
           handleUsernameChange(action.event, newState);
        break;

        case ACTION_TYPES.PASS_CHANGE : 
           passwordChange(action.event,newState);
        break;

        case ACTION_TYPES.LOGIN :
            newState.toastOpen = true;
            newState.toastMessageSeverity = action.toastMessageSeverity;
            newState.toastMessage = action.toastMessage;
            newState.backdrop = false;
        break;

        case ACTION_TYPES.CLOSE_TOAST_MESSAGE:
            newState.toastOpen = false;
        break;

        case ACTION_TYPES.LINEAR_PROGRESS:
            newState.linearProgress = true;
        break;

        case ACTION_TYPES.OPEN_BACKDROP:
            newState.backdrop = true;
        break;

        case ACTION_TYPES.CLOSE_BACKDROP:
            newState.backdrop = false;
        break;
        
        case ACTION_TYPES.OTP_SENT :
            newState.linearProgress = false;
            newState.toastOpen = true;
            newState.toastMessageSeverity = action.toastMessageSeverity;
            newState.toastMessage = action.toastMessage
            newState.passwordFieldDisplay = action.passwordFieldDisplay;
        break;

        default:
            break;
    }
    console.log(newState)
    return newState;
} 


function handleToggleSwitch(event, state){
    let otpType = event.target.checked;
    state.toggleSwitch = otpType;
    reset(state);
    state.passwordTypeLable = !otpType ? "Password*": "OTP*";
    state.passwordPlaceHolder = otpType ? "__ __ __ __" : "";
    state.passwordType = otpType ? "number" : "password";
    state.passwordFieldDisplay =  otpType ? {display:"none"} : {display:"block"};
}

const handleUsernameChange = (event, state) => {
    let value = event.target.value;
    if(state.toggleSwitch && value.length > 3){
        state.otpButtonDisabled = false;
    }
    else{
        state.otpButtonDisabled = true;
    }
    state.username = event.target.value;
}

const passwordChange = (event,state) => {
    let value = event.target.value;
    if(value.length >3)
    {
        state.loginButtonDisabled = false;
    }
    else{
        state.loginButtonDisabled = true;
    }
    
    state.password = value;
}

const reset =(state) => {

    state.username = "";
    state.password = "";
    state.otpButtonDisabled = true;
    state.loginButtonDisabled =  true ;

}



