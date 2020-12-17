import { CheckBox, ExpandMore } from '@material-ui/icons';
import { Fragment, useEffect, useReducer, useRef, useState } from 'react';
import { SERVICE_URL } from '../components/constants/constants';
import { getRequest, putRequest } from '../components/constants/headers';
import './CarListingCard.css'
import { initialState, reducer } from './localreducer';
const { Paper,Slider, Divider, Accordion, AccordionSummary, FormControlLabel, Checkbox, FormGroup, RadioGroup, Radio, FormLabel } = require("@material-ui/core");

  

function Filter(props){

  const [brands, setBrands] = useState (["Hyundai", "Maruti", "Kia", "Ford"])
  const[priceRange,setPriceRange] = useState([50000,4000000]);

  const [makeCheck,setMakeCheck] = useState({});

  const handleMakeChange = (e) => {
    let newMake = {...makeCheck};
    newMake[e.target.name] = e.target.checked;
    console.log(e.target.name)
    console.log(newMake[e.target.name])
    setMakeCheck(newMake)
     
  }

  const handleModelChange = (e) => {
    let newMake = {...makeCheck};
     newMake[e.target.name] = e.target.checked;
    console.log(e.target.name)
    console.log(newMake[e.target.name])
    setMakeCheck(newMake)
  }

  useEffect(async ()=>{
     let url = SERVICE_URL.GET_ALL_MAKE_MODELS;
     let response = await fetch(url, getRequest());
     let body = await response.json();
     Object.keys(body).map(item => {
       makeCheck[item] = false;
       Object.keys(body[item]).map(i => {
         makeCheck[i] = false;
       })
     })
     setBrands(body)
     console.log(makeCheck)
  },[])

    return(
        <Paper className="side-nav-filter">
           <div style={{margin:"0px 7px"}}>
              
                  <h4>Budget</h4>
               
              
              <div style={{marginTop:"20px"}}>
              <div style={{display:"flex",justifyContent:"space-between"}}>
              <div>{new Intl.NumberFormat('en-IN', {
                     style: 'currency',
                     currency: 'INR',
                     maximumSignificantDigits : 3
                  }).format(priceRange[0])}</div>
                     <div>{new Intl.NumberFormat('en-IN', {
                     style: 'currency',
                     currency: 'INR',
                     maximumSignificantDigits : 3
                  }).format(priceRange[1])}</div>
                 </div>
              <Slider 
                 aria-labelledby="discrete-slider-always"
                 step={50000}
                 min={50000}
                 max={20000000}
                 defaultValue={[...priceRange]}
                 track="inverted"
                 onChange={(e,value) => {
                   props.filterPrices([...value]);
                   setPriceRange([...value])
                 }}
                 />
                 <div style={{display:"flex",justifyContent:"space-between", marginBottom:"25px"}}>
                     <div>Minimum Price</div>
                     <div>Maximum Price</div>
                 </div>
              </div>
              <h4>Make & Model</h4>

           <div style={{maxHeight:"300px",overflow:"auto"}}>
           {
                Object.keys(brands).map(item => <Accordion>
                    <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1bh-content"
                id="panel1bh-header">
                    <FormControlLabel
                  onClick={(event) => event.stopPropagation()}
                  onFocus={(event) => event.stopPropagation()}
                  control={<Checkbox name ={item} checked={makeCheck[item]} onClick={(e)=>{props.filterMake(e);handleMakeChange(e);}}/>}
                  label={item.toLocaleUpperCase()}
                />
                  </AccordionSummary>
                  <Divider/>
                  <div style={{display:"flex",flexDirection:"column", alignItems:"center"}}>
                  <div style={{display:"flex",flexDirection:"column"}}>
                  {
                      Object.keys(brands[item]).map(i => {
                        return <Fragment>
                          <FormControlLabel
                        onClick={(event) => event.stopPropagation()}
                        onFocus={(event) => event.stopPropagation()}
                        control={<Checkbox name={i} checked={makeCheck[i]} onChange={(e) => handleModelChange(e)} />}
                        label={i.toLocaleUpperCase()}
                      />
                      <Divider/>
                        </Fragment>
                      })
                    }
                  </div>
                  </div>
                    

                  </Accordion>)
            }
           </div>
    

    {/* 
    <h4>Year</h4>
     <RadioGroup aria-label="Year" name="Year" >
        <FormControlLabel value="2019" control={<Radio />} label="2019 & above" />
        <FormControlLabel value="2018" control={<Radio />} label="2018 & above" />
        <FormControlLabel value="2017" control={<Radio />} label="2017 & above" />
        <FormControlLabel value="2016" control={<Radio />} label="2016 & above" />
        <FormControlLabel value="2015" control={<Radio />} label="2015 & above" />
        <FormControlLabel value="2014" control={<Radio />} label="2014 & above" />
        <FormControlLabel value="2013" control={<Radio />} label="2013 & above" />
      </RadioGroup>   */}

      <h4>Fuel type</h4>

      <FormGroup>
          <FormControlLabel
            control={<Checkbox  name="PETROL" onChange={props.filterFuel} />}
            label="Petrol"
          />
          <FormControlLabel
            control={<Checkbox name="DIESEL"  onChange={props.filterFuel} />}
            label="Diesel"
          />
          <FormControlLabel
            control={<Checkbox name="CNG" onChange={props.filterFuel}/>}
            label="CNG"
          />
        </FormGroup>

        <h4>Body type</h4>

      <FormGroup>
      {
            ["SEDAN","HATCHBACK","COUPE","SUV","XUV","MUV","LUXURY","WAGON"]
            .map(item => {
              return <FormControlLabel
              control={<Checkbox name={item} onChange={props.filter} />}
              label={item}
            />
            })
          }
        </FormGroup>

        <h4>Transmission</h4>

      <FormGroup>
          <FormControlLabel
            control={<Checkbox onChange={props.filterTransmission} name = "AUTOMATIC" />}
            label="Automatic"
          />
          <FormControlLabel
            control={<Checkbox onChange={props.filterTransmission} name = "MANUAL" />}
            label="Manual"
          />
        </FormGroup>

           </div>
        </Paper>
    )
}

export default Filter;