import { CheckBox, ExpandMore } from '@material-ui/icons';
import { Fragment, useEffect, useState } from 'react';
import { SERVICE_URL } from '../components/constants/constants';
import { getRequest } from '../components/constants/headers';
import './CarListingCard.css'
const { Paper,Slider, Divider, Accordion, AccordionSummary, FormControlLabel, Checkbox, FormGroup, RadioGroup, Radio, FormLabel } = require("@material-ui/core");

  

function Filter(props){

  const [brands, setBrands] = useState (["Hyundai", "Maruti", "Kia", "Ford"])
  const[priceRange,setPriceRange] = useState([90000,1000000]);
  useEffect(async ()=>{
     let url = SERVICE_URL.GET_ALL_MAKE_MODELS;
     let response = await fetch(url, getRequest());
     let body = await response.json();
     setBrands(body)
     console.log(body);
  },[])

    return(
        <Paper className="side-nav-filter">
           <div style={{margin:"0px 7px"}}>
              
                  <h4>Budget</h4>
               
              
              <div style={{marginTop:"20px"}}>
              <div style={{display:"flex",justifyContent:"space-between"}}>
              <div>{new Intl.NumberFormat('en-IN', {
                     style: 'currency',
                     currency: 'INR'
                  }).format(priceRange[0])}</div>
                     <div>{new Intl.NumberFormat('en-IN', {
                     style: 'currency',
                     currency: 'INR'
                  }).format(priceRange[1])}</div>
                 </div>
              <Slider
                 aria-labelledby="discrete-slider-always"
                 step={10000}
                 min={50000}
                 max={2000000}
                 defaultValue={[...priceRange]}
                 track="inverted"
                 onChange={(e,value) => {
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
                  aria-label="Acknowledge"
                  onClick={(event) => event.stopPropagation()}
                  onFocus={(event) => event.stopPropagation()}
                  control={<Checkbox name ={item} onClick={(e) => {
                  }}/>}
                  label={item.toLocaleUpperCase()}
                />
                  </AccordionSummary>
                  <Divider/>
                  <div style={{display:"flex",flexDirection:"column", alignItems:"center"}}>
                  <div style={{display:"flex",flexDirection:"column"}}>
                  {
                      Object.keys(brands[item]).map(key => {
                        return <Fragment>
                          <FormControlLabel
                        aria-label={key.toLocaleUpperCase()}
                        onClick={(event) => event.stopPropagation()}
                        onFocus={(event) => event.stopPropagation()}
                        control={<Checkbox   />}
                        label={key.toLocaleUpperCase()}
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
    <h4>Year</h4>

      <RadioGroup aria-label="Year" name="Year" >
        <FormControlLabel value="2019" control={<Radio />} label="2019 & above" />
        <FormControlLabel value="2018" control={<Radio />} label="2018 & above" />
        <FormControlLabel value="2017" control={<Radio />} label="2017 & above" />
        <FormControlLabel value="2016" control={<Radio />} label="2016 & above" />
        <FormControlLabel value="2015" control={<Radio />} label="2015 & above" />
        <FormControlLabel value="2014" control={<Radio />} label="2014 & above" />
        <FormControlLabel value="2013" control={<Radio />} label="2013 & above" />
      </RadioGroup>  

      <h4>Fuel type</h4>

      <FormGroup>
          <FormControlLabel
            control={<Checkbox />}
            label="Petrol"
          />
          <FormControlLabel
            control={<Checkbox  />}
            label="Diesel"
          />
          <FormControlLabel
            control={<Checkbox />}
            label="CNG"
          />
        </FormGroup>

        <h4>Body type</h4>

      <FormGroup>
          <FormControlLabel
            control={<Checkbox />}
            label="Hatchback"
          />
          <FormControlLabel
            control={<Checkbox  />}
            label="Sedan"
          />
          <FormControlLabel
            control={<Checkbox />}
            label="SUV"
          />
        </FormGroup>

        <h4>Transmission</h4>

      <FormGroup>
          <FormControlLabel
            control={<Checkbox />}
            label="Automatic"
          />
          <FormControlLabel
            control={<Checkbox  />}
            label="Manual"
          />
        </FormGroup>

           </div>
        </Paper>
    )
}

export default Filter;