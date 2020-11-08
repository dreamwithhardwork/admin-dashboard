import {ACTION_TYPES} from '../constants/constants'

const initialState = {
    login:true,
    userDetails: {}
}

const rootReducer = (state = initialState, action) => {

    const newState = {...state}
    switch(action.type){

     case ACTION_TYPES.LOGIN:
         console.log(newState)
          newState.login = true;
         break;

      default:
      break;
    }

    return newState;
}

export default rootReducer;