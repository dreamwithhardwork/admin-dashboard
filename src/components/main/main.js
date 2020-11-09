import { useStore } from "react-redux";

const { default: Make } = require("./brand/make");

function Main(props){
    const store = useStore();
    return(
        <div style={{display:"flex",width:"100%",margin:"10px"}}>
        {store.getState().login?  <Make/> :<div style={{color:"red"}}>Login to view content .........</div>}  
        </div>
    )
}


export default Main