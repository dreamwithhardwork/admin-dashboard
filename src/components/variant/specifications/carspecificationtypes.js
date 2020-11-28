import {TextField, MenuItem, ListItem, Button } from '@material-ui/core';
import { useState } from 'react';
import { useEffect } from 'react';
import {tableIcons, addSpecificationRow, updateSpecificationRow, deleteSpecificationRow} from './tableprops';
import {getProperties} from './carpropertiesservices';
import MaterialTable from 'material-table';
import { CloudUpload } from '@material-ui/icons';

function CarSpecificationTypes(props){
   console.log(props)
    return(
        <MaterialTable 
        title={props.row.name}
        icons={tableIcons}
        data={props.row.properties}
        editable={
            {
                onRowAdd: newRow => addSpecificationRow(newRow,props.rows,props.setRows,props.row),
                onRowUpdate: (newRow,oldRow) => updateSpecificationRow(newRow,oldRow,props.rows,props.setRows,props.row)
            }
        }
        columns={
            [
                {title:"Name",field:"name"},
                {
                 title:"DataType",
                 field:"propertyDataType",
                 editComponent: props => (<TextField select value={props.value}  onChange={e => props.onChange(e.target.value)}
                                 helperText="Please select data type">
                   {["STRING", "NUMBER", "COLOR","BOOLEAN"].map((option) => (
                     <MenuItem key={option} value={option}>
                       {option}
                     </MenuItem>
                   ))}
                 </TextField>)
                },
                {
                  title:"Value",
                  field:"value"
                },
                {
                  title:"Type",
                  field:"status",
                  editComponent: props => (<TextField select value={props.value}  onChange={e => props.onChange(e.target.value)}
                                 helperText="Please select data type">
                   {["STANDOUT FEATURE", "KEY FEATURE", "KEY SPECIFICATION"].map((option) => (
                     <MenuItem key={option} value={option}>
                       {option}
                     </MenuItem>
                   ))}
                 </TextField>)
                },
                {
                  title:"Images",
                  field:"images",
                  editComponent: props => (
                    <ListItem>
                    <input   accept="image/*" style={{display:"none"}} id="variant-props" type="file"/>
                    <label for="variant-props">
                    <Button variant="contained" component="span" color="default" endIcon={<CloudUpload />}></Button></label>                
                    </ListItem>
                  )
                }
            ]
        }
         />
    )
}

export default CarSpecificationTypes