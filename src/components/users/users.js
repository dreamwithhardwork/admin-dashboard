import { useEffect } from "react";
import { useState } from "react";
import { tableIcons } from "../properties-v2/tableprops";
import { getAllUsers ,deleteRow, addRow} from "./usersservice";

const { Container, TextField, MenuItem } = require("@material-ui/core");
const { default: MaterialTable } = require("material-table");

function Users(props){

    const [rows,setRows] = useState()

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
                {title:"Profilepic",field:"profilePic",render: rowData => <img src={rowData.profilePic} style={{width: 30, borderRadius: '50%'}}/>},
                {title:"Name",field:"name"},
                {title:"Email",field:"email", editComponent: props => (<TextField value={props.value} onChange={e => props.onChange(e.target.value)} type="email"/>)},
                {title:"Mobile",field:"mobile" , editComponent: props => (<TextField value={props.value} onChange={e => props.onChange(e.target.value)} type="number"/>)},
                {title:"Role",field:"roles",  editComponent: props => (<TextField select value={props.value}  onChange={e => props.onChange(e.target.value)}
                helperText="Please select data type">
               {["ROLE_ADMIN", "ROLE_CUSTOMER"].map((option) => (
                <MenuItem key={option} value={option}>
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
                onRowUpdate: (newData,olddata) => {},
                onRowDelete: delrow => deleteRow(delrow,rows,setRows)
            }
        }
        
        />
        </Container>
    )
}

export default Users;