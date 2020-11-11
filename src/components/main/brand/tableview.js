import MUIDataTable from "mui-datatables";
import { PinDropSharp } from "@material-ui/icons";
import { Switch, FormControlLabel, Container, Box } from "@material-ui/core";
import {ACTION_TYPES} from '../../constants/constants'
import { connect } from "react-redux";

function StickyHeadTable(props) {
  const columns = [
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: value => ({ style: { textDecoration: 'none' } }),
        setCellProps: value => ({style:{maxWidth:"20px",height:"20px"}})
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
    rowsPerPage:2,
    fixedHeader: false,
    fixedSelectColumn: false,
    onRowSelectionChange: () => {
       //console.log(arguments)
    },
    onRowsDelete:(row,data,newTableDate) => {
      newTableDate = [...props.data]
      let newData = [...props.data];
      let ind = row.data[0].dataIndex;
      let itemTodelete =  newData.splice(ind,1);
      console.log(itemTodelete);
      props.update(newData);
      props.toastMessage({open:true,severity:"success",message:itemTodelete[0].name+" deletion success!!!"})
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
    }

  }
}

export default connect(null,mapDispatchToProps)(StickyHeadTable);