import { Box, Divider, Paper, Tabs, Tab } from "@material-ui/core";
import Model from "../../components/model/model";
import Make from "../../components/make/make";
import React from 'react'
import ModelDetails from "../../components/model/modeldetails";

function MakeComponent(){
  const [value, setValue] = React.useState(2);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
    return(
      <React.Fragment>
          <div style={{display:"flex", width:"50%",flexDirection:"column",overflow:"auto",minWidth:"400px"}} >
            <Make/>
            <Divider/> <Model/>
          </div>
          <div style={{display:"flex", flexDirection:"column",flexGrow:1}}>
            <div style={{width:"100%"}}>
              <ModelDetails/>
              </div>
              
              <Paper style={{marginTop:"20px"}} square>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        <Tab label="Petrol Version" />
        <Tab label="Automatic Version" />
        <Tab label="Other" />
      </Tabs>
    </Paper>
          </div>
      </React.Fragment>
    )
}

export default MakeComponent;