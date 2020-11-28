import MaterialTable from "material-table";
import {tableIcons, updateRow} from '../properties-v2/tableprops';
import { TextField, MenuItem, ListItemText, Button, Chip, Tooltip } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { Fragment, useState } from 'react';
import { CloudUpload, Add, AddBox, AddBoxOutlined, AddAPhotoRounded } from "@material-ui/icons";
import {addNewColor,updateImages,deleteColorimages, uploadImages, getFileName} from './modelformservices';
import ImageComponent from "./imagecomponent";
const colors = ["White", "Silver", "Black", "Grey", "Blue", "Red", "Brown", "Yellow", "Green"]

function ModelImage(props){

    const onSelection = (e, value,props) => {
        props.onChange(value);
    }
    return(
      <MaterialTable
        icons={tableIcons}
        options={
          {
          paging:true,
          columnResizable:true,
          toolbar:true,
          header:false,
          showTitle:false,
          search:false,
          pageSize:3,
          pageSizeOptions:[2,3,5]
          }
        }
        columns={
        [
          {title:"Color",field:"color", editComponent: prop => (<Autocomplete value={prop.value}  onChange={(e,value)=>onSelection(e,value,prop)} size="small" 
          style={{ marginRight: "30px", width: 200 }} id="combo-box-demo" options={colors}
          getOptionLabel={option => { return option; }}
          disableClearable={true}
          renderOption={(option) => (
              <React.Fragment>
                  <ListItemText style={{ color: "black" }}> {option}</ListItemText>
              </React.Fragment>
          )}
          renderInput={(params) => { return <TextField value={"select"} {...params} label="Color" variant="outlined" /> }} />)},


          {title:"Images",field:"images", 
          render: rowData =>  <div style={{display:"flex",flexDirection:"row"}}> {rowData.images.map((src,index) => <ImageComponent delete={false} index={index} src={src}/>)}</div>,
          editComponent: prop => (
            <Fragment>
                <div style={{display:"flex",flexDirection:"row"}}>
                {
                    prop.value===undefined?"":prop.value.map((file,index)=> {
                        return  <ImageComponent delete={true} index={index} src={file}></ImageComponent>
                    })
                }
                <div style={{display:"flex",alignItems:"center",marginLeft:"10px",backgroundColor:"Menu",width:"200px",justifyContent:"center"}}>
                <input onChange={(e) => { uploadImages(e,prop)}} multiple accept="image/*" style={{ display: "none" }}
                 id={"icon-button" + props.index} type="file" />
                <label style={{ marginRight: "40px", width: 300 }} style={{ width: "fit-content" }} for={"icon-button" + props.index}>
                <AddAPhotoRounded/></label>
                </div>
                </div>
            </Fragment>
          )}

      ]
  }
  editable={
      {
          onRowAdd: newRow => addNewColor(newRow,props.rows,props.update,props.brand),
          onRowDelete: delRow => deleteColorimages(delRow,props.rows,props.update),
          onRowUpdate: (updatedRow, oldRow) => updateImages(updatedRow,oldRow,props.rows,props.update,props.brand)
      }
  }
  data={props.rows}
 />
   )
}

export default ModelImage