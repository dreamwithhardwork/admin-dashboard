

export const onUploadFiles = (event,setNewState,index,color) => {
  let files =  event.target.files;
  let images = []
  for(let i =0;i<files.length;i++){
   images.push(files[i])
  }
  setNewState(index,color,images)
}


const upload = async (file,brand,color) => {
        var data = new FormData();
        debugger;
        file.forEach((f)=> {
            if(f.file!=undefined){
              data.append('files', f.file)
            }
        })
        data.append('filePath','model/'+brand+"/"+color)
        let res =  await fetch("https://image-service-cemhl7ajqq-uc.a.run.app/api/upload", {
            method:"POST",
            body: data,
            files: file
        });
        let body = await res.json();
        return body;
}

export const getFileName = (item)=>{
   if(item.name === undefined){
     let index = item.indexOf("/model");
     let path = item.substr(index);
     return path.split("/")[3];
   }
   else{
    return item.name;
   }
}

const addLocalImage = (file,images) => {
return new Promise((res,rej)=> {
  const fileReader = new FileReader();
  fileReader.readAsDataURL(file);
  fileReader.onload = () => {
    if(fileReader.readyState === 2){
        images.push({file:file, value:fileReader.result});
        res();
    }
 }

})
}

export const uploadImages = async (event,props) => {
  let files =  event.target.files;
  let images = props.value === undefined ? [] : props.value;
  
  for(let i =0;i<files.length;i++){
       await addLocalImage(files[i],images);
       props.onChange(images);
  }
}

function removeImageBinaries(arr){
  let images = [];
  arr.map((item)=> {
    if(item.file===undefined){
      images.push(item)
    }
  })
  return images;
}

export const addNewColor = (newRow,rows,setRows,brand) => {
  let newRows = [...rows];
  let color = newRow.color;
  let files = newRow.images;
  debugger;
  return new Promise(async (resolve,reject)=> {
    if(newRow.color!==undefined){
       let body = await upload(files,brand,color)
       let newImages = removeImageBinaries(files);
       Object.values(body).map(item => {
         newImages.push(item);
       })
       newRow.images = newImages;
       newRows.push(newRow);
       setRows(newRows);
       resolve();
    }
    else{
       reject("Choose color")
    }
  })
  
}

export const deleteColorimages = (delRow,rows,setRows) => {
  let index = delRow.tableData.id;
  let newRows = [...rows];
  return new Promise(async (resolve,reject) => {
    newRows.splice(index,1);
    setRows(newRows)
    resolve()
  })
}

export const updateImages =  (updatedRow,oldRow,rows,setRows,brand) => {

  console.log(updatedRow);
  console.log(oldRow);
  console.log(rows);
  let newRows = [...rows];
  let newRow = {...updatedRow}
  let color = newRow.color;
  let files = newRow.images;
  let index = oldRow.tableData.id;
   return new Promise(async (resolve,reject) => {
    if(newRow.color!==undefined){
      let body = await upload(files,brand,color)
      let newImages = removeImageBinaries(files);
      Object.values(body).map(item => {
        newImages.push(item);
      })
      newRow.images = newImages;
      newRows.splice(index,1,newRow);
      setRows(newRows);
      resolve();
   }
   else{
      reject("Choose color")
   }
   })
}


export const getColorImagesPayload = (arr) => {
   let imagesWithColors = {};
    arr.map((item) => {
       imagesWithColors[item.color] = item.images;
    })
    return imagesWithColors;
}

export const setColorImagesPayload = (arr) => {
  let imagesWithColors = {};
  let keys = Object.keys(arr);
  let images = []
   keys.map((item) => {
      images.push({color:item,images:arr[item]})
   })
   return images;
}