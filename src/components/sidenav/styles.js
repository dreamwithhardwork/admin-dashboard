import {makeStyles} from "@material-ui/styles"

export const useStyles = makeStyles({
    open:{
        width: 230,
        ['@media (max-width:780px)']: { // eslint-disable-line no-useless-computed-key
            height: "calc(100vh - 96px);",
            overflow:"scroll",
            maxWidth: 210
        },
        transition: "width 1s",
        height: "calc(100vh - 104px);",
        backgroundColor:"#3c4b64",
        color:"white"
    }
    ,
    close: {
        width: 56,
        ['@media (max-width:780px)']: { // eslint-disable-line no-useless-computed-key
            height: "calc(100vh - 96px);",
            overflow:"scroll",
            maxWidth: 210
        },
        transition: "width 1s",
        height: "calc(100vh - 104px);",
        backgroundColor:"#3c4b64",
        color:"white"
    },
    decoration: {
        textDecoration: "none",
        color:"inherit"
    }
});