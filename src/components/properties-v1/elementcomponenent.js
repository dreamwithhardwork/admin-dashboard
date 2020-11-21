import { connect } from "react-redux";
import { Delete, Edit, Clear, Done } from "@material-ui/icons";
import { ACTION_TYPES } from "../constants/constants";

const { FormGroup, TextField, MenuItem, FormControlLabel } = require("@material-ui/core");
const { useState } = require("react");

function ElementComponenet(props){

    console.log(props)
    const[disabledProps,setDisabledProps] = useState(true);
    const[nameValue,setNameValue]=useState(props.data.name);
    const[dataType,setDataType] =useState(props.data.propertyDataType);
    const[edit,setEdit]=useState(false);
    
    const handleEdit = () => {
        setEdit(true)
        setDisabledProps(false);
    }
    const handleClear = () => {
      setNameValue(props.data.name);
      setDataType(props.data.propertyDataType);
      setEdit(false);
      setDisabledProps(true);
    }
    const handleDelete = () => {
      let name = props.data.name;
      let newCarProperty =  {...props.carProperties}
      let subdata = newCarProperty[props.activeCarProperty];
      subdata.splice(props.index,1);
      newCarProperty[props.activeCarProperty] = subdata;
      props.dispatch({type:ACTION_TYPES.SET_CAR_PROPERTIES,value:newCarProperty})
    }
    const handleSave = () => {
      let newCarProperty =  {...props.carProperties}
      let subdata = [...newCarProperty[props.activeCarProperty]];
      subdata[props.index].name = nameValue;
      subdata[props.index].propertyDataType = dataType;
      newCarProperty[props.activeCarProperty] = subdata;
      newCarProperty[props.activeCarProperty] = subdata;
      props.dispatch({type:ACTION_TYPES.SET_CAR_PROPERTIES,value:newCarProperty});
      setEdit(false);
      setDisabledProps(true);
    }
    const handleNameChange = (e) => {
          setNameValue(e.target.value);
    }
    const handleDataTypeChange = (e) => {
       setDataType(e.target.value)
    }


    return (
        <FormGroup className="variant-form-group variant-row" row={true}>
        <TextField disabled={disabledProps} onChange={handleNameChange} value={disabledProps?props.data.name:nameValue} 
        placeholder="property name*" ></TextField>
        <TextField disabled={disabledProps} onChange={handleDataTypeChange} select value={disabledProps?props.data.propertyDataType:dataType} 
        helperText="Please select data type">
          {["STRING", "NUMBER", "COLOR","BOOLEAN"].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        {
            !edit?[<FormControlLabel control={<Edit onClick={handleEdit} />}/>,
              <FormControlLabel style={{visibility:"hidden"}} control={<Clear onClick={handleClear}/>}/>,
              <FormControlLabel style={{visibility:"hidden"}} control={<Clear onClick={handleClear}/>}/>]
            :[<FormControlLabel control={<Clear onClick={handleClear}/>}/>
            , <FormControlLabel control={<Done onClick={handleSave}/>}/>
            , <FormControlLabel control={<Delete id="delete-prop" onClick={handleDelete}/>}/>]
        }
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

export default connect(mapStateToProps,mapDispatchToProps) (ElementComponenet)