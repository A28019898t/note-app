import { Box } from '@mui/system';
import React, { useContext, useState } from 'react'
import { AuthContext } from './../context/AuthProvider';
import { Avatar, Menu, MenuItem, Typography } from '@mui/material';
import { useNavigate, Navigate } from 'react-router-dom';

const UserMenu = () => {
    const { user: { displayName, photoURL, auth } } = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

    const open = Boolean(anchorEl);

    const handelClick = (e) => {
        setAnchorEl(e.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleLogout = () => {
        auth.signOut();

        // return <Navigate to='/login' />
        navigate('/login');
        return;
    }

    return (
        <>
            <Box sx={{ display: 'flex' }} onClick={handelClick}>
                <Typography>{displayName}</Typography>
                <Avatar
                    alt='avatar'
                    src={photoURL}
                    sx={{ width: 24, height: 24, marginLeft: '5px' }}
                />
            </Box>
            <Menu
                id='basic-menu'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </>
    )
}

export default UserMenu