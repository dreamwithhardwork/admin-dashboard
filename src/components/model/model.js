import { Paper } from "@material-ui/core";
import './modelstyle.css';

function Model(props){
    return(
        <Paper className="modelroot">
            Model<div style={{width:"100px",height:"100px",backgroundColor:"blue"}}></div>
            <div style={{width:"100px",height:"100px",backgroundColor:"blue"}}></div>
            <div style={{width:"100px",height:"100px",backgroundColor:"blue"}}></div>
        </Paper>
    )
}

export default Model;