import React, { useState } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from './tabpanel'
import { Add, Edit, Save, Done, Clear, Delete } from '@material-ui/icons';
import { makeStyles, Divider, TextField, Button, Input, InputAdornment, IconButton, FormControlLabel } from '@material-ui/core';
import { connect } from 'react-redux';
import {initialState,reducer, ACTION_LOCAL_TYPES} from './reducer';
import {addNewCarProperty} from './carpropertiesservices';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex'
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between'
    
  }
}));

function CarProperties(props) {
  const classes = useStyles();
  const[activeSpec,setActiveSpec] = useState([]);
  const[activeLabel,setActiveLabel] = useState([]);
  const[localState, localDispatch] = React.useReducer(reducer,initialState);
   
  const handleActiveSpec = (label) => {
    setActiveSpec(props.carProperties[label]);
    setActiveLabel(label)
  }
  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        aria-label="Vertical tabs example"
        indicatorColor="primary"
        className={classes.tabs}>
          {
            [
            Object.keys(props.carProperties).map(label => {
              return <React.Fragment><Tab  classes={{wrapper: classes.wrapper}} icon={[<Edit />]} aria-controls="simple-tabpanel" onClick={() => handleActiveSpec(label)} label ={label}/>
              <Divider/></React.Fragment>
            })]
          }
          <Tab disableRipple style={{display:"flex", color:"green"}} icon={<Input value={localState.newCarProp} onChange={(e)=>localDispatch({type:ACTION_LOCAL_TYPES.CAR_PROP_CHANGE,value:e.target.value})}
           variant="filled" placeholder="add new*" endAdornment={<InputAdornment position="end" > 
             <FormControlLabel control={<Clear/>}></FormControlLabel> <FormControlLabel control={<Done/>}></FormControlLabel>
             <FormControlLabel control={<Delete/>}></FormControlLabel>
           </InputAdornment>} />}></Tab>
            <Divider/>
         <Tab classes={{wrapper: classes.wrapper}} wrapped={true} onClick={() => {addNewCarProperty(props,localState.newCarProp);localDispatch({type:ACTION_LOCAL_TYPES.CAR_PROP_RESET})}} 
         label="Add" style={{display:"flex"}} icon={<Add/>}>
        </Tab>
        <Divider/>
      </Tabs>
       <TabPanel style={{display:"flex"}} label={activeLabel} data={activeSpec}>
      </TabPanel>
    </div>
  );
}



const mapStateToProps = state => {
  return {
    ...state
  }
}

const mapDispatcherToProps = dispatch => {
  return {
    dispatch
  }
}

export default connect(mapStateToProps,mapDispatcherToProps)(CarProperties);
