import { Toolbar, Paper, Typography, Box, FormControlLabel, Tooltip, InputBase, IconButton } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import { Actions } from "./reducer";
import { connect } from "react-redux";

function AutoRideToolBar(props){

    const handleFlilter =(event) => {
        props.filter(event.target.value);
    }

    return(
        <Paper className="toolbar" elevation={0}>
            <Typography variant="h6"  style={{marginLeft:"30px",color:"rgba(0, 0, 0, 0.54)"}}>
             {props.type}
            </Typography>
             <Box style={{marginRight:"50px"}}>
             <InputBase onChange={handleFlilter}  placeholder={`Search ${props.type}`} inputProps={{ 'aria-label': 'search google maps' }}/>
             <FormControlLabel style={{padding:"5px",color:"rgba(0, 0, 0, 0.54)"}} control={<SearchIcon/>}/>
             <Tooltip onClick={()=>{props.openModel()}}  arrow title="Add new Brand" placement="top-start"><FormControlLabel style={{padding:"5px",color:"rgba(0, 0, 0, 0.54)"}} control={<AddIcon/>}/></Tooltip>
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