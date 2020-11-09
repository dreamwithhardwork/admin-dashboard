import { Paper } from "@material-ui/core"
import {brand_wrapper} from './brandStyles.js';

function Brand(props){
    return(
        <div style={{...brand_wrapper}}>
            <Paper elevation={3}> <img style={{width:"100%",height:"auto"}} src={props.src}></img>  </Paper>
        </div>
    )
}

export default Brand;

