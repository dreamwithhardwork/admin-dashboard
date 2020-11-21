
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Container, TextField, FormGroup, MenuItem, FormControlLabel, DialogTitle, Divider, DialogActions, Button } from '@material-ui/core';
import { Add, Save, Edit } from '@material-ui/icons';
import '../variant/variantform.css';
import { useState } from 'react';

function TabPanel(props) {
    return (
      <Container id="simple-tabpanel" role="tabpanel" aria-labelledby="simple-tab">
      <DialogTitle>{props.label} properties</DialogTitle>
      <Divider />
      <div style={{maxHeight:"calc(100vh - 350px )",overflow:"auto"}}>
      {
        props.data.map((item,index) => {
            const initialValue = item.name;
            return <ELementComponent initial={initialValue} key={index} data ={item}/>
        })
      }
    </div>
    <FormGroup className="variant-form-group variant-row" row={true}>
        <TextField placeholder="property name*" ></TextField>
        <TextField select value="STRING" helperText="Please select data type">
          {["STRING", "NUMBER", "COLOR","BOOLEAN"].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <FormControlLabel control={<Add onClick={() => console.log("asbh")} />} />
      </FormGroup>

    <Divider></Divider>
            <DialogActions style={{ marginTop: "10px" }}>
                <Button variant="contained" color="primary">Reset</Button>
                <Button variant="contained" color="primary" startIcon={<Save />}>Save</Button>
            </DialogActions>
  </Container>
    );
  }



  function ELementComponent(props){
      console.log(props)
      const[disabledProps, setDisabled] = useState(true)
      const handleEdit = () => {
        setDisabled(false)
      }
      return (
        <FormGroup className="variant-form-group variant-row" row={true}>
        <TextField disabled={disabledProps} value={props.data.name} placeholder="property name*" ></TextField>
        <TextField disabled={disabledProps} select value={props.data.propertyDataType} helperText="Please select data type">
          {["STRING", "NUMBER", "COLOR","BOOLEAN"].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <FormControlLabel onClick={handleEdit} control={<Edit onClick={() => console.log("asbh")} />} />
      </FormGroup>
      )
  }


  export default TabPanel;