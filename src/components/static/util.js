import {LOGIN_TYPE} from '../constants/constants';
import jwt_util from 'jwt-decode';

export function validate(user){
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


export function validateJwt(jwt){
  let details =  jwt_util(jwt);
  let exp = details.exp * 1000;
  let c_date = new Date();
  if(c_date < exp){
    localStorage.setItem("token",jwt);
    return true;
  }
  return false;
}

export function getUserDetails(){
  let jwt = localStorage.getItem("token")
  let details =  jwt_util(jwt);
  let userDetails = {
    name: "",
    profilePic:"",
    email: "",
    mobile: ""
  }
  userDetails.name =details.sub;
  return userDetails;
}