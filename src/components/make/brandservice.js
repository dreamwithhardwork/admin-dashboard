import {SERVICE_URL,ACTION_TYPES} from '../constants/constants';
import {getRequest,postRequest,payloads} from '../constants/headers';

export const getAllBrands = async () => {
 let response = await fetch(SERVICE_URL.GET_ALL_MAKES+"CAR",getRequest());
 let body = await response.json();
 if(response.status === 200){
    return body;
 }
 else{
     return [];
 }
}

export const addNewbrand = async (popular,name,logoUrl) => {
    let payload = {
    }
    payload.type="CAR";
    payload.logoUrl = logoUrl;
    payload.name=name;
    payload.popular=popular;
    let response = await fetch(SERVICE_URL.ADD_NEW_MAKE,postRequest(payload));
    return response;
}

export const uploadLogo = async (file) => {

        var data = new FormData()
        data.append('files', file)
        let res =  await fetch("https://image-service-cemhl7ajqq-uc.a.run.app/api/upload", {
            method:"POST",
            body: data,
            files: file
        });
        let body = await res.json();
        return body;
}

export const setBrand = async (brandName,dispatch) => {
    dispatch({type:ACTION_TYPES.SET_ACTIVE_BRAND,value:brandName})
    let response = await fetch(SERVICE_URL.GET_ALL_MODEL+brandName,getRequest());
    let body = await response.json();
    dispatch({type:ACTION_TYPES.ADD_MODELS,value:body})
    dispatch({type:ACTION_TYPES.SET_ACTIVE_MODEL,value:body[0]})
}