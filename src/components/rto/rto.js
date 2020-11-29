import { Container } from "@material-ui/core";

const { default: MaterialTable } = require("material-table");
const { tableIcons } = require("../properties-v2/tableprops");

function RTO(props){
    return(
        <Container>
            <MaterialTable
         icons={tableIcons}
         title="RTO Details"
         columns={
             [
                 {title:"Code",field:"code"},
                 {title:"District",field:"district"},
                 {title:"State",field:"state"},
                 {title:"Operaing",field:"operating"},
             ]
         }
         editable={
             {
                 onRowAdd: newRow => new Promise((res,rej)=>res())
             }
         }
        />
        </Container>
    )
}

export default RTO;