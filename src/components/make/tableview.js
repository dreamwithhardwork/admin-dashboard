import { ArrowBack, AddAPhoto, CloudUpload } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

const { Container, FormControlLabel, Switch, Chip, ListItem, Button, LinearProgress } = require("@material-ui/core");
const { default: MaterialTable } = require("material-table");
const { tableIcons } = require("../properties-v2/tableprops");
const { useEffect, useState, Fragment } = require("react");
const { getAllBrands, uploadLogo, updateBrand, deleteBrand } = require("./brandservice");

function BrandTableView(props){


    const[rows,setRows] = useState([])
    const history = useHistory();

    const removeBrandLogo = (prop) => {
        prop.onChange(null)
    }

    const handleUploadLogo = async (event,prop) => {
        console.log(prop)
        prop.onChange("loading")
        let file = event.target.files[0];
        let body = await uploadLogo(file,prop.rowData.name);
        prop.onChange(body[file.name])
    }

    useEffect(async ()=>{
        let  n_makeList = await getAllBrands();
        setRows(n_makeList);
    },[])

    return(
        <Container>
            <div style={{marginTop:"30px"}}></div>
            <FormControlLabel label="&nbsp;&nbsp;&nbsp;Back" control={<ArrowBack onClick={() => history.push("/make")} />}></FormControlLabel>
            <div style={{marginTop:"30px"}}></div>
            <MaterialTable
            icons={tableIcons}
            title="Brand Details"
            options={
                {
                    toolbar:true,
                }
            }
            columns={
                [
                    {title:"Name",field:"name"},
                    {title:"Popular",field:"popular", render: rowData => <Switch checked={rowData.popular} /> , 
                      editComponent: prop => (<Switch checked={prop.value} onChange={(event)=> prop.onChange(event.target.checked)} ></Switch>)},
                    {title:"Logo",field:"logoUrl", render: rowData => <img style={{maxWidth:"100px"}} src={rowData.logoUrl} alt={rowData.name}/>,
                   editComponent: prop => (
                    <ListItem style={{display:"flex",flexDirection:"column"}}>
                    <input onChange= {(e)=>handleUploadLogo(e,prop)} accept="image/*" style={{display:"none"}} id="brand-props" type="file"/>
                    <label for="brand-props">
                    <Button variant="contained" component="span" color="default" endIcon={<CloudUpload />}>Upload</Button></label>
                     {prop.value==="loading"?<LinearProgress style={{width:"100%",marginTop:"5px"}} color="secondary" />:""}
                     {prop.value!==null && prop.value!=="loading"? <Chip style={{marginTop:"10px"}}  onDelete={()=>removeBrandLogo(prop)} variant="outlined" label="profilepic.png"/>:""}           
                    </ListItem>
                   )}
                ]
            }
            data={
                rows
            }
            editable={
                {
                    onRowDelete: delRow  => deleteBrand(delRow,rows,setRows),
                    onRowUpdate: (newData,oldData) => updateBrand(newData,oldData,rows,setRows)

                }
            }
            />
        </Container>
    )
}


export default BrandTableView;