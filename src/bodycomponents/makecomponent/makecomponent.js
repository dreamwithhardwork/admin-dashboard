import { Box } from "@material-ui/core";
import Model from "../../components/model/model";
import Make from "../../components/make/make";

function MakeComponent(){
    return(
          <div style={{display:"flex", width:"100%"}} >
            <Make/> <Model/>
          </div>
    )
}

export default MakeComponent;