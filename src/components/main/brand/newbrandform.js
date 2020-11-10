import React from 'react';
import { TextField, DialogActions, Button, FormControlLabel, Switch, List, LinearProgress, ListItem, ListItemText, DialogTitle, Dialog} from '@material-ui/core';
import { CloudUpload, Save } from '@material-ui/icons';
import {uploadLogo,addNewbrand} from './brandservice'
import BackDrop from '../../messages/backdrop';
import ToastMessage from '../../messages/toastmessage';
import {reducer,initialstate,Actions} from './reducer';


function NewBrandModel(props) {


  const[localstate, localdispatch] = React.useReducer(reducer,initialstate);
  const toastProps = {open:false,toastMessage:"",toastMessageSeverity:"error"};  




  const handleUploadLogo = async (event) => {
    localdispatch({type:Actions.SET_LOADING,disabled:true});
    let file = event.target.files[0];
    let body = await uploadLogo(file);
    localdispatch({type:Actions.UPLOAD,logoUrl:file.name,logoUrlName:body[file.name],loading:false});
  }

  const hadleAddNewmake = async () => {
     localdispatch({type:Actions.SET_BACKDROP});
    let newToastProps = {...toastProps};
    newToastProps.open = true;
    try{
      let response = await addNewbrand(localstate.popular,localstate.bname,localstate.logoUrlName);
      let body = await response.json();
      if(response.status === 200){
       newToastProps.toastMessageSeverity="success";
       newToastProps.toastMessage ="new brand added successfully";
       props.update(body);
      }
      else{
          newToastProps.toastMessage ="failed to add !!!";
      }
    }
    catch(ex){
      newToastProps.toastMessage ="exception occured, failed to add !!!";
    }
    localdispatch({type:Actions.NEW_BRAND,toast:newToastProps});
    localdispatch({type:Actions.RESET});
    //setOpen(false);
  }

  const handleToastClose = () => {
    localdispatch({type:Actions.TOAST_CLOSE});
    localdispatch({type:Actions.RESET});
  }

  const nameChange = (event) => {
    localdispatch({type:Actions.NAME_CHANGE,value:event.target.value})
  }


  return (
    <Dialog   aria-labelledby="simple-dialog-title" open={props.open}>
      <DialogTitle id="simple-dialog-title">Add new brand</DialogTitle>
      <List>
         <ListItem><TextField value={localstate.bname} onChange ={nameChange} placeholder="name*"></TextField></ListItem>

         <ListItem>
         <FormControlLabel control={<Switch 
         onChange={(event) => {localdispatch({type:Actions.SET_POPULARITY,value:event.target.checked})}}  checked={localstate.popular} />} label="&nbsp;&nbsp;&nbsp;Popular brand" labelPlacement="end"/>
         </ListItem>
        
         <ListItem>
         <input  onChange= {handleUploadLogo} accept="image/*" style={{display:"none"}} id="icon-button" type="file"/>
         <label for="icon-button">
         <Button variant="contained" component="span" color="default" startIcon={<CloudUpload />}>Upload Logo</Button></label>                
         </ListItem>
         <ListItem>
             <ListItemText  style={{color:"green",fontWeight:900}}>
                 {localstate.logoUrl}
             </ListItemText>
         </ListItem>
         <LinearProgress  style={localstate.loading?{display:"block"}:{display:"none"}} color="secondary" />
        
      </List>

        <DialogActions>
          <Button onClick={()=>{props.close(false);localdispatch({type:Actions.RESET});}} variant="contained" size="small"  color="primary">
            Cancel
          </Button>
          <Button disabled={localstate.saveDisabled} variant="contained"  color="primary" size="small" startIcon={<Save />} onClick={hadleAddNewmake}>Save</Button>
        </DialogActions>
        <BackDrop open={localstate.backdrop}></BackDrop>
        <ToastMessage close= {handleToastClose}  open={localstate.toast.open}  
        severity={localstate.toast.toastMessageSeverity} message={localstate.toast.toastMessage}></ToastMessage>
    </Dialog>
  );
}

export default NewBrandModel