import { Paper, Typography, Box, FormControlLabel, Tooltip, InputBase } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import { Actions } from "./reducer";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

function AutoRideToolBar(props){

    const handleFlilter =(event) => {
        props.filter(event.target.value);
    }

    const history = useHistory();

    const addform = () => {
      props.type==="Brand"?props.openModel():history.push("/addModel");
    }

    return(
        <Paper className="toolbar" elevation={0}>
            <Typography variant="h6"  style={{marginLeft:"30px",color:"rgba(0, 0, 0, 0.54)"}}>
             {props.type}
            </Typography>
             <Box className="toolbar-box">
             <InputBase  style={{maxWidth:"180px"}} onChange={handleFlilter}  placeholder={`Search ${props.type}`} inputProps={{ 'aria-label': 'search' }}/>
             <FormControlLabel style={{padding:"5px",color:"rgba(0, 0, 0, 0.54)"}} control={<SearchIcon/>}/>
             <Tooltip onClick={addform}  arrow title="Add new Brand" placement="top-start"><FormControlLabel style={{padding:"5px",color:"rgba(0, 0, 0, 0.54)"}} control={<AddIcon/>}/></Tooltip>
             <Tooltip arrow placement="right-end" title="Table/Grid View"><FormControlLabel style={{padding:"5px",color:"rgba(0, 0, 0, 0.54)"}} control={<ViewComfyIcon/>}/></Tooltip>
            </Box>
        </Paper>

    )
}



const mapStateToProps = state => {
    return{
      ...state
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      openModel: () => {
        dispatch({type:Actions.NEW_BRAND_MODEL_OPEN});
      }
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(AutoRideToolBar); 