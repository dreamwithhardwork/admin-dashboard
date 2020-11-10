import { Paper } from "@material-ui/core"
import {brand_wrapper} from './brandStyles.js';

function Brand(props){
    return(
        <div style={{...brand_wrapper}}>
            <Paper onClick={()=>{console.log(props.data)}} elevation={3}> <img style={{width:"100%",height:"auto"}} src={props.src} alt={props.data.name}></img>  </Paper>
        </div>
    )
}

export default Brand;

