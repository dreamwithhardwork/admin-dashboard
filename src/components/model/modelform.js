import { CloudUpload, Add, Delete, Save, ArrowBack, Done } from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab"
import React, { useState } from 'react'
import './modelstyle.css';
import { useHistory } from "react-router-dom";
import {handleDescriptionChange,handleNameChange,handlePopularityChange,onUploadFiles} from './modelformservices';

const { FormGroup, Switch, TextField, Container, FormControlLabel,  Button,  DialogActions, DialogTitle, Divider, Chip, ListItemText } = require("@material-ui/core");

function ModelForm(props) {


    
    const defaultState = {
        color: "select color",
        images: []
    }

    const history = useHistory();
    const initialState = [];
    initialState.push(defaultState);
    const[colorImages, setColors] = useState(initialState)
    const addnewColor = () => {
            let newState = [...colorImages];
            newState.push(defaultState);
            setColors(newState);
    }

    const deleteColor = (index) => {
        console.log(index+"ij")
        let newState = [...colorImages];
        console.log(newState)
        newState.splice(index,1);
        setColors(newState);
    }

    const saveImages = (index, newImages) => {
        debugger;
        let newState = [...colorImages];
        newState[index].images = newImages;
        setColors(newState);
    }

    const deleteImage = (index, image) => {
        debugger;
        let newState = [...colorImages];
        let indexOf = newState[index].images.indexOf(image);
        newState[index].images.splice(indexOf,1);
        setColors(newState);
    }

    return (
       <React.Fragment>
            <Container style={{width:"40%",minWidth:"300px",marginTop:"40px"}}>
                <FormGroup>
            <FormControlLabel control={<ArrowBack onClick={()=>history.push("/make")}/>}></FormControlLabel></FormGroup>
            <DialogTitle id="simple-dialog-title">Add new model</DialogTitle>
            <Divider/>
            <FormGroup className="formgroup">
                <FormGroup row={true} style={{display:"flex",justifyContent:"space-between"}}>
                <TextField onChange={handleNameChange} placeholder={"name*"}></TextField>
                <TextField disabled placeholder={"make*"}></TextField>
                <FormControlLabel onChange={handlePopularityChange} labelPlacement="end" control={<Switch />} label="Popular" />
                </FormGroup>
                <TextField onChange={handleDescriptionChange} multiline rows={3} placeholder={"description*"}/>
            </FormGroup>
            
          {
              colorImages.map((item, key) => {
                  console.log(key);
                 return  <ImagesComponent data={colorImages} deleteImage ={deleteImage} saveImages = {saveImages} index={key} delete={deleteColor} append={addnewColor} />
              })
          }
          <Divider></Divider>
          <DialogActions style={{marginTop:"10px"}}>
                <Button variant="contained" color="primary">Reset</Button>
                <Button variant="contained" color="primary" disabled startIcon={<Save />}>Save</Button>
            </DialogActions>
            
        </Container>
       </React.Fragment>
    )
}




function ImagesComponent(props){

    const colors = ["White", "Silver","Black", "Grey","Blue","Red","Brown","Yellow","Green"]
    return(
        <React.Fragment>
        <FormGroup  className="formgroup" row={true}>
            <Autocomplete onSelect={(e)=>{console.log(e.target.value)}} size="small" style={{marginRight:"30px",width:200}} id="combo-box-demo" options={colors}
                getOptionLabel={option => { return option; }}
                renderOption={(option) => (
                    <React.Fragment>
                        <ListItemText style={{ color: "black" }}> {option}</ListItemText>
                    </React.Fragment>
                )}
                renderInput={(params) => <TextField  {...params} label="Color" variant="outlined" />} />
         
                <input  onChange={(e)=> {onUploadFiles(e,props.saveImages,props.index);}} multiple accept="image/*" style={{ display: "none" }} 
                id={"icon-button"+props.index} type="file" />
                <label style={{marginRight:"40px",width:300}} style={{width:"fit-content"}} for={"icon-button"+props.index}>
                <Button  variant="contained" component="span" color="default" startIcon={<CloudUpload />}>Upload</Button></label>
                <FormControlLabel control={<Add onClick={() => props.append()} />}/>
                {props.index!==0?<FormControlLabel control={<Delete onClick={() => props.delete(props.index)} />}></FormControlLabel>:""}
            </FormGroup>
            <FormGroup row={true}>
                {
                    props.data[props.index].images.map((item,key) => {
                        return <Chip key={key} label ={item} onDelete={() => {
                            props.deleteImage(props.index,item);
                        }} clickable />
                    })
                }
            </FormGroup>
            </React.Fragment>
    )
}

export default ModelForm