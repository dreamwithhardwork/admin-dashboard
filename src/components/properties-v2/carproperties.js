import { Container, TextField, MenuItem } from '@material-ui/core';
import { useState } from 'react';
import { useEffect } from 'react';
import {tableIcons, addRow, updateRow, deleteRow} from './tableprops';
import {getProperties} from './carpropertiesservices';
import MaterialTable from 'material-table';
import CarSpecificationTypes from './carspecificationtypes';

function CarProperties(props){

    const [rows,setRows] = useState()

    useEffect(async ()=>{
        let body = await getProperties();
        setRows(body)
    },[])

    return(
        <Container >
        <MaterialTable 
        title="Add properties"
        icons={tableIcons}
        options={
            {
                paging:false,
                columnResizable:true,
                toolbar:true,
                header:false
            }
        }
        columns={
            [
                {title:"Name",field:"name"}
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
        detailPanel={
            rowData => {
                return <CarSpecificationTypes {...props} row={rowData} rows={rows} setRows={setRows}/>
            }
        }
        onRowClick={(event, rowData, togglePanel) => togglePanel()}
        
        />
        </Container>
    )
}

export default CarProperties