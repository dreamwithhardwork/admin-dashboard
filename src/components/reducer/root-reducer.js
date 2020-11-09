import {ACTION_TYPES} from '../constants/constants';
import {validateJwt,getUserDetails} from '../static/util'


const initialState = {
    login:false,
    userDetails: {}
}

const setInitialState = () =>{
  let  jwt = localStorage.getItem("token");
  if(jwt === null || jwt === undefined)
  {
      return;
  }
  let valid = validateJwt(jwt);
  if(valid){
      initialState.login = true;
      initialState.userDetails = getUserDetails();
  }
}

setInitialState();

const rootReducer = (state = initialState, action) => {

    const newState = {...state}
    console.log(newState)
    switch(action.type){

     case ACTION_TYPES.LOGIN:
          newState.login = true;
          newState.userDetails = getUserDetails();
         break;
     case ACTION_TYPES.LOGOUT:
            newState.login = false;
            newState.userDetails = {};
            localStorage.removeItem("token");
     break;

      default:
      break;
    }

    return newState;
}

export default rootReducer;