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
import ModelVariantView from '../../variantsview/modelvariantview';

function Body(props) {
    return (
        <div className="autoride-body">
            <Switch>
                <Route path="/make"> {props.login?<MakeComponent/>:<CarListing/>}  </Route>
                <Route path='/rto'>{props.login?<RTO/>:<CarListing/>}  </Route>
                <Route path="/addModel">{props.login?<ModelForm/>:<CarListing/>} </Route>
                <Route path="/updateModel"> {props.login?<ModelForm update={true}/>:<CarListing/>} </Route>
                <Route path="/addVariant"> {props.login?<AddVariant/>:<CarListing/>}  </Route>
                <Route path="/users"> {props.login?<Users/>:<CarListing/>} </Route>
                <Route path="/carProperties"> {props.login?<CarProperties/>:<CarListing/>}  </Route>
                <Route path="/addVariantProps/:id"> {props.login?<CarSpecification />:<CarListing/>}  </Route>
                <Route path="/brandTableView"> {props.login?<BrandTableView/>:<CarListing/>} </Route>
                <Route path="/cars"> <CarListing/> </Route>
                <Route path="/sellrequest"> <UnderConstruction/> </Route>
                <Route path="/viewModel/:name/:variantName/:fuelType"><ModelVariantView/></Route>
                <Route path="*"><CarListing /></Route>
                
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