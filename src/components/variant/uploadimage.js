import './variantform.css';
import MaterialTable from 'material-table';
import { tableIcons } from '../properties-v2/tableprops';
import { useEffect, useState, Fragment } from 'react';
import ImageComponent from '../model/imagecomponent'
import { AddAPhotoRounded } from '@material-ui/icons';



export default function UploadImageComponent(props){

    console.log(props)
    const[rows,setRows] = useState([]);
    useEffect(()=> {
      let imageModels = [];
      let interiorImages = props.variant.interiorImages;
      let exteriorImages = props.variant.exteriorImages;
      imageModels.push(
          {type:"exteriorImages",images:[{url:"https://storage.googleapis.com/automax-cars/brandLogo/hyundai.png",description:"ejbhbhfbhbhdbh"},
          {url:"https://storage.googleapis.com/automax-cars/brandLogo/hyundai.png",description:"ejbhbhfbhbhdbh"}]},
          {type:"interiorImages",images:[{url:"https://storage.googleapis.com/automax-cars/brandLogo/hyundai.png",description:"ejbhbhfbhbhdbh"}]}
      );
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
               {title:"Types",field:"type"},
               {title:"Images",field:"images",
               render: rowData =>  <div style={{display:"flex",flexDirection:"row"}}> {rowData.images.map((img,index) => 
                <ImageComponent delete={false} index={index} src={img.url}/>)}</div>,
                editComponent: prop => (
                    <Fragment>
                    <div style={{display:"flex",flexDirection:"row"}}>
                    {
                        prop.value===undefined?"":prop.value.map((file,index)=> {
                            return  <ImageComponent delete={true} prop={prop} index={index} src={file.url}></ImageComponent>
                        })
                    }
                    <div style={{display:"flex",alignItems:"center",marginLeft:"10px",backgroundColor:"Menu",width:"200px",justifyContent:"center"}}>
                    <input onChange={(e) => { console.log("fsaf")}} multiple accept="image/*" style={{ display: "none" }}
                     id={"icon-button" + props.index} type="file" />
                    <label style={{ marginRight: "40px", width: 300 }} style={{ width: "fit-content" }} for={"icon-button" + props.index}>
                    <AddAPhotoRounded/></label>
                    </div>
                    </div>
                </Fragment>
                )
               }
           ]
       }
       editable={
           {
               onRowUpdate: (newData,oldData) => new Promise((resolve,reject)=>{resolve()}),
               onRowDelete: rowDelete => new Promise((resolve,reject)=>{resolve()})
           }
       }
       data={
           rows
       }
       />
    )
}