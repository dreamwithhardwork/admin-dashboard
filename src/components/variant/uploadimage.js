import './variantform.css'
import { useHistory } from 'react-router-dom';
const { FormGroup, Button } = require("@material-ui/core");
const { CloudUpload, Label } = require("@material-ui/icons");


export default function UploadImageComponent(props){
   
    return(
       <FormGroup className="variant-form-group variant-row" row={true}>
                <input onChange={(e) => { }} multiple accept="image/*" style={{ display: "none" }}
                    id={"icon-button" + props.index} type="file" />
                <label onClick={(e) => {  }} style={{ marginRight: "40px", width: 300 }} style={{ width: "fit-content" }} for={"icon-button" + props.index}>
                    <Button  variant="contained" component="span" color="default" startIcon={<CloudUpload />}>Upload external images</Button></label>


                    <input onChange={(e) => { }} multiple accept="image/*" style={{ display: "none" }}
                    id={"icon-button" + props.index} type="file" />
                <label onClick={(e) => {  }} style={{ marginRight: "40px", width: 300 }} style={{ width: "fit-content" }} for={"icon-button" + props.index}>
                    <Button  variant="contained" component="span" color="default" startIcon={<CloudUpload />}>Upload internal images</Button></label>
       </FormGroup>
    )
}