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
    carProperties: {},
    carPropertiesId:"",
    enginecc:"",
    bhp:"",
    mileage:"",
    seat:"--",
    variant:{
        bodyType: "",
        description: "",
        fromYear: 2019,
        fuelType: "PETROL",
        model: "",
        specifications:{
            availableProps:{}
        },
        toYear: 2020,
        transmission: "AUTOMATIC",
        variantName: ""
      }
}

const setInitialState = () =>{
  let  jwt = localStorage.getItem("token");
  if(jwt === null || jwt === undefined)
  {
      return;
  }
  let valid  =false;
  try{
    valid = validateJwt(jwt);
  }
  catch (ex){
      valid = false;
  }
  if(valid){
      initialState.login = true;
      initialState.userDetails = getUserDetails();
  }
  else{
      initialState.login = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("userDetails");
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
    case ACTION_TYPES.SET_CAR_PROPERTIES_ID:
        newState.carPropertiesId = action.value;
        break;
    case ACTION_TYPES.SET_VARIANT:
        newState.variant = action.value
        break;
    case ACTION_TYPES.SET_MODEL_KEY_SPECS:
        newState.enginecc = action.value.enginecc;
        newState.bhp = action.value.bhp;
        newState.mileage = action.value.mileage;
        break;
        

      default:
      break;
    }

    return newState;
}

export default rootReducer;