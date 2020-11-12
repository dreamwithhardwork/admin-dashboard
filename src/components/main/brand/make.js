import AddIcon from '@material-ui/icons/Add';
import Brand from './brand';
import { Paper, FormControlLabel } from '@material-ui/core';
import {getAllBrands} from "./brandservice";
import React, { useState } from 'react'
import NewBrandModel from './newbrandform';
import StickyHeadTable from './tableview';
import {AppsSharp,GridOffSharp} from '@material-ui/icons';


function Make(){

    const [makeList,setMakeList] = useState([]);
    const [openAddMake,setDialogNewMake]= useState(false);
    const [gridView, setGridView]= useState(true);

    const updateBrands = (newBrand) => {
        debugger;
        let newMakeList = [...makeList]
        newMakeList.push(newBrand);
        setMakeList(newMakeList);
    }

    React.useEffect(async () => {
          let  n_makeList = await getAllBrands();
          setMakeList(n_makeList)
            
    },[])
    return(
        <React.Fragment>
           <Paper elevation={0} style={{height:"fit-content"}}> 
            <Paper elevation={10} style={{display:"flex",maxWidth:"500",justifyContent:"flex-end"}}> 
            <FormControlLabel style={{color:"red"}} onClick={()=>{gridView?setGridView(false):setGridView(true)}} control={<AppsSharp/> }></FormControlLabel> 
            </Paper>
      {
       gridView?
       <div style={{display:"flex",flexWrap:"wrap",maxHeight:"300px",height:"fit-content",maxWidth:"540px",overflow:"auto"}}> 
       {
          [
            <div style={{display:"flex",margin:"5px",width:"80px",alignItems:"center",justifyContent:"center"}}>
            <Paper elevation={3} onClick={()=>{setDialogNewMake(true)}} style={{width:"100%",textAlign:"center",height:"fit-content"}}>
            <AddIcon/></Paper>
           </div>,
             makeList.map((make) => <Brand key={make.id} src={make.logoUrl} data={make}/>)
          ]
       }
       <NewBrandModel open = {openAddMake} close={setDialogNewMake} update={updateBrands} />
      </div>:
      <div style={{display:"flex",flexWrap:"wrap",maxHeight:"400px",height:"fit-content",maxWidth:"540px",overflow:"auto"}}> 
      <StickyHeadTable data={makeList} update={setMakeList}/>
      </div>
      }
      </Paper>
      </React.Fragment>
    )
}

export default Make;