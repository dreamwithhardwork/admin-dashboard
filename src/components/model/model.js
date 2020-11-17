import { Paper, Chip, Avatar } from "@material-ui/core";
import './modelstyle.css';
import { Done } from "@material-ui/icons";
import AutoRideToolBar from '../make/toolbar';
import React, { useState } from "react";
import { connect } from "react-redux";
import { ACTION_TYPES } from "../constants/constants";


function Model(props){
    const [filterList, setFilterList] = useState(props.models);
    const [filter, setFilter] = useState(false);
    const handleFilter = (searchTearm) => {
        if(searchTearm===""){
            setFilter(false);
        }
        else{
            setFilter(true);
        }
        let pattern = new RegExp(searchTearm,"i");
        let filteredList = props.models.filter(make => make.name.match(pattern));
        setFilterList(filteredList);
    }

    const handleModelDispaly = (model) => {
         props.dispatch({type:ACTION_TYPES.SET_ACTIVE_MODEL,value:model})
    }

    



    return(
        <Paper elevation={0} className="modelroot">
            <AutoRideToolBar type={props.activeBrand.toLocaleUpperCase()} filter={handleFilter}/>
            <div className="makelist">
           {
               filter?filterList.map((model) => {
                return(
                <Chip onClick={()=>handleModelDispaly(model)} size="medium" style={{width:"fit-content", margin:"10px",paddingRight:"20px"}} key={model.id} avatar={<Avatar>{model.name.charAt(0).toLocaleUpperCase()}</Avatar>} label={model.name}
                clickable color="default"
                deleteIcon={<Done />}></Chip>
                )
               }):
               props.models.map((model) => {
                return(
                <Chip onClick={()=>handleModelDispaly(model)} size="medium" style={{width:"fit-content", margin:"10px",paddingRight:"20px"}} key={model.id} avatar={<Avatar>{model.name.charAt(0).toLocaleUpperCase()}</Avatar>} label={model.name}
                clickable color="default"
                deleteIcon={<Done />}></Chip>
                )
               })
            
           }
           </div>
        </Paper>
    )
}

const mapStatetoProps = state => {
    return {
        ... state
    }
}

const mapReducerToProps = dispatch => {
    return{
         dispatch
    }
}

export default connect(mapStatetoProps,mapReducerToProps)(Model);