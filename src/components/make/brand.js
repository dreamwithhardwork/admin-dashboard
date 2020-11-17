import { Paper } from "@material-ui/core"
import '../make/brandstyle.css';
import { connect } from "react-redux";
import {setBrand} from './brandservice';

function Brand(props){

  

    return(
        <div onClick = {()=> setBrand(props.data.name,props.dispatch)} className="brand-logo">
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