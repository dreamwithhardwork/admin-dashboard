import {SERVICE_URL,ACTION_TYPES} from '../constants/constants';
import {getRequest,postRequest,payloads, deleteRequest} from '../constants/headers';

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

export const uploadLogo = async (file,fileName) => {
        var data = new FormData()
        data.append('files', file)
        data.append('filePath','brandLogo/')
        data.append('fileName', fileName)
        let res =  await fetch("https://image-service-cemhl7ajqq-uc.a.run.app/api/upload", {
            method:"POST",
            body: data,
            files: file
        });
        let body = await res.json();
        return body;
}

export const getFileName = (file) => {
}

export const setBrand = async (brandName,dispatch) => {
    dispatch({type:ACTION_TYPES.SET_ACTIVE_BRAND,value:brandName})
    let response = await fetch(SERVICE_URL.GET_ALL_MODEL+brandName,getRequest());
    let body = await response.json();
    dispatch({type:ACTION_TYPES.ADD_MODELS,value:body})
    if(body.length > 0)
    dispatch({type:ACTION_TYPES.SET_ACTIVE_MODEL,value:body[0]})
}

export const updateBrand = (updated,olddata,rows,setRows) => {
    return new Promise(async (res,rej) => {
        let response = await fetch(SERVICE_URL.ADD_NEW_MAKE,postRequest(updated));
        let index = olddata.tableData.id;
        let updatedData = [...rows];
        updatedData.splice(index,1,updated)
        setRows(updatedData)
        res();
    })
  }


  export const deleteBrand = (deletedRow,rows,setRows) => {
    return new Promise(async (res,rej) => {
        console.log(deletedRow)
        let url = SERVICE_URL.DELETE_MAKE_BY_ID+deletedRow.id;
        let response = await fetch(url, deleteRequest());
        let index = deletedRow.tableData.id;
        let updatedData = [...rows];
        updatedData.splice(index,1)
        setRows(updatedData)
        res();
    })
  }