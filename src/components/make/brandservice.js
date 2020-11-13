import {SERVICE_URL} from '../constants/constants';
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