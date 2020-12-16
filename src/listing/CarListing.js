import { useEffect, useState, useReducer } from "react";
import { SERVICE_URL } from "../components/constants/constants";
import Filter from "./filter";
import {getRequest, putRequest} from '../components/constants/headers'
import SimpleBackdrop from "../components/messages/backdrop";
import {initialState, reducer} from './localreducer';
import { ACTIONS } from "./actions";

const { Container, Paper, Chip } = require("@material-ui/core");
const { default: CarListingCard } = require("./CarListingCard");

function CarListing(props){

    let [localState, localDispatch] = useReducer(reducer,initialState)
    let [models, setModels] = useState([]);
    let [loaded, setLoaded] = useState(false);

    const handleBodyTypeChange = async (e) => {
      let newBodyTypes = [...localState.filter.bodyTypes];
      let newState = {...localState};
      let name = e.target.name;
      if(e.target.checked)
      newBodyTypes.push(name);
      else
      newBodyTypes.splice(newBodyTypes.indexOf(name),1);
      console.log(newBodyTypes);
      newState.filter.bodyTypes = newBodyTypes;
      let response = await fetch(SERVICE_URL.GET_ALL_MODEL,putRequest(newState.filter));
      let body = await response.json();
      console.log(body);
      localDispatch({type:ACTIONS.GET_MODELS,value:body});
   }

   const handlePrices = async (prices) => {
    let newState = {...localState};
     newState.filter.minPrice = prices[0];
     newState.filter.maxPrice = prices[1];
     let response = await fetch(SERVICE_URL.GET_ALL_MODEL,putRequest(newState.filter));
      let body = await response.json();
      console.log(body);
      localDispatch({type:ACTIONS.GET_MODELS,value:body});
   }

    useEffect(async ()=> {
      console.log(localState);
      console.log(localDispatch);
      let resp = await fetch(SERVICE_URL.GET_ALL_MODELS, getRequest());
      let models = await resp.json();
      setModels(models);
      localDispatch({type:ACTIONS.GET_MODELS,value:models})
      
      setTimeout(()=>{
        setLoaded(true);
      },200)
      console.log(models);
    },[])

    return(
      loaded?<Container style={{marginTop:"20px", width:"100%", display:"flex",flexWrap:"wrap",flexDirection:"column"}}>
      <Filter filter={handleBodyTypeChange} filterPrices = {handlePrices} />
      <div style={{maxWidth:"100%", display:"flex",flexWrap:"wrap", overflow:"auto"}}>
        {
          console.log(localState)
        }
      {
           localState.models.map(model => <CarListingCard  model ={model}/>)
      }
       
      </div>
      </Container>: <SimpleBackdrop open={localState.loading}/>    
    )
}

export default CarListing;