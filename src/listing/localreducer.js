
import {ACTIONS} from './actions';

const initialState = {
    models : {},
    filter:{}
}

export const reducer = (state = initialState, action) => {
    let newState = {...state}

    switch(action.type){
        case ACTIONS.ADD_FILTER :
              newState.filter ={...action.value}
            break;
        case ACTIONS.RESET_FILTER :
              newState.filter = {};
            break;
    }
    return newState;
}

