import {Button, TextField, Dialog, DialogActions,DialogContent,DialogContentText,DialogTitle,FormControlLabel,Switch,LinearProgress, Backdrop} from '@material-ui/core';
import React, { useReducer } from 'react';
import {reducer,initialState} from './reducer';
import {ACTION_TYPES} from '../constants/constants';
import {sendOtp} from './loginservice';
import {useStyles} from './loginstyle';
import CustomizedSnackbars from '../messages/toastmessage'

function LoginForm(props){

    const[localstate, localDispatch] = useReducer(reducer,initialState);
    const classes= useStyles();
    const handleToastClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        localDispatch({type:ACTION_TYPES.CLOSE_TOAST_MESSAGE});
      };

    return (
        <Dialog open={props.open} maxWidth={"xs"} fullWidth={true} aria-labelledby="form-dialog-title">
           <DialogTitle id="form-dialog-title">Login/Signup</DialogTitle>
            <DialogContent>
                <DialogContentText> Join us to track your appointments and find out all your recent appointments.</DialogContentText>
                <FormControlLabel
                    control={<Switch checked={localstate.toggleSwitch} onChange = {(e) => {localDispatch({type:ACTION_TYPES.TOGGLE_SWITCH,event:e})}} />} label="Login With OTP" />
                  <LinearProgress className={!localstate.linearProgress ? classes.displayNone : classes.displayBlock} color="secondary" />
                  <TextField  value={localstate.username} onChange={(e) =>{localDispatch({type:ACTION_TYPES.USERNAME_CHANGE,event:e})}}  autoFocus margin="dense" id="email-phone" label="Email/Phone*" type="email" variant="outlined" fullWidth
                    InputProps={{
                        endAdornment: <Button disabled = {localstate.otpButtonDisabled} id="otp" color="secondary"  onClick = {() => {sendOtp(localstate,localDispatch)}}
                        className={!localstate.toggleSwitch ? classes.displayNone : classes.displayBlock}>Get&nbsp;OTP</Button>
                    }} />

                <TextField  margin="dense" id="password" variant="outlined" style={{...localstate.passwordFieldDisplay}} value={localstate.password} 
                onChange={(e) => {localDispatch({type:ACTION_TYPES.PASS_CHANGE, event:e})}} placeholder = {localstate.passwordPlaceHolder} type={localstate.passwordType}
                label={localstate.passwordTypeLable} fullWidth />
            
            </DialogContent>


            <DialogActions>
                <Button onClick={() => {props.close({type:"LOGIN_CLOSE"})}} color="primary">Cancel</Button>
                <Button  color="primary" disabled = {localstate.loginButtonDisabled}   onClick = {() => localDispatch({type:ACTION_TYPES.LOGIN})}>Login</Button>
            </DialogActions>

            <Backdrop open ={localstate.backdrop}></Backdrop>
            <CustomizedSnackbars close= {handleToastClose}  open={localstate.toastOpen}  severity={localstate.toastMessageSeverity} message={localstate.toastMessage} />
            
        </Dialog>
    )
}

export default LoginForm;
