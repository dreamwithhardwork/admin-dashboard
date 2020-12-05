import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { forwardRef, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { SERVICE_URL } from '../constants/constants';
import { getRequest } from '../constants/headers';
const { default: MaterialTable } = require("material-table");
const { FormControlLabel, Switch, List, ListItem, ListItemText } = require("@material-ui/core");

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

  const handleRowAdd = (rowdata) => {
      console.log(rowdata)
      let promise = new Promise((res,rej)=>{
        res()
      })
      return promise
  }

  

function MakeTableView(props){
    console.log(props)
    const[variants,setVariante] = useState([]);
    const history = useHistory();

    useEffect(async ()=>{

    let res = await fetch(SERVICE_URL.GET_VARIANTS_BY_MAKE_MODEL+"make="+props.activeBrand+"&model="+props.activeModel.name,getRequest());
    let body = await res.json();
    setVariante(body)

    },[props.activeModel])

    return(
        <MaterialTable
        icons={tableIcons}
    
        options={
            {
                search:false,
                showTitle:false,
                paging:false,
                columnResizable:true,
                headerStyle:{
                    display:"none"
                }
                ,
                toolbar:false,
                rowStyle:{
                    padding:"0px"
                },
                actionsColumnIndex: -1
            }
        }
        columns= {
            [
                {title:"variant", field:'name', cellStyle: {padding:0},
                 render: rowData => <List component="nav">
                <ListItem style={{color:"HighlightText",padding:"0px 6px"}}>
                    <ListItemText primary ={rowData.variantName} secondary={[rowData.transmission, rowData.bodyType].join(", ")}></ListItemText>
                </ListItem>
            </List>},
               {title:"ex-showroom",field:"ex-showroom", cellStyle:{padding:0},
               render: rowData => <List component="nav">
                <ListItem style={{color:"HighlightText",padding:"0px 6px"}}>
                    <ListItemText primary ={"Ex-showroom price"} secondary={new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
        }).format(rowData.exShowroomPrice)}></ListItemText>
                </ListItem>
            </List>},
            {
                title:"dummy",field:"dummy",
                render: rowData => <Edit onClick= {()=>{history.push("/addVariant?id="+rowData._id)}}/>
            }

            ]
        } 
        
        onRowClick={(event, rowData, togglePanel) => {}}
        data={variants}
        >

        </MaterialTable>
    )
}


const mapPropsToState = state => {
    return {
        ...state
    }
}

const mapDispatchToState  = dispatch => {
    return {
         dispatch
    }
}

export default connect(mapPropsToState,mapDispatchToState)(MakeTableView)