import {Link, Switch, Route} from 'react-router-dom';
import MakeComponent from '../../bodycomponents/makecomponent/makecomponent';
import Make from '../make/make';
import ModelForm from '../model/modelform';
import AddVariant from '../variant/variantform';
import CarProperties from '../properties-v2/carproperties';
import Users from '../users/users';
import CarSpecification from '../variant/specifications/carproperties'
import BrandTableView from '../make/tableview';
import RTO from '../rto/rto';

function Body() {
    return (
        <div className="autoride-body">
            <Switch>
                <Route path="/make"> <MakeComponent/> </Route>
                <Route path='/rto'> <RTO/> </Route>
                <Route path="/addModel"><ModelForm/></Route>
                <Route path="/updateModel"><ModelForm update={true}/></Route>
                <Route path="/addVariant"><AddVariant/> </Route>
                <Route path="/users"><Users/></Route>
                <Route path="/carProperties"> <CarProperties/> </Route>
                <Route path="/addVariantProps/:id"> <CarSpecification /> </Route>
                <Route path="/brandTableView"><BrandTableView/></Route>
                <Route path="*"><UnderConstruction /></Route>
                
            </Switch>
        </div>
    )
}

function UnderConstruction(){
    return(
        <div style={{display:"flex",width:"100%",color:"red",backgroundColor:"lavenderblush",justifyContent:"center",alignItems:"center"}}>
           <h2>Get back after a while, this page is under construction...........</h2>
        </div>
    )
}

export default Body;