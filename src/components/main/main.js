import { useStore } from "react-redux";
import StickyHeadTable from "./brand/tableview";

const { default: Make } = require("./brand/make");

function Main(props){
    const store = useStore();
    return(
        <div style={{display:"flex",width:"100%",margin:"10px",flexWrap:"wrap",maxHeight:"calc(100vh - 110px)", overflow:"scroll"}}>
        {store.getState().login? 
         [<Make/> ]
         :<div style={{color:"red"}}>Login to view content .........</div>}  
        </div>
    )
}


export default Main