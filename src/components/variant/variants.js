import { connect } from "react-redux"
import { Paper, Tabs, Tab, List, ListItem, ListItemText, IconButton, ListItemSecondaryAction, Button, ListItemIcon } from "@material-ui/core";
import { Add, CheckBox, Delete } from "@material-ui/icons";
import { Fragment } from "react";
import { useHistory } from "react-router-dom";
import MakeTableView from "../make/maketableview";

function VariantsList(props){
    const history = useHistory();
    history.push()
    return(
       <Fragment>
          <Paper style={{ marginTop: "20px"}} square>
          <Tabs variant="scrollable" indicatorColor="primary" textColor="primary" aria-label="disabled tabs example">
            <Tab label="Petrol Version" />
            <Tab label="Automatic Version" />
            <Tab label="Other" />
            <Tab icon={<Add onClick={() => {history.push("/addVariant?id=new")}}/>} />
          </Tabs>
        </Paper>
      <div style={{maxHeight:"calc(100vh - 390px)",overflow:"auto",marginTop:"5px"}}>
      <MakeTableView/>
      </div>
      
       
       </Fragment>
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

export default connect(mapStateToProps,mapDispatchToProps)(VariantsList)