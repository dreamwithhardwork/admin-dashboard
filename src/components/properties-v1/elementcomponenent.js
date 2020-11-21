import { connect } from "react-redux";
import { Delete, Edit, Clear, Done } from "@material-ui/icons";

const { FormGroup, TextField, MenuItem, FormControlLabel } = require("@material-ui/core");
const { useState } = require("react");

function ElementComponenet(props){

    console.log(props)
    const[disabledProps,setDisabledProps] = useState(true);
    const[nameValue,setNameValue]=useState("");
    const[dataType,setDataType] =useState(props.data.propertyDataType);
    const[edit,setEdit]=useState(false);
    
    const handleEdit = () => {
        setEdit(true)
        setDisabledProps(false)
    }
    const handleClear = () => {
      setEdit(false)
      setDisabledProps(true)
    }
    const handleDelete = () => {

    }
    const handleSave = () => {

    }
    const handleNameChange = () => {

    }
    const handleDataTypeChange = () => {

    }


    return (
        <FormGroup className="variant-form-group variant-row" row={true}>
        <TextField disabled={disabledProps} onChange={handleNameChange} value={props.data.name} placeholder="property name*" ></TextField>
        <TextField disabled={disabledProps} onChange={handleDataTypeChange} select value={props.data.propertyDataType} helperText="Please select data type">
          {["STRING", "NUMBER", "COLOR","BOOLEAN"].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        {
            !edit?[<FormControlLabel control={<Edit onClick={handleEdit} />}/>,
              <FormControlLabel style={{visibility:"hidden"}} control={<Clear onClick={handleClear}/>} />,
              <FormControlLabel style={{visibility:"hidden"}} control={<Clear onClick={handleClear}/>} />]
            :[<FormControlLabel control={<Clear onClick={handleClear}/>} />
            ,<FormControlLabel control={<Done onClick={handleSave}/>}/>
            ,<FormControlLabel control={<Delete onClick={handleDelete}/>}/>]
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