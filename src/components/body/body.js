import { Switch, Route} from 'react-router-dom';
import MakeComponent from '../../bodycomponents/makecomponent/makecomponent';
import ModelForm from '../model/modelform';
import AddVariant from '../variant/variantform';
import CarProperties from '../properties-v2/carproperties';
import Users from '../users/users';
import CarSpecification from '../variant/specifications/carproperties'
import BrandTableView from '../make/tableview';
import RTO from '../rto/rto';
import CarListing from '../../listing/CarListing';
import { connect } from 'react-redux';

function Body(props) {
    return (
        <div className="autoride-body">
            <Switch>
                <Route path="/make"> {props.login?<MakeComponent/>:<LogOut/>}  </Route>
                <Route path='/rto'>{props.login?<RTO/>:<LogOut/>}  </Route>
                <Route path="/addModel">{props.login?<ModelForm/>:<LogOut/>} </Route>
                <Route path="/updateModel"> {props.login?<ModelForm update={true}/>:<LogOut/>} </Route>
                <Route path="/addVariant"> {props.login?<AddVariant/>:<LogOut/>}  </Route>
                <Route path="/users"> {props.login?<Users/>:<LogOut/>} </Route>
                <Route path="/carProperties"> {props.login?<CarProperties/>:<LogOut/>}  </Route>
                <Route path="/addVariantProps/:id"> {props.login?<CarSpecification />:<LogOut/>}  </Route>
                <Route path="/brandTableView"> {props.login?<BrandTableView/>:<LogOut/>} </Route>
                <Route path="/cars"> {props.login?<CarListing/>:<LogOut/>} </Route>
                <Route path="*"><UnderConstruction /></Route>
                
            </Switch>
        </div>
    )
}

function UnderConstruction(){
    return(
        <div style={{display:"flex",width:"100%",color:"red",backgroundColor:"ThreeDHighlight",justifyContent:"center",alignItems:"center"}}>
           <h2>Get back after a while, this page is under construction...........</h2>
        </div>
    )
}

function LogOut(){
    return(
        <div style={{display:"flex",width:"100%",color:"red",backgroundColor:"ThreeDHighlight",justifyContent:"center",alignItems:"center"}}>
           <h2>Login to view content...........</h2>
        </div>
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

export default connect(mapStateToProps,mapDispatchToProps)(Body);