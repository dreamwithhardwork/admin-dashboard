import {getRequest,postRequest} from '../constants/headers';
import {ACTION_TYPES,SERVICE_URL} from '../constants/constants';



export const saveProperties = async (payload) => {
  let url = SERVICE_URL.ADD_CAR_PROPERTIES;
  let response = await fetch(url,postRequest(payload));
  let body = await response.json();
  return body;
}


export const getProperties = async () => {
  let url = SERVICE_URL.GET_CAR_PROPERTIES;
  let response = await fetch(url,getRequest());
  let body = await response.json();
  return body;
}









