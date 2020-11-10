import { ACTION_TYPES } from "../../constants/constants";

export const initialstate ={
    toastProps: {open:false,toastMessage:"",toastMessageSeverity:"error"},
    popular: false,
    logoUrl: null,
    logoUrlName: null,
    loading: false,
    backdrop: false,
    toast: {open:false,toastMessage:"",toastMessageSeverity:"error"},
    bname: "",
    saveDisabled: true
}

export const reducer = (state = initialstate, action) => {

    let newState = {...state};
    switch(action.type){
       case Actions.SET_LOADING:
           newState.loading =true;
           newState.saveDisabled = true;
           break;

       case Actions.UPLOAD:
           newState.logoUrl = action.logoUrl;
           newState.logoUrlName = action.logoUrlName;
           newState.loading =false;
           if(state.bname.length>0)
            newState.saveDisabled = false;
            else
            newState.saveDisabled = true;
           break;  
    
        case Actions.SET_BACKDROP:
            newState.backdrop = true;
            break;
        
        case Actions.NEW_BRAND:
            newState.backdrop = false;
            newState.toast = action.toast;
            break;   
        
        case Actions.NAME_CHANGE:
            newState.bname = action.value;
            if(action.value.length>0)
            newState.saveDisabled = false;
            else
            newState.saveDisabled = true;
            break;

        case Actions.TOAST_CLOSE:
            newState.toast = initialstate.toast;
            break;
        
        case Actions.SET_POPULARITY:
            newState.popular = action.value;
            break;
        
        case Actions.RESET:
            newState.bname="";
            newState.logoUrlName=null;
            newState.saveDisabled=true;
            newState.popular =false;
            newState.logoUrl=null;
            break;
           
           

    }

    return newState;

}


export const Actions = {
    SET_LOADING:"SET_LOADING",
    UPLOAD:"UPLOAD",
    SET_BACKDROP:"SET_BACKDROP",
    NEW_BRAND:"NEW_BRAND",
    NAME_CHANGE:"NAME_CHANGE",
    TOAST_CLOSE:"TOAST_CLOSE",
    SET_POPULARITY:"SET_POPULARITY",
    RESET:"RESET"

}