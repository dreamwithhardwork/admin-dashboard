import AddIcon from '@material-ui/icons/Add';
import Brand from './brand';
import { Paper } from '@material-ui/core';
import {getAllBrands} from "./brandservice";
import React, { useState } from 'react'
import NewBrandModel from './newbrandform';

function Make(){

    const [makeList,setMakeList] = useState([]);
    const [openAddMake,setDialogNewMake]= useState(false);

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
    <div style={{display:"flex",flexWrap:"wrap",maxHeight:"400px",height:"fit-content",maxWidth:"600px",overflow:"auto"}}>
        <div style={{display:"flex",margin:"3px",width:"80px",alignItems:"center",justifyContent:"center"}}>
            <Paper elevation={3} onClick={()=>{setDialogNewMake(true)}} style={{width:"100%",textAlign:"center",height:"fit-content"}} > <AddIcon/>  </Paper>
       </div>
       {
           makeList.map((make) => 
               <Brand key={make.id} src={make.logoUrl} data={make}/>
           )
       }
       <NewBrandModel open = {openAddMake} close={setDialogNewMake} update={updateBrands} />
      </div>
    )
}

export default Make;