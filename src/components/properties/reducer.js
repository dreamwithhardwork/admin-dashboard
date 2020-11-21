import { ACTION_TYPES } from "../constants/constants";



export const initialState = {
    newCarProp: ""
}


export const reducer = (state = initialState, action) => {


    let newState = {...initialState}

    switch(action.type){
        case ACTION_LOCAL_TYPES.CAR_PROP_CHANGE: 
        newState.newCarProp = action.value;
        break;
        case ACTION_LOCAL_TYPES.CAR_PROP_RESET: 
        newState.newCarProp = "";
        break;
          
    }

    return newState;

}



export const ACTION_LOCAL_TYPES = {
    CAR_PROP_CHANGE:"CAR_PROP_CHANGE",
    CAR_PROP_RESET:"CAR_PROP_RESET",

    ADD_NEW_PROP:"DATATYPE_CHANGE"

}