import {useStyles} from './carspecificationstyle'
import { Tabs, Tab, Divider, Input, InputAdornment, FormControlLabel } from '@material-ui/core';
import { connect } from 'react-redux';
import CarSpecificationType from './carspecificationtype';
import React, { useState } from 'react'
import { Add } from '@material-ui/icons';
import TabPanel from '../properties-v1/tabpanel';

function CarProperties(props) {
    const classes = useStyles();
    return(
        <div className={classes.root}>
               <Tabs orientation="vertical" variant="scrollable">
                   {
                       Object.keys(props.carProperties).map((item,index) => {
                           return <React.Fragment><CarSpecificationType key={index} data={item} /><Divider/></React.Fragment>
                       })
                   }
                   <AddNew/>
                   <Divider/>
               </Tabs>
               <TabPanel />
        </div>
    )
}

function AddNew(props){
    const classes = useStyles();
    const[value,setValue] = useState("");
    const handleChangeValue = (e) => {
           setValue(e.target.value);
    }

    const handleAddNewType = () => {
      setValue("")
    }
    return(
        <Tab disableRipple classes={{wrapper: classes.wrapper}} 
          icon={
            <Input  value={value} onChange={handleChangeValue} placeholder="add new type*" endAdornment={<InputAdornment position="end" > 
            <FormControlLabel control={<Add onClick={handleAddNewType} />}></FormControlLabel>
           </InputAdornment>}/>
         }>
        </Tab>
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

export default connect(mapStateToProps,mapDispatchToProps)(CarProperties)