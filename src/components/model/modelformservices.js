export const handleNameChange = () => {

}

export const handleDescriptionChange = () => {

}

export const handlePopularityChange = () => {

}

export const onUploadFiles = (event,setNewState,index) => {
  let files =  event.target.files;
  let images = []
  for(let i =0;i<files.length;i++){
   images.push(files[i].name)
  }
  setNewState(index,images)
}