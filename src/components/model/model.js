import { Paper, Chip, Avatar } from "@material-ui/core";
import './modelstyle.css';
import { Done } from "@material-ui/icons";
import AutoRideToolBar from '../make/toolbar';
import { useState } from "react";

function Model(props){

    const models =[
          {
             id: "123222",
            description: "seltos ",
            logoUrl: "",
            make: "kia",
            name: "seltos",
            popular: true
          }
          ,
          {
            id: "1232223",
           description: "sonet ",
           logoUrl: "",
           make: "kia",
           name: "sonet",
           popular: true
         }
    ]
    const [filterList, setFilterList] = useState(models);
    const handleFilter = (searchTearm) => {
        let pattern = new RegExp(searchTearm,"i");
        let filteredList = models.filter(make => make.name.match(pattern));
        setFilterList(filteredList);
    }


    return(
        <Paper elevation={0} className="modelroot">
            <AutoRideToolBar type="Model" filter={handleFilter}/>
            <div style={{display:"flex"}}>
           {
               filterList.map((model) => {
                return(
                <Chip size="medium" style={{width:"fit-content", margin:"10px",paddingRight:"20px"}} key={model.id} avatar={<Avatar>{model.name.charAt(0).toLocaleUpperCase()}</Avatar>} label={model.name}
                clickable color="default"
                deleteIcon={<Done />}></Chip>
                )
               })
            
           }
           </div>
        </Paper>
    )
}

export default Model;