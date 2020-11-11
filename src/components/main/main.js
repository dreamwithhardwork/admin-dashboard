import { useStore, connect } from "react-redux";
import {ACTION_TYPES} from '../constants/constants';
import CustomizedSnackbars from "../messages/toastmessage";
const { default: Make } = require("./brand/make");


function Main(props){
    const handleToastClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        console.log(props)
        props.dispatch({type:ACTION_TYPES.TOASTRESET});

      };
    const store = useStore();
    return(
        <div style={{display:"flex",width:"100%",margin:"10px",flexWrap:"wrap",maxHeight:"calc(100vh - 110px)", overflow:"scroll"}}>
        {store.getState().login? 
         [<Make/> ]
         :<div style={{color:"red"}}>Login to view content .........</div>}  
         
         <CustomizedSnackbars close= {handleToastClose}  open={props.toast.open}  severity={props.toast.severity} message={props.toast.message} />
        </div>
    )
}


const mapstateToProps = state => {
    return {
        ...state
    }
}

const mapDispatchToProps = dispatch => {
    return{
        closeToast: () => {dispatch({type:ACTION_TYPES.TOASTRESET})}
    }
}


export default connect(mapstateToProps,null)(Main)