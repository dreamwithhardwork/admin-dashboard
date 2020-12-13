import { Save, ArrowBack } from "@material-ui/icons";
import React, { useState, useEffect } from 'react'
import './modelformstyle.css';
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import SimpleBackdrop from "../messages/backdrop";
import ToastMessage from "../messages/toastmessage";
import { ACTION_TYPES,SERVICE_URL} from '../constants/constants'
import {postRequest} from '../constants/headers';
import ModelImage from "./modelimages";
import { getColorImagesPayload, setColorImagesPayload } from "./modelformservices";

const { FormGroup, Switch, TextField, Container, FormControlLabel, Button, DialogActions, DialogTitle, Divider, MenuItem } = require("@material-ui/core");

function ModelForm(props) {


    const history = useHistory();
    const handleSwitchToggle = (e) => {
        setPopularity(e.target.checked);
    }
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [popular, setPopularity] = useState(false)
    const [saveDisabled, setsaveDisabled] = useState(true)
    const [images, setImages] = useState([]);
    const [bodyType, setBodyType] = useState("SEDAN")

    useEffect(()=> {
      if(props.update){
          console.log(props)
          setName(props.activeModel.name);
          setDesc(props.activeModel.description);
          setPopularity(props.activeModel.popular)
          setsaveDisabled(false)
          setBodyType(props.activeModel.bodyType);
          setImages(setColorImagesPayload(props.activeModel.imagesWithColors));
      }
    },[])

    const handleNameChange = (e) => {
        let value = e.target.value;
        if (value.length > 1 && desc.length > 50) {
            setsaveDisabled(false)
        }
        else {
            setsaveDisabled(true)
        }
        setName(value)

    }

    const handleDescriptionChange = (e) => {
        let value = e.target.value;
        if (value.length > 50 && name.length > 1) {
            setsaveDisabled(false)
        }
        else {
            setsaveDisabled(true)
        }
        setDesc(value)
    }

    const handleSave = async () => {
      props.dispatch({type:ACTION_TYPES.OPEN_BACKDROP});
      let payload =  {
            description: desc,
            imagesWithColors: {},
            make: props.activeBrand,
            name: name,
            popular: true,
            bodyType: bodyType
          }
          if(props.update){
              payload._id = props.activeModel._id;
          }
          payload.imagesWithColors = getColorImagesPayload(images);
          console.log(payload)
          saveNewModel(payload)
    }

    const saveNewModel =  async (payload) => {
       let response =  await fetch(SERVICE_URL.ADD_NEW_MODEL,postRequest(payload))
       let body = await response.json();
       console.log(body)
       props.dispatch({type:ACTION_TYPES.TOAST,toast:{
        open: true,
        severity: "success",
        message:"new model "+body.name +" saved successfully"
        }})
        
        let newModels = [...props.models];
        newModels.push(body);
        props.dispatch({type:ACTION_TYPES.ADD_MODELS,value:newModels});
        setTimeout(()=>{
            setDesc("");
            setName("");
            setsaveDisabled(true);
           props.dispatch({type:ACTION_TYPES.CLOSE_BACKDROP})
           history.push("/make")
        },2000)

    }




    return (
        <Container className="model-form-container">
            <FormGroup>
                <FormControlLabel label="&nbsp;&nbsp;&nbsp;Back" control={<ArrowBack onClick={() => history.push("/make")} />}></FormControlLabel></FormGroup>
            <DialogTitle id="simple-dialog-title">Add new model</DialogTitle>
            <Divider />

            <FormGroup className="formgroup">
                <FormGroup row={true} style={{ display: "flex", justifyContent: "space-between" }}>
                    <TextField onChange={handleNameChange} value={name} placeholder={"name*"}></TextField>
                    <TextField disabled value={props.activeBrand} placeholder={"make*"}></TextField>
                    <FormControlLabel labelPlacement="end" control={<Switch checked={popular} onChange={handleSwitchToggle} />} label="Popular" />
                </FormGroup>
                <TextField value={bodyType} onChange={(e)=>setBodyType(e.target.value)} select helperText="Please select body type">
                   {["SEDAN","HATCHBACK","COUPE","SUV","XUV","MUV","LUXURY","WAGON"].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
               </TextField>
                <TextField rowsMax={8} onChange={handleDescriptionChange} value={desc} multiline rows={3} placeholder={"description*"} />
            </FormGroup>
            
            {
               !saveDisabled ? <ModelImage  brand={props.activeBrand} rows={images} update={setImages}/> : ""
            }
            

            <Divider></Divider>
            <DialogActions style={{ marginTop: "10px" }}>
                <Button variant="contained" color="primary">Reset</Button>
                <Button onClick={handleSave} variant="contained" color="primary" disabled={saveDisabled} startIcon={<Save />}>Save</Button>
            </DialogActions>
     
        <SimpleBackdrop open = {props.backdrop}/>
        <ToastMessage close= {()=> {props.dispatch({type:ACTION_TYPES.TOASTRESET})}}  open={props.toast.open}  
        severity={props.toast.severity} message={props.toast.message}></ToastMessage>
        </Container>
    )
}

const mapStateToProps = state => {
    return {
        ...state
    }
}

const mapDispatchToProps = dispatch => {
    return{
        dispatch
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ModelForm)