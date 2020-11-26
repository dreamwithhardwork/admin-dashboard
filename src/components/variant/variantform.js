import { connect } from "react-redux"
import { Container, TextField, FormGroup, FormControlLabel, DialogTitle, Divider, FormControl, FormLabel, RadioGroup, Radio, MenuItem, Button } from "@material-ui/core"
import { ArrowBack } from "@material-ui/icons"
import { useHistory } from "react-router-dom"
import './variantform.css';
import { useState } from "react";
import { ACTION_TYPES } from "../constants/constants";
import UploadImageComponent from "./uploadimage";
import {handleYearChange,handleBodyTypeChanges,handleDescchange,handleNameChange,handlePriceChange,handleTypeChange,handleTransmissionChange,saveVariantAndForward} from './variantservice'

function AddVariant(props){

    const history = useHistory();
    const initialVariant = {
        name:"",
        year:0,
        type:"PETROL",
        desc:"",
        bodyType:"HATCHBACK",
        transmission:"",
        price:0.0,
        externalImages:{},
        internalImages:{}
    }
    const[variant,setVariant] = useState(initialVariant);
    




    return(
        <Container>
            <FormGroup className="variant-form-group variant-row">
                <FormControlLabel label="&nbsp;&nbsp;&nbsp;Back" control={<ArrowBack onClick={() => history.push("/make")} />}></FormControlLabel>
            </FormGroup>
            <DialogTitle>Add new variant</DialogTitle>
            <Divider />

            <FormGroup className="variant-form-group variant-row" row={true}>
                <FormControl>
            
            <TextField value={variant.name} onChange={(e) => handleNameChange(e,variant,setVariant)} 
            label="variant name*" variant="standard" placeholder="enter name"></TextField>
            </FormControl>
            <FormControl>
            
            <TextField value={variant.year} onChange={(e)=>handleYearChange(e,variant,setVariant)} type="number" label="Year*" variant="standard" placeholder="enter year"></TextField>
            </FormControl>
            <TextField value={variant.type} onChange={(e)=>handleTypeChange(e,variant,setVariant)} select  helperText="Please select Engine type">
              {["PETROL","DIESEL","ELECTRIC"].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
            </TextField>

            <FormControl component="legend">
                <FormLabel component="legend">Transmission*</FormLabel>
                <RadioGroup onChange={(e)=>handleTransmissionChange(e,variant,setVariant)} value={variant.transmission} aria-label="gender" name="gender1" row={true}>
                    <FormControlLabel value="AUTOMATIC" control={<Radio />} label="AUTOMATIC" />
                    <FormControlLabel value="MANUAL" control={<Radio />} label="MANUAL" />
                </RadioGroup>
            </FormControl>
            
            </FormGroup>

            <FormGroup className="variant-form-group variant-row" row={true}>
               <TextField label="description*" value={variant.desc} onChange={(e)=> handleDescchange(e,variant,setVariant)} 
               multiline placeholder="description*"></TextField>
               <TextField disabled value={props.activeModel.name} placeholder="model*"></TextField>
               <TextField value={variant.bodyType} onChange={(e)=>handleBodyTypeChanges(e,variant,setVariant)} select helperText="Please select body type">
              {["SEDAN","HATCHBACK","COUPE"].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
            ))}
               </TextField>
               <TextField value={variant.price} onChange={(e)=>handlePriceChange(e,variant,setVariant)} label="ex-showroom-price*" placeholder="ex-showroom-price*"></TextField>
            </FormGroup>
                <UploadImageComponent variant={variant} setVariant = {setVariant}/>
         <Divider/>
         <FormGroup style={{marginTop:"40px",display:"flex",flexDirection:"row-reverse"}} >
            
            {/*  <CarProperties addValue={true}/>*/}
             <Button onClick={()=>saveVariantAndForward(variant,history)}  size="small" color="primary" variant="contained">Next</Button>
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