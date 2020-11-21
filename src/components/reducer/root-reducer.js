import {ACTION_TYPES} from '../constants/constants';
import {validateJwt,getUserDetails} from '../static/util'


const initialState = {
    login:false,
    userDetails: {},
    toast: {
        open: false,
        severity: "error",
        message:"!!"
    },
    backdrop:false,
    toggleSidenav: false,
    newBrandModel: false,
    brands:[],
    activeBrand: "",
    models:[],
    activeModel:"",
    activeVariant:"",
    activeCarProperty:"",
    carProperties: {
        engine:[
            {name:"Engine Type", propertyDataType:"STRING"},
            {name:"Fast Charging", propertyDataType:"BOOLEAN"}
        ],
        fuel:[]
    }
}

const setInitialState = () =>{
  let  jwt = localStorage.getItem("token");
  if(jwt === null || jwt === undefined)
  {
      return;
  }
  let valid = validateJwt(jwt);
  if(valid){
      initialState.login = true;
      initialState.userDetails = getUserDetails();
  }
}

setInitialState();

const rootReducer = (state = initialState, action) => {

    const newState = {...state}
    let newToast = {...newState.toast}
    console.log(newState)
    switch(action.type){

     case ACTION_TYPES.LOGIN:
          newState.login = true;
          newState.userDetails = getUserDetails();
         break;
     case ACTION_TYPES.LOGOUT:
            newState.login = false;
            newState.userDetails = {};
            localStorage.removeItem("token");
     break;

     case ACTION_TYPES.TOAST:
         newState.toast = action.toast
         break;
    
    case ACTION_TYPES.TOASTRESET:
        newState.toast = newToast;
        newState.toast.open = false;
        break;

    case ACTION_TYPES.OPEN_BACKDROP:
        newState.backdrop = true;
    break;

    case ACTION_TYPES.CLOSE_BACKDROP:
        newState.backdrop = false;
        break;
    case ACTION_TYPES.SIDENAVBAR:
        newState.toggleSidenav = !newState.toggleSidenav;
        break;
    case ACTION_TYPES.NEW_BRAND_MODEL_OPEN:
        newState.newBrandModel = true;
        break;
    case ACTION_TYPES.NEW_BRAND_MODEL_CLOSE:
        newState.newBrandModel = false;
        break;
    case ACTION_TYPES.SET_ACTIVE_BRAND:
        newState.activeBrand = action.value;
        newState.activeModel="";
        break;
    case ACTION_TYPES.ADD_BRANDS:
        newState.brands = action.value;
        break;
    case ACTION_TYPES.ADD_MODELS:
        newState.models = action.value;
        break;
    case ACTION_TYPES.SET_ACTIVE_MODEL:
        newState.activeModel = action.value;
        break;
    case ACTION_TYPES.SET_ACTIVE_CAR_PROPERTY:
        newState.activeCarProperty = action.value;
        break;
    case ACTION_TYPES.SET_CAR_PROPERTIES:
        newState.carProperties = action.value;
        break;

        

      default:
      break;
    }

    return newState;
}

export default rootReducer;