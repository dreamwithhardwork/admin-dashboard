import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    displayBlock: {
        display: "block"
    },
    displayNone: {
        display: "none"
    },
    avatar: {
        marginLeft: theme.spacing(4),
    },
    avatarsize: {
        width: theme.spacing(10),
        height: theme.spacing(10),
      }
}));