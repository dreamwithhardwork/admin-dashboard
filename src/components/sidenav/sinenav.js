import React from 'react';
import {MenuList,Paper,Divider} from '@material-ui/core';
import { Make, Cars, Bikes, Users, RTO, SellRequest, BookingRequest,CarProperties,BikeProperties, Dashboard } from './sidenavicons';
import {Link, Switch, Route} from 'react-router-dom';
import '../sidenav/sidenav.css'
import { connect } from 'react-redux';
//{!props.toggle?classes.open:classes.close}
function SideNav(props){
    console.log(props)
    return(
        <div style={{display:"flex"}} >
        <Paper className={`side-nav ${!props.toggleSidenav?"open":"close"}`}>
            <MenuList>
                <Link className="list"  to ="/"> <Dashboard/> </Link>
                <Link  className="list" to = "/make" > <Make /> </Link>
                <Link className="list"  to = "/cars" >  <Cars /> </Link>
                <Link className="list"  to = "/bikes" >  <Bikes /> </Link>
                <Divider/><Divider/><Divider/><Divider/>
                <Link className="list" to = "/sellrequest" > <SellRequest /> </Link> 
                <BookingRequest />
                <Divider/>  <Divider/><Divider/><Divider/>
                <Link className="list" to = "/users" > <Users /> </Link>
                <Divider/><Divider/>
                <Link className="list" to = "/rto" > <RTO/> </Link>
                <Divider/><Divider/>
                <Link className="list" to = "/carproperties" > <CarProperties/></Link>
                <BikeProperties></BikeProperties>
                <Divider/>
            </MenuList>
        </Paper>

        
        </div>
    )
}



const mapStateToProps = state => {
    return{
        ...state
    }
}

export default connect(mapStateToProps,null)(SideNav);