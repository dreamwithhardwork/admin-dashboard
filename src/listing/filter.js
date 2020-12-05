import { CheckBox, ExpandMore } from '@material-ui/icons';
import './CarListingCard.css'
const { Paper, MenuList, List, Typography, Slider, Divider, Accordion, AccordionSummary, FormControlLabel, Checkbox, FormGroup, RadioGroup, Radio, FormLabel } = require("@material-ui/core");

function valuetext(value) {
    return `${value}°C`;
  }

  const brands = ["Hyundai", "Maruti", "Kia", "Ford"]

function Filter(props){
    return(
        <Paper className="side-nav-filter">
           <div style={{margin:"0px 7px"}}>
              
                  <h4>Budget</h4>
               
              
              <div style={{marginTop:"20px"}}>
              <div style={{display:"flex",justifyContent:"space-between"}}>
                     <div>50,000/-</div>
                     <div>20,00,000/-</div>
                 </div>
              <Slider
                 defaultValue={60000}
                 aria-labelledby="discrete-slider-always"
                 valueLabelDisplay="auto"
                 step={10000}
                 min={50000}
                 max={2000000} />
                 <div style={{display:"flex",justifyContent:"space-between", marginBottom:"25px"}}>
                     <div>Minimum Price</div>
                     <div>Maximum Price</div>
                 </div>
              </div>

              <Divider/>

            {
                brands.map(item => <Accordion>
                    <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1bh-content"
                id="panel1bh-header">
                    <FormControlLabel
                  aria-label="Acknowledge"
                  onClick={(event) => event.stopPropagation()}
                  onFocus={(event) => event.stopPropagation()}
                  control={<Checkbox />}
                  label={item}
                />
                  </AccordionSummary>
                  </Accordion>)
            }
    <h4>Year</h4>

      <RadioGroup aria-label="Year" name="Year" >
        <FormControlLabel value="" control={<Radio />} label="2019 & above" />
        <FormControlLabel value="male" control={<Radio />} label="2018 & above" />
        <FormControlLabel value="other" control={<Radio />} label="2017 & above" />
        <FormControlLabel value="disabled" control={<Radio />} label="2016 & above" />
        <FormControlLabel value="male" control={<Radio />} label="2015 & above" />
        <FormControlLabel value="other" control={<Radio />} label="2014 & above" />
        <FormControlLabel value="disabled" control={<Radio />} label="2013 & above" />
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