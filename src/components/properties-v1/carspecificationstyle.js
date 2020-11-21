import { makeStyles } from "@material-ui/core";


export const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      display: 'flex'
    },
    tabs: {
      borderRight: `1px solid ${theme.palette.divider}`,
      
    },
    wrapper: {
      display: 'flex',
      flexDirection: 'row-reverse',
      justifyContent: 'space-between',
      width:200
      
    }
  }));