import React, { useEffect, useState } from 'react'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { createClient } from 'graphql-ws'
import { GRAPHQL_SUBSCRIPTION_ENDPOINT } from '../utils/constants';
import { Badge, Menu, MenuItem } from '@mui/material';
import { red } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

const client = createClient({
    url: GRAPHQL_SUBSCRIPTION_ENDPOINT,
});

const PushNotification = () => {
    const [invisible, setInvisible] = useState(true);
    const [notification, setNotification] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const onNext = (data) => {
                console.log('[PUSH NOTIFICATION]', { data });
                setInvisible(false);
                const message = data?.data?.pushNotification?.message;
                setNotification(message);
            };

            const query = `subscription Subscription {
                pushNotification {
                  message
                }
              }`

            await new Promise((resolve, reject) => {
                client.subscribe(
                    {
                        query,
                    },
                    {
                        next: onNext,
                        error: reject,
                        complete: resolve,
                    },
                );
            });
        })();
    }, []);

    const handelClick = (e) => {
        if (notification) {
            setAnchorEl(e.currentTarget)
        }
    }
    const handleClose = () => {
        setNotification('');
        setInvisible(true);
        setAnchorEl(null);
    }

    const handleLogout = () => {
        // return <Navigate to='/login' />
        navigate('/login');
        return;
    }

    return (
        <Badge color='secondary' variant='dot' invisible={invisible}>
            <NotificationsIcon onClick={handelClick} />
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleLogout}>{notification}</MenuItem>
            </Menu>
        </Badge>
    )
}

export default PushNotification