
import {ACTIONS} from './actions';

export const initialState = {
    models : [],
    filter:{
        bodyTypes:[],
        fuelTypes:[],
        minPrice:0.0,
        maxPrice:20000000,
        modelList:[],
        transmissionList:[],
        makeList:[]
    }
}

export const reducer = (state = initialState, action) => {
    let newState = {...state}

    switch(action.type){
        case ACTIONS.GET_MODELS :
              newState.models =[...action.value]
              newState.loading = false;
            break;
        case ACTIONS.RESET_FILTER :
              newState.filter = {};
            break;
    }
    console.log(newState);
    return newState;
}

