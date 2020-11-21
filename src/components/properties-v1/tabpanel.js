import { connect } from "react-redux";
import { useEffect, useState } from "react";
import ElementComponenet from "./elementcomponenent";
import { Add, Save } from "@material-ui/icons";
import { ACTION_TYPES } from "../constants/constants";
import {saveProperties} from './carpropertiesservices';

const { Container, DialogTitle, Divider, FormGroup, TextField, MenuItem, FormControlLabel, DialogActions, Button } = require("@material-ui/core");

function TabPanel(props){


    const handleSave = async () => {
        debugger;
        const payload =  {
            availableProps:props.carProperties
        }
        if(props.carPropertiesId!==""){
            payload.id = props.carPropertiesId;
        }
        let body =  await saveProperties(payload);
        console.log(body);
        props.dispatch({type:ACTION_TYPES.SET_CAR_PROPERTIES_ID,value:body.id})
        props.dispatch({type:ACTION_TYPES.SET_CAR_PROPERTIES,value:body.availableProps})
    }

    useEffect(() => {
    },[props.activeCarProperty])

    return (
        <Container>
            <div style={{display:"block",width:"100%",height:"calc(100vh - 200px)",overflow:"auto"}}>
            {
                props.activeCarProperty === ""?[]:
                [<DialogTitle>{props.activeCarProperty} properties</DialogTitle>,
                    <Divider/>,
                        props.activeCarProperty===""?[]:
                        props.carProperties[props.activeCarProperty].map((item,index) => {
                            return <ElementComponenet key={index} index={index} data = {item}/>
                        }),
                    <AddNewElement {...props}/>]
            }
            </div>
            <Divider></Divider>
            <DialogActions style={{position:"relative", marginTop: "10px" }}>
                <Button variant="contained" color="primary">Reset</Button>
                <Button onClick={handleSave} variant="contained" color="primary" startIcon={<Save />}>Save</Button>
            </DialogActions>
        </Container>
    )
}

function AddNewElement(props){

    const[name,setName] = useState("");
    const[dataType,setDataType] = useState("STRING");

    const handleName = (e) => {
        setName(e.target.value)
    }

    const handleDateType = (e) => {
        setDataType(e.target.value)
    }

    const handleAddNew = () => {
        let newCarProps = {...props.carProperties}
        let newSubProperty = newCarProps[props.activeCarProperty] ===undefined?[]:[...newCarProps[props.activeCarProperty]]
        newSubProperty.push({name:name,propertyDataType:dataType});
        newCarProps[props.activeCarProperty] = newSubProperty;
        console.log(newCarProps)
        props.dispatch({type:ACTION_TYPES.SET_CAR_PROPERTIES,value:newCarProps})
        setName("");
        setDataType("STRING")
    }

    return(
        <FormGroup className="variant-form-group variant-row" row={true}>
        <TextField onChange={handleName} value={name}  placeholder="property name*" ></TextField>
        <TextField onChange={handleDateType} select value={dataType} 
        helperText="Please select data type">
          {["STRING", "NUMBER", "COLOR","BOOLEAN"].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <FormControlLabel onClick={handleAddNew} control={<Add/>}/>
        <FormControlLabel style={{visibility:"hidden"}} control={<Add/>}/>
        <FormControlLabel style={{visibility:"hidden"}} control={<Add/>}/>
      </FormGroup>
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

export default connect(mapStateToProps,mapDispatchToProps)(TabPanel)