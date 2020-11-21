import { useState } from "react";
import { useStyles } from './carspecificationstyle'
import { connect } from "react-redux";
import { ACTION_TYPES } from "../constants/constants";

const { Tab, Input, FormControlLabel, InputAdornment } = require("@material-ui/core");
const { Edit, Save, Clear, Done, Delete } = require("@material-ui/icons");

function CarSpecificationType(props){

    const classes = useStyles()
    const[edit,setEdit] = useState(false);
    const handleActiveTabPanel = () => {
       props.dispatch({type:ACTION_TYPES.SET_ACTIVE_CAR_PROPERTY,value:props.data})
    }
    return(
        <Tab onClick={handleActiveTabPanel} className={classes.tabs} classes={{wrapper: classes.wrapper}} label={!edit?props.data:""} 
        icon={!edit?<Edit onClick={()=>setEdit(true)} />:<EditComponent {...props} edit={setEdit}/>}></Tab>
    ) 
}

function EditComponent(props){

    const[value,setvalue] = useState(props.data);
    
    const handleClearPropertyName = () => {
      props.edit(false)
    }

    const handleSavePropertyName = () => {
         
    }

    const handleDeletePropertyName = () => {

    }

    const handlevalueChange = (event) => {
        setvalue(event.target.value)
    }

    return (
        <Input onChange={handlevalueChange} value={value} endAdornment={<InputAdornment position="end" > 
        <FormControlLabel control={<Clear onClick={handleClearPropertyName}/>}></FormControlLabel> 
        <FormControlLabel control={<Done onClick={handleSavePropertyName}/>}></FormControlLabel>
        <FormControlLabel control={<Delete onClick={handleDeletePropertyName}/>}></FormControlLabel>
       </InputAdornment>}/>
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

export default connect(mapStateToProps,mapDispatchToProps) (CarSpecificationType);