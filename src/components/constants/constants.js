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
    TOAST:"TOAST",
    TOASTRESET:"TOASTRESET",
    SIDENAVBAR: "SIDENAVBAR",
    NEW_BRAND_MODEL_OPEN:"NEW_BRAND_MODEL_OPEN",
    NEW_BRAND_MODEL_CLOSE:"NEW_BRAND_MODEL_CLOSE",
    SET_ACTIVE_BRAND:"SET_ACTIVE_BRAND",
    ADD_BRANDS:"ADD_BRANDS",
    ADD_MODELS:"ADD_MODELS",
    SET_ACTIVE_MODEL:"SET_ACTIVE_MODEL",
    SET_ACTIVE_CAR_PROPERTY:"SET_ACTIVE_CAR_PROPERTY",
    SET_CAR_PROPERTIES:"SET_CAR_PROPERTIES",
    UPDATE_CAR_PROPERTIES:"UPDATE_CAR_PROPERTIES",
    SET_CAR_PROPERTIES_ID:"SET_CAR_PROPERTIES_ID",
    SET_VARIANT:"SET_VARIANT"
 }



 export const SERVICE_URL = {

    OTP_MOBILE: process.env.REACT_APP_LOGIN_OTP+"/api/v1/otp/send/text/",
    OTP_EMAIL: process.env.REACT_APP_LOGIN_OTP+"/api/v1/otp/send/email/",
    LOGIN: process.env.REACT_APP_LOGIN_OTP+"/api/v1/user/login",
    SIGNUP: process.env.REACT_APP_LOGIN_OTP+"/api/v1/user/signup",
    NOTIFY:process.env.REACT_APP_LOGIN_OTP+"/api/v1/notification/notify",

    GET_REGISTERED_USER_BY_MOBILE: process.env.REACT_APP_ADMIN_SERVICE+"/api/v1/admin/registered/users/mobile/",
    GET_REGISTERED_USER_BY_EMAIL: process.env.REACT_APP_ADMIN_SERVICE+"/api/v1/admin/registered/users/email/",
    GET_ALL_USERS: process.env.REACT_APP_ADMIN_SERVICE+"/api/v1/admin/registered/users/all",
    DELETE_USER:process.env.REACT_APP_ADMIN_SERVICE+"/api/v1/admin/registered/users/delete/id/",
    ADD_USER:process.env.REACT_APP_ADMIN_SERVICE+"/api/v1/admin/registered/users/add",

    GET_ALL_MAKES : process.env.REACT_APP_ADMIN_SERVICE+"/api/v1/admin/make/all?type=",
    ADD_NEW_MAKE: process.env.REACT_APP_ADMIN_SERVICE+"/api/v1/admin/make/add",
    DELETE_MAKE_BY_ID: process.env.REACT_APP_ADMIN_SERVICE+"/api/v1/admin/make/delete?id=",

    ADD_NEW_MODEL: process.env.REACT_APP_ADMIN_SERVICE+"/api/v1/admin/model/add",
    GET_ALL_MODEL: process.env.REACT_APP_ADMIN_SERVICE+"/api/v1/admin/model?make=",

    GET_CAR_PROPERTIES: process.env.REACT_APP_ADMIN_SERVICE+"/api/v1/admin/properties/get/car",
    ADD_CAR_PROPERTIES: process.env.REACT_APP_ADMIN_SERVICE+"/api/v1/admin/properties/add/car",
    DELETE_CAR_PROPERTY: process.env.REACT_APP_ADMIN_SERVICE+"/api/v1/admin/properties/delete?id=",

    GET_VARIANT_BY_ID: process.env.REACT_APP_ADMIN_SERVICE+"/api/v1/admin/variant?id=",
    ADD_VARIANT: process.env.REACT_APP_ADMIN_SERVICE+"/api/v1/admin/variant/add",




 }