import { CloudUpload, Add, Delete, Save, ArrowBack, Done } from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab"
import React, { useState } from 'react'
import './modelformstyle.css';
import { useHistory } from "react-router-dom";
import { handleDescriptionChange, handleNameChange, handlePopularityChange, onUploadFiles } from './modelformservices';
import { connect } from "react-redux";
import SimpleBackdrop from "../messages/backdrop";
import ToastMessage from "../messages/toastmessage";
import { ACTION_TYPES,SERVICE_URL} from '../constants/constants'
import {postRequest} from '../constants/headers';
import ModelImage from "./modelimages";

const { FormGroup, Switch, TextField, Container, FormControlLabel, Button, DialogActions, DialogTitle, Divider, Chip, ListItemText } = require("@material-ui/core");

function ModelForm(props) {



    const defaultState = {
        color: "select color",
        images: []
    }

    const history = useHistory();
    const initialState = [];
    initialState.push(defaultState);
    const [colorImages, setColors] = useState(initialState)
    const addnewColor = () => {
        let newState = [...colorImages];
        newState.push(defaultState);
        setColors(newState);
    }

    const deleteColor = (index) => {
        console.log(index + "ij")
        let newState = [...colorImages];
        console.log(newState)
        newState.splice(index, 1);
        setColors(newState);
    }

    const saveImages = (index, color, newImages) => {
        debugger;
        let newState = [...colorImages];
        let imgs = [...newState[index].images];
        for(let i=0;i<newImages.length;i++){
            imgs.push(newImages[i]);
        }
        newState[index].images = imgs;
        newState[index].color = color;
        setColors(newState);
    }

    const deleteImage = (index, image) => {
        debugger;
        let newState = [...colorImages];
        let indexOf = newState[index].images.indexOf(image);
        newState[index].images.splice(indexOf, 1);
        setColors(newState);
    }
    const handleSwitchToggle = (e) => {
        setPopularity(e.target.checked);
    }
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [popular, setPopularity] = useState(false)
    const [saveDisabled, setsaveDisabled] = useState(true)

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

     const uploadLogo = async (file) => {

        var data = new FormData()
        file.forEach((f)=> {
            data.append('files', f)
        })
        
        let res =  await fetch("https://image-service-cemhl7ajqq-uc.a.run.app/api/upload", {
            method:"POST",
            body: data,
            files: file
        });
        let body = await res.json();
        return body;
     }
    const handleSave = async () => {

        props.dispatch({type:ACTION_TYPES.OPEN_BACKDROP})
        const payload = {};
        for(let i=0;i<colorImages.length;i++){
            if(colorImages[i].color!=="select color"){
                let res = await uploadLogo(colorImages[i].images);
                payload[colorImages[i].color] = Object.values(res);
                if(i==colorImages.length-1){
                    const body ={
                        name: "",
                        description:"",
                        make:props.activeBrand,
                        popular:false,
                        imagesWithColors:payload
                    }
                    body.name = name;body.description=desc;body.popular=popular;
                    console.log(body);
                    saveNewModel(body)
                }
            }
        }

        

        
    }

    const saveNewModel =  async (payload) => {
       let response =  await fetch(SERVICE_URL.ADD_NEW_MODEL,postRequest(payload))
       let body = await response.json();
       console.log(body)
       props.dispatch({type:ACTION_TYPES.CLOSE_BACKDROP})
       props.dispatch({type:ACTION_TYPES.TOAST,toast:{
        open: true,
        severity: "success",
        message:"new model "+body.name +" saved successfully"
        }})
        setDesc("");
        setName("");
        setsaveDisabled(true);
        setColors(initialState);
        let newModels = [...props.models];
        newModels.push(body);
        props.dispatch({type:ACTION_TYPES.ADD_MODELS,value:newModels});

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
                    <FormControlLabel onChange={handlePopularityChange}  labelPlacement="end" control={<Switch checked={popular} onChange={handleSwitchToggle} />} label="Popular" />
                </FormGroup>
                <TextField rowsMax={8} onChange={handleDescriptionChange} value={desc} multiline rows={3} placeholder={"description*"} />
            </FormGroup>
            
            <ModelImage initialState={[]}/>

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


 function ImagesComponent(props) {

    const colors = ["White", "Silver", "Black", "Grey", "Blue", "Red", "Brown", "Yellow", "Green"]

    const [color, setColor] = useState("");
    const [disabledUpload, setdisabledUpload] = useState(true);

    const onSelection = (e, value) => {
        setColor(value);
        value === "" ? setdisabledUpload(true) : setdisabledUpload(false)

    }



    return (
        <React.Fragment>
            <FormGroup className="formgroup" row={true}>
                <Autocomplete onChange={onSelection} size="small" style={{ marginRight: "30px", width: 200 }} id="combo-box-demo" options={colors}
                    getOptionLabel={option => { return option; }}
                    disableClearable={true}
                    renderOption={(option) => (
                        <React.Fragment>
                            <ListItemText style={{ color: "black" }}> {option}</ListItemText>
                        </React.Fragment>
                    )}
                    renderInput={(params) => { return <TextField value={"select"} {...params} label="Color" variant="outlined" /> }} />

                <input onChange={(e) => { onUploadFiles(e, props.saveImages, props.index,color); }} multiple accept="image/*" style={{ display: "none" }}
                    id={"icon-button" + props.index} type="file" />
                <label onClick={(e) => { if (disabledUpload) e.preventDefault() }} style={{ marginRight: "40px", width: 300 }} style={{ width: "fit-content" }} for={"icon-button" + props.index}>
                    <Button disabled={disabledUpload} variant="contained" component="span" color="default" startIcon={<CloudUpload />}>Upload</Button></label>
                <FormControlLabel control={<Add onClick={() => props.append()} />} />
                {props.index !== 0 ? <FormControlLabel control={<Delete onClick={() => props.delete(props.index)} />}></FormControlLabel> : ""}
            </FormGroup>
            <FormGroup row={true}>
                {
                    props.data[props.index].images.map((item, key) => {
                        return <Chip key={key} label={item.name} onDelete={() => {
                            props.deleteImage(props.index, item);
                        }} clickable />
                    })
                }
            </FormGroup>
        </React.Fragment>
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