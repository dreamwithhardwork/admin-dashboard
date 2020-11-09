export const LOGIN_TYPE ={
    EMAIL :"EMAIL",
    MOILE: "MOBILE"
   }

   export const ACTION_TYPES = {
    TOGGLE_SWITCH:"TOGGLE_SWITCH",
    USERNAME_CHANGE:"USERNAME_CHANGE",
    PASS_CHANGE:"PASS_CHANGE",
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",
    OTP: "OTP",
    OTP_SENT: "OTP_SENT",
    CLOSE_TOAST_MESSAGE:"CLOSE_TOAST_MESSAGE",
    LINEAR_PROGRESS: "LINEAR_PROGRESS",
    OPEN_BACKDROP:"OPEN_BACKDROP",
    CLOSE_BACKDROP: "CLOSE_BACKDROP",
    LOGIN_OPEN: "LOGIN_OPEN",
    LOGIN_CLOSE: "LOGIN_CLOSE",
 }



 export const SERVICE_URL = {

    OTP_MOBILE: process.env.REACT_APP_LOGIN_OTP+"/api/v1/otp/send/text/",
    OTP_EMAIL: process.env.REACT_APP_LOGIN_OTP+"/api/v1/otp/send/email/",
    LOGIN: process.env.REACT_APP_LOGIN_OTP+"/api/v1/user/login",
    SIGNUP: process.env.REACT_APP_LOGIN_OTP+"/api/v1/user/signup" ,
    GET_REGISTERED_USER_BY_MOBILE: process.env.REACT_APP_ADMIN_SERVICE+"/api/v1/admin/registered/users/mobile/",
    GET_REGISTERED_USER_BY_EMAIL: process.env.REACT_APP_USER_DETAILS+"/api/v1/admin/registered/users/email/",
    GET_ALL_USERS: process.env.REACT_APP_USER_DETAILS+"/api/v1/admin/registered/users/all"

 }