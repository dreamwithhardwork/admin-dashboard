import './variantform.css';
import MaterialTable from 'material-table';
import { tableIcons } from '../properties-v2/tableprops';
import { useEffect, useState, Fragment } from 'react';
import ImageComponent from '../model/imagecomponent'
import { AddAPhotoRounded } from '@material-ui/icons';
import { removeImageBinaries, upload, uploadImages } from '../model/modelformservices';



export default function UploadImageComponent(props){
    const[rows,setRows] = useState([]);
    useEffect(()=> {
        console.log(props);
      let interiorImagesArray = props.variant.interiorImages;
      let exteriorImagesArray = props.variant.exteriorImages;
      let exteriorImages = {type:"exteriorImages",images:exteriorImagesArray};
      let interiorImages = {type:"interiorImages", images:interiorImagesArray};
      let imageModels = [
          exteriorImages,
          interiorImages
      ];
      setRows(imageModels)
    },[])
   
    return(
       <MaterialTable
       icons={tableIcons}
       title="Images"
       options={
           {
               paging:false,
               header:false
           }
       }
       columns={
           [
               {title:"Types",field:"type", editable:"never"},
               {title:"Images",field:"images",
               render: rowData =>  <div style={{display:"flex",flexDirection:"row"}}> { rowData.images.map((img,index) => 
                { console.log(img); return <ImageComponent delete={false} index={index} src={img}/>}
                )} </div>,
                editComponent: prop => (
                    <Fragment>
                    <div style={{display:"flex",flexDirection:"row"}}>
                    {
                        prop.value===undefined?"":prop.value.map((image,index)=> {
                            return  <ImageComponent delete={true} prop={prop} index={index} src={image}></ImageComponent>
                        })
                    }
                    <div style={{display:"flex",alignItems:"center",marginLeft:"10px",backgroundColor:"Menu",width:"200px",justifyContent:"center"}}>
                    <input onChange={(e) => { uploadImages(e,prop)}} multiple accept="image/*" style={{ display: "none" }}
                     id={"icon-button" + props.index} type="file" />
                    <label style={{ marginRight: "40px", width: 300 }} style={{ width: "fit-content" }} for={"icon-button" + props.index}>
                    <AddAPhotoRounded /></label>
                    </div>
                    </div>
                </Fragment>
                )
               }
           ]
       }
       editable={
           {
               onRowUpdate: (newData,oldData) => new Promise(async (resolve,reject)=>{
                   let newRows = [...rows];
                   newRows.splice(oldData.tableData.id,1,newData);
                   let newVariant = {...props.variant};
                   newVariant.description ="modified";
                   let response = await upload(newData.images,newVariant.make+"/"+newVariant.model,newData.type)
                   let newImages = removeImageBinaries(newData.images);
                   Object.values(response).map(item =>{
                       newImages.push({
                           url:item
                       })
                   })
                   newVariant[newData.type] = newImages;
                   newRows[0].type===newData.type ? newRows[0].images = newImages : newRows[1].images = newImages
                   setRows(newRows);
                   console.log(newVariant)
                   props.setVariant(newVariant)
                   resolve();
                }),
               onRowDelete: rowDelete => new Promise((resolve,reject)=>{
                let newRows = [...rows];
                newRows.splice(rowDelete.tableData.id,1);
                setRows(newRows);
                   resolve()
                })
           }
       }
       data={
           rows
       }
       />
    )
}