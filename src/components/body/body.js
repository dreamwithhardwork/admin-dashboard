import {Link, Switch, Route} from 'react-router-dom';
import MakeComponent from '../../bodycomponents/makecomponent/makecomponent';
import Make from '../make/make';
import ModelForm from '../model/modelform';
import AddVariant from '../variant/variantform';

function Body() {
    return (
        <div className="autoride-body">
            <Switch>
                <Route path="/make"> <MakeComponent/> </Route>
                <Route path="/addModel"><ModelForm/></Route>
                <Route path="/addVariant"><AddVariant/> </Route>
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