import {TextField, MenuItem } from '@material-ui/core';
import { useState } from 'react';
import { useEffect } from 'react';
import {tableIcons, addSpecificationRow, updateSpecificationRow, deleteSpecificationRow} from './tableprops';
import {getProperties} from './carpropertiesservices';
import MaterialTable from 'material-table';

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
                onRowUpdate: (newRow,oldRow) => updateSpecificationRow(newRow,oldRow,props.rows,props.setRows,props.row),
                onRowDelete: delRow => deleteSpecificationRow(delRow,props.rows,props.setRows,props.row)
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
                }
            ]
        }
         />
    )
}

export default CarSpecificationTypes