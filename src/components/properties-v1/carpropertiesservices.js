import {getRequest,postRequest} from '../constants/headers';
import {ACTION_TYPES,SERVICE_URL} from '../constants/constants';


export const addNewCarProperty = (props,key) => {
   let newState = {...props.carProperties}
   newState[key] = [];
   props.dispatch({type:ACTION_TYPES.SET_CAR_PROPERTIES,value:newState})
}


export const updateNewCarProperty = (oldKey,newKey,props) => {
  let newState = {...props.carProperties}
   let newValue =  [...newState[oldKey]];
   delete newState[oldKey];
   newState[newKey] = newValue;
  props.dispatch({type:ACTION_TYPES.UPDATE_CAR_PROPERTIES,value:newState})
}



export const addNewCarPropertyValue = (props,key,value) => {
  let newState = {...props.carProperties}
  let newValue = [...newState[key]]
  newValue.push(value)
  props.dispatch({type:ACTION_TYPES.SET_CAR_PROPERTIES_VALUE,value:newState})
}


export const updateNewCarPropertyValue = (oldKey,newKey,props) => {
  let newState = {...props.carProperties}
  let newValue =  [...newState[oldKey]];
  delete newState[oldKey];
  newState[newKey] = newValue;
 props.dispatch({type:ACTION_TYPES.UPDATE_CAR_PROPERTIES_VALUE,value:newState})
}










