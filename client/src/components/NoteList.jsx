import { NoteAddOutlined } from '@mui/icons-material';
import { Card, CardContent, Grid, IconButton, List, Tooltip, Typography } from '@mui/material'
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { Link, Outlet, useParams, useLoaderData, useSubmit, useNavigate } from 'react-router-dom';
import moment from 'moment'

const NoteList = () => {
    const { noteId, folderId } = useParams();
    const [activeNoteId, setActiveNoteId] = useState(noteId);

    const navigate = useNavigate();
    const submit = useSubmit();
    const { folder } = useLoaderData();
    console.log({ folder });

    const handleAddNewNote = () => {
        submit(
            {
                content: '',
                folderId
            },
            {
                method: 'post',
                action: `/folders/${folderId}`
            }
        )
    }

    useEffect(() => {
        if (noteId === activeNoteId) {
            setActiveNoteId(noteId);
            return;
        }
        if (folder?.notes?.[0]) {
            // setActiveNoteId(folder.notes[0].id);
            navigate(`note/${folder.notes[0].id}`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [noteId, folder])


    return (
        <Grid container height='100%'>
            <Grid item xs={4} sx={{
                width: '100%',
                maxWidth: '360px',
                backgroundColor: '#F0EBE3',
                height: '100%',
                overflowY: 'auto',
                padding: '10px',
                textAlign: 'left'
            }}>
                <List
                    subheader={
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <Typography sx={{
                                fontSize: '14px',
                                fontWeight: 'bold',
                            }}>
                                Notes
                            </Typography>
                            <Tooltip title='Add Note' onClick={handleAddNewNote}>
                                <IconButton size='small'>
                                    <NoteAddOutlined />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    }
                >
                    {
                        folder.notes.map(({ id, content, updatedAt }) => {
                            return <Link
                                key={id}
                                to={`note/${id}`}
                                style={{ textDecoration: 'none' }}
                                onClick={(() => setActiveNoteId(id))}
                            >
                                <Card sx={{
                                    marginBottom: '5px',
                                    backgroundColor: id === activeNoteId ? 'rgb(255 211 140)' : null
                                }}>
                                    <CardContent sx={{
                                        '&:last-child': { paddingBottom: '10px' },
                                        padding: '10px'
                                    }}>
                                        <div style={{
                                            fontSize: 14,
                                            fontWeight: 'bold'
                                        }}
                                            dangerouslySetInnerHTML={{ __html: `${content.substring(0, 30)}` || "Empty" }}
                                        />
                                    </CardContent>
                                    <Typography sx={{
                                        fontSize: 10
                                    }}
                                    >
                                        {moment(updatedAt).format('MMMM Do YYYY, h:mm:ss a')}
                                    </Typography>
                                </Card>
                            </Link>
                        })
                    }
                </List>
            </Grid>
            <Grid item xs={8}>
                <Outlet />
            </Grid>
        </Grid>
    )
}

export default NoteList