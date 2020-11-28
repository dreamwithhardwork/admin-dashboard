import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    }
    ,
    height: {
        minHeight: 40
    }
}));


export default function Footer() {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <AppBar className={classes.height} color="default" position="sticky">
                <Toolbar className={classes.height} style={{ display: "flex", justifyContent: "center" }}>
                    <a  href="https://autoride.co.in" >autoride.co.in</a>
                    <span>&copy; 2020 autoride</span>
                </Toolbar>
            </AppBar>
        </div>
    )
}