export const ACTION_TYPES = {
    LOGIN_OPEN: "LOGIN_OPEN",
    LOGIN_CLOSE: "LOGIN_CLOSE",
    SIDENAVBAR: "SIDENAVBAR"
}

export const initialState = {
  sideNavOpen : true,
  loginOpen: false
}


export const reducer = (state, action) => {

    const newState = {...state}
    console.log(newState)
    switch(action.type){
        case ACTION_TYPES.LOGIN_CLOSE :
           newState.loginOpen =false;
           state = newState;
        break;

        case ACTION_TYPES.LOGIN_OPEN : 
            newState.loginOpen =true;
           state = newState;
        break;

        case ACTION_TYPES.SIDENAVBAR : 
            newState.sideNavOpen = newState.sideNavOpen?false:true;
            state = newState;
        break;

        default:
            break;
    }
    console.log(state)
    return newState;
} 