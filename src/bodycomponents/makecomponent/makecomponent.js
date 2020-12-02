import { Divider} from "@material-ui/core";
import Model from "../../components/model/model";
import Make from "../../components/make/make";
import React from 'react'
import ModelDetails from "../../components/model/modeldetails";
import VariantList from "../../components/variant/variants";
import '../makecomponent/makecomponent.css';

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
        <VariantList/>
      </div>
    </div>
  )
}

export default MakeComponent;