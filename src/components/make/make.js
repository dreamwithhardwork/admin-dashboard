import '../make/makestyle.css';
import AutoRideToolBar from './toolbar';
import Brand from './brand';
import { Paper } from '@material-ui/core';
import React, { useState } from 'react';
import NewBrandModel from './newbrandform';
import {getAllBrands,setBrand} from './brandservice';
import { connect } from 'react-redux';
import { ACTION_TYPES } from '../constants/constants';
import { useRef } from 'react';

function Make(props){

    const [makeList,setMakeList] = useState([]);
    const [filterList, setFilterList] = useState([]);
    const [filter, setFilter] = useState(false);
    const [tableView, setTableView] = useState(true)

    const updateBrands = (newBrand) => {
        let newMakeList = [...makeList]
        newMakeList.push(newBrand);
        setMakeList(newMakeList);
    }

    const filterBrands = (searchTearm) => {
        if(searchTearm===""){
            setFilter(false)
        }
        else{
            setFilter(true)
        }
        let pattern = new RegExp(searchTearm,"i");
        let filteredList = props.brands.filter(make => make.name.match(pattern));

        setFilterList(filteredList);

    }

    React.useEffect(async () => {
        let  n_makeList = await getAllBrands();
        console.log(props)
        props.dispatch({type:ACTION_TYPES.ADD_BRANDS,value:n_makeList});
        if(n_makeList.length>0)
        setBrand(n_makeList[0].name,props.dispatch)
        //props.dispatch({type:ACTION_TYPES.SET_ACTIVE_BRAND,value:n_makeList[0].name})
        setFilterList(n_makeList);
    },[])

    const ref = useRef()


    return(
        <Paper elevation={0} className="makeroot">
            <AutoRideToolBar type="Brand" filter={filterBrands}/>
            <div className="makelist">
                {
                       
                       filter?  filterList.map((make) => <Brand  key={make.id} src={make.logoUrl} data={make} update={updateBrands}/>)
                       :props.brands.map((make) => <Brand  key={make.id} src={make.logoUrl} data={make} update={updateBrands}/>)
                }
            </div>
            <NewBrandModel update={updateBrands} />
        </Paper>
        
    )

}

const mapStateToProps = state => {
    return {
        ...state
    }
}

const mapdispatchToProps = dispatch => {
    return {
        dispatch
    }
}

export default connect(mapStateToProps,mapdispatchToProps)(Make);