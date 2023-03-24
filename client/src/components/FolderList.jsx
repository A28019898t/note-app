import { Box, Card, CardContent, List, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import NewFolder from './NewFolder';

const FolderList = ({ folders }) => {
    const { folderId } = useParams();
    console.log({ folderId });

    const [activeFolderId, setActiveFolderId] = useState(folderId)

    return (
        <List sx={{
            width: '100%',
            backgroundColor: '#7D9D9c',
            height: '100%',
            padding: '10px',
            textAlign: 'left',
            overflowY: 'auto'
        }}
            subheader={
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <Typography sx={{ fontWeight: 'bold', color: 'white' }}>
                        Folders
                    </Typography>
                    <NewFolder />
                </Box>
            }
        >
            {folders?.length ?
                folders.map(({ id, name }) => {
                    return (
                        <Link
                            key={id}
                            to={`folders/${id}`}
                            style={{
                                textDecoration: 'none'
                            }}
                            onClick={() => setActiveFolderId(id)}
                        >
                            <Card sx={{
                                marginBottom: '5px',
                                backgroundColor: id === activeFolderId ? 'rgb(255 211 140)' : null
                            }}>
                                <CardContent
                                    sx={{ '&:last-child': { paddingBottom: '10px' }, padding: '10px' }}
                                >
                                    <Typography sx={{
                                        fontSize: 16,
                                        fontWeight: 'bold'
                                    }}
                                    >
                                        {name}
                                    </Typography>
                                </CardContent>
                            </Card>

                        </Link>
                    )
                }) :
                ''
            }
        </List>
    )
}

export default FolderList