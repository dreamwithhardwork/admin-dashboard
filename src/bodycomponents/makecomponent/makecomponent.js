import { Box, Divider, Paper, Tabs, Tab } from "@material-ui/core";
import Model from "../../components/model/model";
import Make from "../../components/make/make";
import React from 'react'
import ModelDetails from "../../components/model/modeldetails";
import '../makecomponent/makecomponent.css';
import { Add } from "@material-ui/icons";

function MakeComponent() {
  const [value, setValue] = React.useState(2);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
     <div className="makebody"> 
     {/* this is to create makemodel component */}
      <div className="makemodel">
        <Make />
        <Divider />
        <Model />
        <Divider/>
      </div>


      {/* this is to create model display component */}
      <div className="modeldetails-root">
        <div style={{ width: "100%" }}>
          <ModelDetails />
        </div>

        <Paper style={{ marginTop: "20px" }} square>
          <Tabs value={value} indicatorColor="primary" textColor="primary" onChange={handleChange} aria-label="disabled tabs example">
            <Tab label="Petrol Version" />
            <Tab label="Automatic Version" />
            <Tab label="Other" />
            <Tab icon={<Add/>} />
          </Tabs>
        </Paper>
      </div>
    </div>
  )
}

export default MakeComponent;