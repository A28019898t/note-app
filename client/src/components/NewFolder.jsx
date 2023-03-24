import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Tooltip } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { CreateNewFolderOutlined } from '@mui/icons-material'
import { addNewFolder } from '../utils/foldersUtils';
import { useSearchParams, useNavigate } from 'react-router-dom'

const NewFolder = () => {
    const [newFolderName, setNewFolderName] = useState('');
    const [openPopup, setOpenPopup] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const popupName = searchParams.get('popup');

    const handleOpenPopup = () => {
        setSearchParams({ popup: 'add-folder' });
        // setOpenPopup(openPopup => !openPopup);
    }

    const handleNewFolderNameChange = (e) => {
        setNewFolderName(e.target.value);

    }

    const handleClose = () => {
        setNewFolderName('');
        navigate(-1);
        // setOpenPopup(false);
    }

    const handleAddNewFolder = async () => {
        const { addFolder } = await addNewFolder({ name: newFolderName });
        console.log({ addFolder });
        handleClose();
    }

    useEffect(() => {
        if (popupName === 'add-folder') {
            setOpenPopup(true);
        } else {
            setOpenPopup(false);
        }
    }, [popupName]);

    console.log({ openPopup });

    return (
        <div>
            <Tooltip title='Add Folder' onClick={handleOpenPopup}>
                <IconButton size='small'>
                    <CreateNewFolderOutlined sx={{ color: 'white' }} />
                </IconButton>
            </Tooltip>
            <Dialog open={openPopup}>
                <DialogTitle>New Folder</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin='dense'
                        id='name'
                        label='Folder Name'
                        fullWidth
                        size='small'
                        variant='standard'
                        sx={{ width: '400px' }}
                        autoComplete='off'
                        value={newFolderName}
                        onChange={handleNewFolderNameChange}
                    >
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAddNewFolder}>OK</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default NewFolder