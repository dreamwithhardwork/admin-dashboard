import { connect } from "react-redux"
import { Container, TextField, FormGroup, FormControlLabel, DialogTitle, Divider, FormControl, FormLabel, RadioGroup, Radio, MenuItem, Button } from "@material-ui/core"
import { ArrowBack } from "@material-ui/icons"
import { useHistory } from "react-router-dom"
import './variantform.css';
import { useState } from "react";
import { ACTION_TYPES } from "../constants/constants";
import UploadImageComponent from "./uploadimage";

function AddVariant(props){

    const history = useHistory();
    const [name,setName] = useState("");
    const [year, setYear] = useState("");
    const [type, setType] = useState("PETROL");
    const [desc, setDesc] = useState("");
    const [bodyType, setBodyType] = useState("HATCHBACK");
    const [transmission,setTransmission] = useState("AUTOMATIC");
    const [price, setPrice] = useState("");

    const handleNameChange = (e) => {
        setName(e.target.value)
        let newVariant = {...props.variant}
        newVariant.variantName = e.target.value;
        props.dispatch({type:ACTION_TYPES.SET_VARIANT,value:newVariant});
    }
    
     const handleYearChange = (e) => {
       setYear(e.target.value);
       let newVariant = {...props.variant}
        newVariant.fromYear = e.target.value;
        props.dispatch({type:ACTION_TYPES.SET_VARIANT,value:newVariant});
    }
    
     const handleTypeChange = (e) => {
        setType(e.target.value)
        let newVariant = {...props.variant}
        newVariant.bodyType = e.target.value;
        props.dispatch({type:ACTION_TYPES.SET_VARIANT,value:newVariant});
    }
    
     const handleDescchange = (e) => {
       setDesc(e.target.value)
       let newVariant = {...props.variant}
        newVariant.description = e.target.value;
        props.dispatch({type:ACTION_TYPES.SET_VARIANT,value:newVariant});
    }
    
     const handleBodyTypeChanges = (e) => {
       setBodyType(e.target.value)
       let newVariant = {...props.variant}
        newVariant.bodyType = e.target.value;
        props.dispatch({type:ACTION_TYPES.SET_VARIANT,value:newVariant});
    }

    
     const handlePriceChange = (e) => {
       setPrice(e.target.value)
    }
    const handleTransmissionChange = (e) => {
        setTransmission(e.target.value)
        let newVariant = {...props.variant}
        newVariant.transmission = e.target.value;
        props.dispatch({type:ACTION_TYPES.SET_VARIANT,value:newVariant});
     }



    return(
        <Container>
            <FormGroup className="variant-form-group variant-row">
                <FormControlLabel label="&nbsp;&nbsp;&nbsp;Back" control={<ArrowBack onClick={() => history.push("/make")} />}></FormControlLabel>
            </FormGroup>
            <DialogTitle>Add new variant</DialogTitle>
            <Divider />

            <FormGroup className="variant-form-group variant-row" row={true}>
                <FormControl>
            
            <TextField value={name} onChange={handleNameChange} label="variant name*" variant="standard" placeholder="enter name"></TextField>
            </FormControl>
            <FormControl>
            
            <TextField value={year} onChange={handleYearChange} type="number" label="Year*" variant="standard" placeholder="enter year"></TextField>
            </FormControl>
            <TextField value={type} onChange={handleTypeChange} select  helperText="Please select Engine type">
              {["PETROL","DIESEL","ELECTRIC"].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
            </TextField>

            <FormControl component="legend">
                <FormLabel component="legend">Transmission*</FormLabel>
                <RadioGroup onChange={handleTransmissionChange} value={transmission} aria-label="gender" name="gender1" row={true}>
                    <FormControlLabel value="AUTOMATIC" control={<Radio />} label="AUTOMATIC" />
                    <FormControlLabel value="MANUAL" control={<Radio />} label="MANUAL" />
                </RadioGroup>
            </FormControl>
            
            </FormGroup>

            <FormGroup className="variant-form-group variant-row" row={true}>
               <TextField label="description*" value={desc} onChange={handleDescchange} multiline placeholder="description*"></TextField>
               <TextField disabled value={props.activeModel.name} placeholder="model*"></TextField>
               <TextField value={bodyType} onChange={handleBodyTypeChanges} select helperText="Please select body type">
              {["SEDAN","HATCHBACK","COUPE"].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
            ))}
               </TextField>
               <TextField value={price} onChange={handlePriceChange} label="ex-showroom-price*" placeholder="ex-showroom-price*"></TextField>
            </FormGroup>
                <UploadImageComponent/>
         <Divider/>
         <FormGroup style={{marginTop:"40px",display:"flex",flexDirection:"row-reverse"}} >
            
            {/*  <CarProperties addValue={true}/>*/}
             <Button onClick={() => {history.push("/addVariantProps")}}  size="small" color="primary" variant="contained">Next</Button>
            </FormGroup>

        </Container>
    )

}

const mapStateToProps = state => {
    return {
        ...state
    }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatch
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddVariant);