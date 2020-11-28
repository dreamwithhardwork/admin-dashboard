import { useEffect } from "react";
import { useState } from "react";
import { tableIcons } from "../properties-v2/tableprops";
import { getAllUsers ,deleteRow, addRow, uploadProfilePic, updateRow} from "./usersservice";
import { CloudUpload } from "@material-ui/icons";

const { Container, TextField, MenuItem, ListItem, Button, Chip, LinearProgress } = require("@material-ui/core");
const { default: MaterialTable } = require("material-table");

function Users(props){

    const [rows,setRows] = useState()

    const handleUploadLogo = async (event,prop) => {
        console.log(prop)
        prop.onChange("loading")
        let file = event.target.files[0];
        let body = await uploadProfilePic(file,prop.rowData.mobile);
        prop.onChange(body[file.name])
        console.log(body)
    }

    const removeProfilePic = (prop) => {
            prop.onChange(null)
    }

    useEffect(async ()=>{
      let response = await  getAllUsers();

      setRows(response)
    },[])

    return(
        <Container >
        <MaterialTable 
        title="Users"
        icons={tableIcons}
        options={
            {
                toolbar:true,
            }
        }
        columns={
            [
                {title:"Profilepic",field:"profilePic",
                editComponent: prop => (
                    <ListItem style={{display:"flex",flexDirection:"column"}}>
                    <input onChange= {(e)=>handleUploadLogo(e,prop)} accept="image/*" style={{display:"none"}} id="variant-props" type="file"/>
                    <label for="variant-props">
                    <Button variant="contained" component="span" color="default" endIcon={<CloudUpload />}>Upload</Button></label>
                     {prop.value==="loading"?<LinearProgress style={{width:"100%",marginTop:"5px"}} color="secondary" />:""}
                     {prop.value!==null && prop.value!=="loading"? <Chip style={{marginTop:"10px"}}  onDelete={()=>removeProfilePic(prop)} variant="outlined" label="profilepic.png"/>:""}           
                    </ListItem>
                  )
                ,render: rowData => <img src={rowData.profilePic} style={{width: 30, borderRadius: '50%'}}/>},
                {title:"Name",field:"name"},
                {title:"Email",field:"email", editComponent: props => (<TextField value={props.value} onChange={e => props.onChange(e.target.value)} type="email"/>)},
                {title:"Mobile",field:"mobile" , editComponent: props => (<TextField value={props.value} onChange={e => props.onChange(e.target.value)} type="number"/>)},
                {title:"Role",field:"roles",  editComponent: props => (<TextField select value={props.value}  onChange={e => {props.onChange(e.target.value)}}
                helperText="Please select data type">
               {["ROLE_ADMIN", "ROLE_CUSTOMER"].map((option) => (
                <MenuItem value={option}>
                 {option}
                </MenuItem>
                ))}
                </TextField>)}
            ]
        }
        data={
           rows
        }
        editable={
            {
                onRowAdd: newData => addRow(newData,rows,setRows),
                onRowUpdate: (newData,olddata) => updateRow(newData,olddata,rows,setRows),
                onRowDelete: delrow => deleteRow(delrow,rows,setRows)
            }
        }
        
        />
        </Container>
    )
}

export default Users;