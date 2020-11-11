import MUIDataTable from "mui-datatables";
import { PinDropSharp } from "@material-ui/icons";
import { Switch, FormControlLabel, Container, Box } from "@material-ui/core";
import {ACTION_TYPES} from '../../constants/constants'
import { connect } from "react-redux";
import {SERVICE_URL} from "../../constants/constants"
import {deleteRequest} from '../../constants/headers'

function StickyHeadTable(props) {
  const columns = [
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: "logoUrl",
      label: "Logo",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return(
            <FormControlLabel
             control={
               <img style={{width:"70px"}} src={value}></img>
             }
            />
          )
        }
      }
    },
    {
      name: "popular",
      label: "Popular Brand",
      options: {
        filter: true,
        customBodyRender: (value, tableMeta, updateValue) => {

          return (
            <FormControlLabel
              label={value ? "Yes" : "No"}
              value={value ? "Yes" : "No"}
              control={
                <Switch color="primary" checked={value} value={value ? "Yes" : "No"} />
              }
            />
          );

        }
      }
    }
  ];

  const options = {
    filterType: 'dropdown',
    responsive:'standard',
    rowsPerPage:4,
    fixedHeader: false,
    fixedSelectColumn: false,
    responsive:"simple",
    selectableRows:true,
    download:false,
    elevation:10,
    print:false,
    rowsPerPage:[3],
    rowsPerPageOptions:[3,4,5],
    selectableRows:"single",
    selectableRowsHeader:false,
    selectToolbarPlacement:"replace",
    viewColumns:true,
    tableBodyMaxHeight:"400px",
    onRowSelectionChange: () => {
       //console.log(arguments)
    },
    onRowsDelete:async (row,data,newTableDate) => {
      props.openBackDrop();
      newTableDate = [...props.data]
      let newData = [...props.data];
      let ind = row.data[0].dataIndex;
      let itemTodelete =  newData.splice(ind,1);
      let returnVal = false;
      try{
        let response = await fetch(SERVICE_URL.DELETE_MAKE_BY_ID+itemTodelete[0].id,deleteRequest());
        if(response.status===200){
          props.update(newData);
          props.toastMessage({open:true,severity:"success",message:itemTodelete[0].name+" deletion success!!!"})
          returnVal= true;
        }
        else{
          props.toastMessage({open:true,severity:"error",message:itemTodelete[0].name+" deletion failed!!!"})
        }
      }
      catch(ex){
        props.toastMessage({open:true,severity:"error",message:itemTodelete[0].name+" deletion failed!!!"})
      }

      props.closeBackDrop();
      return returnVal;
      
    },
    setRowProps: (row, dataIndex, rowIndex) => {
      return {
        width:"100px"
      };
    },
    setTableProps: () => {
      return {
        padding:  'default',

        // material ui v4 only
        size:  'small',

        width:"600px"
      };
    }
  };
  return (
    <Box>
    <MUIDataTable
      title={"All Brands"}
      data={props.data}
      columns={columns}
      options={options}
    />
    </Box>
  )

}

const mapDispatchToProps = dispatch => {
  return{
    toastMessage: (toast) => {
      dispatch({type:ACTION_TYPES.TOAST,toast:toast})
    },
    openBackDrop: () => {
      dispatch({type:ACTION_TYPES.OPEN_BACKDROP})
    },
    closeBackDrop: () => {
      dispatch({type:ACTION_TYPES.CLOSE_BACKDROP})
    }

  }
}

export default connect(null,mapDispatchToProps)(StickyHeadTable);