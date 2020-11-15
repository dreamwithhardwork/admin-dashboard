import { Paper } from "@material-ui/core"
import '../make/brandstyle.css';
import { connect } from "react-redux";
import {ACTION_TYPES,SERVICE_URL} from '../constants/constants'
import {getRequest} from '../constants/headers'

function Brand(props){

    const setBrand = async () => {
        console.log(props.data.name)
        props.dispatch({type:ACTION_TYPES.SET_ACTIVE_BRAND,value:props.data.name})
        let response = await fetch(SERVICE_URL.GET_ALL_MODEL+props.data.name,getRequest());
        let body = await response.json();
        props.dispatch({type:ACTION_TYPES.ADD_MODELS,value:body})
    }

    return(
        <div onClick = {setBrand} className="brand-logo">
            <Paper elevation={3}> <img className="brand-image" src={props.src} alt={props.data.name}/> </Paper>
        </div>
    )
}

const mapPropsToState = state => {
    return {
        ...state
    }
}

const mapDispatchToState  = dispatch => {
    return {
         dispatch
    }
}

export default connect(mapPropsToState,mapDispatchToState)(Brand);