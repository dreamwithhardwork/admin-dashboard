import { Container, TextField, MenuItem } from '@material-ui/core';
import { useState } from 'react';
import { useEffect } from 'react';
import {tableIcons, addRow, updateRow, deleteRow} from './tableprops';
import { getVariant} from './carpropertiesservices';
import {getProperties} from '../../properties-v2/carpropertiesservices'
import MaterialTable from 'material-table';
import CarSpecificationTypes from './carspecificationtypes';
import { useParams } from 'react-router-dom';

function CarSpecifications(props){


    const [variant,setRows] = useState({specifications:[]})
    const {id} = useParams();
    console.log(id)

    useEffect(async ()=>{
        let body = await getVariant(id);
        if(body.specifications===null || body.specifications === undefined || body.specifications.length ===0){
          let specifications = await getProperties();
          body.specifications = specifications;
        }
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
           variant.specifications
        }
        editable={
            {
                onRowAdd: newData => addRow(newData,variant,setRows),
                onRowUpdate: (newData,olddata) => updateRow(newData,olddata,variant,setRows)
            }
        }
        detailPanel={
            rowData => {
                return <CarSpecificationTypes {...props} row={rowData} rows={variant} setRows={setRows}/>
            }
        }
        onRowClick={(event, rowData, togglePanel) => togglePanel()}
        
        />
        </Container>
    )
}

export default CarSpecifications