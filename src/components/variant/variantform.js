import { connect } from "react-redux"
import { Container, TextField, FormGroup, FormControlLabel, DialogTitle, Divider, FormControl, FormLabel, RadioGroup, Radio, MenuItem } from "@material-ui/core"
import { ArrowBack } from "@material-ui/icons"
import { useHistory } from "react-router-dom"
import './variantform.css'

function AddVariant(props){

    const history = useHistory();

    return(
        <Container>
            <FormGroup >
                <FormControlLabel label="&nbsp;&nbsp;&nbsp;Back" control={<ArrowBack onClick={() => history.push("/make")} />}></FormControlLabel>
            </FormGroup>
            <DialogTitle>Add new variant</DialogTitle>
            <Divider />

            <FormGroup className="variant-form-group variant-row" row={true}>
                <FormControl>
            
            <TextField label="variant name*" variant="standard" placeholder="enter name"></TextField>
            </FormControl>
            <FormControl>
            
            <TextField min={2017} type="number" label="Year*" variant="standard" placeholder="enter year"></TextField>
            </FormControl>
            <TextField select value="PETROL" helperText="Please select Engine type">
              {["PETROL","DIESEL","ELECTRIC"].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
               </TextField>

            <FormControl component="legend">
                <FormLabel component="legend">Transmission*</FormLabel>
                <RadioGroup aria-label="gender" name="gender1" row={true}>
                    <FormControlLabel value="AUTOMATIC" control={<Radio />} label="AUTOMATIC" />
                    <FormControlLabel value="MANUAL" control={<Radio />} label="MANUAL" />
                </RadioGroup>
            </FormControl>
            
            </FormGroup>

            <FormGroup className="variant-form-group variant-row" row={true}>
               <TextField multiline placeholder="description*"></TextField>
               <TextField placeholder="model*"></TextField>
               <TextField select value="HATCHBACK" helperText="Please select body type">
              {["SEDAN","HATCHBACK","COUPE"].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
               </TextField>
               
            </FormGroup>


            
            


        </Container>
    )

}

const mapStateToProps = state => {
    return {
        ...state
    }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatch
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddVariant);