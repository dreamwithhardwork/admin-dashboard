import { Paper } from "@material-ui/core"
import '../make/brandstyle.css';

function Brand(props){
    return(
        <div className="brand-logo">
            <Paper elevation={3}> <img className="brand-image" src={props.src} alt={props.data.name}/> </Paper>
        </div>
    )
}

export default Brand;