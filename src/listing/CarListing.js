import { useEffect, useState } from "react";
import { SERVICE_URL } from "../components/constants/constants";
import Filter from "./filter";
import {getRequest} from '../components/constants/headers'
import SimpleBackdrop from "../components/messages/backdrop";

const { Container, Paper, Chip } = require("@material-ui/core");
const { default: CarListingCard } = require("./CarListingCard");

function CarListing(props){

    let [models, setModels] = useState([]);
    let [loaded, setLoaded] = useState(false);

    useEffect(async ()=> {
      let resp = await fetch(SERVICE_URL.GET_ALL_MODELS, getRequest());
      let models = await resp.json();
      setModels(models);
      setTimeout(()=>{
        setLoaded(true);
      },200)
      console.log(models);
    },[])

    return(
      loaded?<Container style={{marginTop:"20px", width:"100%", display:"flex",flexWrap:"wrap",flexDirection:"column"}}>
      <Filter/>
      <div style={{maxWidth:"100%", display:"flex",flexWrap:"wrap", overflow:"auto"}}>
      {
           models.map(model => <CarListingCard model ={model}/>)
       }
       
      </div>
      </Container>: <SimpleBackdrop open={true}/>    
    )
}

export default CarListing;