import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { TextField, DialogActions, Button, FormControlLabel, Switch, IconButton, LinearProgress } from '@material-ui/core';
import { CloudUpload, Save } from '@material-ui/icons';
import {uploadLogo,addNewbrand} from './brandservice'
import BackDrop from '../../messages/backdrop';
import ToastMessage from '../../messages/toastmessage';


function NewBrandModel(props) {


  const toastProps = {open:false,toastMessage:"",toastMessageSeverity:"error"};  
  const[popular,setPopularity] = React.useState(false);
  const[logoUrl,setLogoUrl] = React.useState(null);
  const[logoUrlName, setName]= React.useState(null);
  const[loading,setLoading] = React.useState(false)
  const[backdrop, setBackdrop] = React.useState(false)
  const[toast, setToast]= React.useState(toastProps);
  const[bname,setbname]=React.useState("");


  const handleUploadLogo = async (event) => {
    setLoading(true)
    let file = event.target.files[0];
    let body = await uploadLogo(file);
    setLogoUrl(file.name);
    setName(body[file.name]);
    setLoading(false);
  }

  const hadleAddNewmake = () => {
    setBackdrop(true)
    let newToastProps = {...toastProps};
    let response =  addNewbrand(popular,bname,logoUrlName);
    if(response.status === 200){
     newToastProps.toastMessageSeverity="success";
     newToastProps.toastMessage ="new brand added successfully";
     newToastProps.open = true;
    }
    else{
        newToastProps.toastMessage ="failed to add !!!";
    }
    setBackdrop(false);
    //setOpen(false);
  }

  const handleToastClose = () => {
    setToast(toastProps)
  }

  const nameChange = (event) => {
    setbname(event.target.value);
  }


  return (
    <Dialog   aria-labelledby="simple-dialog-title" open={props.open}>
      <DialogTitle id="simple-dialog-title">Add new brand</DialogTitle>
      <List>
         <ListItem><TextField onChange ={nameChange} placeholder="name*"></TextField></ListItem>

         <ListItem>
         <FormControlLabel control={<Switch onChange={(event) => {setPopularity(event.target.checked)}}  checked={popular} />} label="&nbsp;&nbsp;&nbsp;Popular brand" labelPlacement="end"/>
         </ListItem>
        
         <ListItem>
         <input  onChange= {handleUploadLogo} accept="image/*" style={{display:"none"}} id="icon-button" type="file"/>
         <label for="icon-button">
         <Button variant="contained" component="span" color="default" startIcon={<CloudUpload />}>Upload Logo</Button></label>                
         </ListItem>
         <ListItem>
             <ListItemText  style={{color:"green",fontWeight:900}}>
                 {logoUrl}
             </ListItemText>
         </ListItem>
         <LinearProgress  style={loading?{display:"block"}:{display:"none"}} color="secondary" />
        
      </List>

        <DialogActions>
          <Button onClick={()=>{props.close(false)}} variant="contained" size="small"  color="primary">
            Cancel
          </Button>
          <Button variant="contained"  color="primary" size="small" startIcon={<Save />} onClick={hadleAddNewmake}>Save</Button>
        </DialogActions>
        <BackDrop open={backdrop}></BackDrop>
        <ToastMessage close= {handleToastClose}  open={toast.open}  
        severity={toast.toastMessageSeverity} message={toast.toastMessage}></ToastMessage>
    </Dialog>
  );
}

export default NewBrandModel