import {useStyles} from './carspecificationstyle'
import { Tabs, Tab, Divider, Input, InputAdornment, FormControlLabel } from '@material-ui/core';
import { connect } from 'react-redux';
import CarSpecificationType from './carspecificationtype';
import React, { useState, useEffect } from 'react'
import { Add } from '@material-ui/icons';
import TabPanel from '../properties-v1/tabpanel';
import { ACTION_TYPES } from '../constants/constants';
import {saveProperties,getProperties} from './carpropertiesservices';

function CarProperties(props) {
    const classes = useStyles();

    useEffect( async () => {
        let body = await getProperties();
        if(body.length === 0)
        return;
        console.log(body);
        props.dispatch({type:ACTION_TYPES.SET_CAR_PROPERTIES_ID,value:body[0].id})
        props.dispatch({type:ACTION_TYPES.SET_CAR_PROPERTIES,value:body[0].availableProps})
    },[])

    return(
        <div className={classes.root}>
               <Tabs orientation="vertical" variant="scrollable">
                   <Divider/>
                   {
                       Object.keys(props.carProperties).map((item,index) => {
                           return <React.Fragment><CarSpecificationType key={index} data={item} /><Divider/></React.Fragment>
                       })
                   }
                   <AddNew {...props}/>
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
      let newCarProps = {...props.carProperties}
      newCarProps[value] = [];
      props.dispatch({type:ACTION_TYPES.SET_CAR_PROPERTIES,value:newCarProps})
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