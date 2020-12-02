import { Container, TextField, MenuItem, FormControlLabel, Divider, FormGroup, Button } from '@material-ui/core';
import { useState } from 'react';
import { useEffect } from 'react';
import {tableIcons, addRow, updateRow} from './tableprops';
import { getVariant} from './carpropertiesservices';
import {getProperties} from '../../properties-v2/carpropertiesservices'
import MaterialTable from 'material-table';
import CarSpecificationTypes from './carspecificationtypes';
import { useHistory, useParams } from 'react-router-dom';
import { ArrowBack } from '@material-ui/icons';

function CarSpecifications(props){


    const [variant,setRows] = useState({specifications:[]})
    const {id} = useParams();
    const history = useHistory();

    const handleVariantSave = () => {

    }

    useEffect(async ()=>{
        let body = await getVariant(id);
        if(body.specifications===null || body.specifications === undefined || body.specifications.length ===0){
          let specifications = await getProperties();
          body.specifications = specifications;
        }
        console.log(body)
        setRows(body)
    },[])

    return(
        <Container >
            <div style={{marginTop:"30px"}}></div>
            <FormControlLabel label="&nbsp;&nbsp;&nbsp;Back" control={<ArrowBack onClick={() => history.push("/addVariant?id="+id)} />}></FormControlLabel>
            <div style={{marginTop:"30px"}}></div>
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

         <Divider/>
         <FormGroup style={{marginTop:"40px",display:"flex",flexDirection:"row-reverse"}} >
            
            {/*  <CarProperties addValue={true}/>*/}
             <Button onClick={handleVariantSave}  size="small" color="primary" variant="contained">Save</Button>
            </FormGroup>
        </Container>
    )
}

export default CarSpecifications