import React from 'react';
import {Avatar,Badge,ClickAwayListener,Grow,Paper,Popper,MenuItem,MenuList,IconButton} from '@material-ui/core';
import {NotificationsActive as NotificationsActiveIcon} from '@material-ui/icons'
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import {useStyles} from './styles';




function UserProfile() {

    const classes = useStyles();
    const anchorRef = React.useRef(null);
    const [open, setOpen] = React.useState(false)

    const defaultProps = {
        color: 'secondary',
        children: <NotificationsActiveIcon />,
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };
    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <React.Fragment>
            <Badge badgeContent={1} {...defaultProps} className = {classes.avatar} />
            <Avatar ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                className={classes.avatar} src={"/def.png"}></Avatar>

             <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                        <Paper variant="elevation2" >
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                    <div style={{display:"flex",justifyContent:"center"}}>
                                    <input  accept="image/*" style={{display:"none"}} id="icon-button-file" type="file"/>
                                     <label htmlFor="icon-button-file"> <IconButton color="default"aria-label="upload picture"component="span">
                                         <Avatar className={classes.avatarsize} src="default.png" style={{display:"inline-flex"}}></Avatar></IconButton></label>
                                    </div>
                                     <MenuItem style={{justifyContent:"center"}} onClick={handleClose}>Username</MenuItem>
                                    <MenuItem style={{justifyContent:"center"}} onClick={handleClose}>My account</MenuItem>
                                    <MenuItem style={{justifyContent:"center"}} onClick={(event) => {}}>Logout</MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </React.Fragment>
    )
}

export default UserProfile