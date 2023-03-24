import React, { useEffect, useMemo, useState } from 'react';
import { ContentState, convertFromHTML, convertToRaw, EditorState } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import { useLoaderData, useLocation, useSubmit } from 'react-router-dom';
import { Editor } from 'react-draft-wysiwyg'
import { debounce } from '@mui/material';

const Note = () => {
    const submit = useSubmit();
    const location = useLocation();
    const { note } = useLoaderData();
    console.log('[Data Note Loader]', note);

    const [editorState, setEditorState] = useState(() => {
        return EditorState.createEmpty();
    });
    const [rawHTML, setRawHTML] = useState(note.content);

    useEffect(() => {
        const blockSFormHTML = convertFromHTML(note.content);
        const state = ContentState.createFromBlockArray(
            blockSFormHTML.contentBlocks,
            blockSFormHTML.entityMap
        );

        setEditorState(EditorState.createWithContent(state));
    }, [note.id]);

    console.log({ location });

    useEffect(() => {
        deboundcedMemorized(rawHTML, note, location.pathname)
    }, [rawHTML, location.pathname])

    const deboundcedMemorized = useMemo(() => {
        return debounce((rawHTML, note, pathname) => {
            if (rawHTML === note.content) return;

            submit({
                ...note,
                content: rawHTML
            }, {
                method: 'post',
                action: location.pathname
            })
        }, 1000)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setRawHTML(note.content);
    }, [note.content]);

    const handleOnChange = (e) => {
        setEditorState(e);
        setRawHTML(draftToHtml(convertToRaw(e.getCurrentContent())));
    }

    return (
        <Editor
            editorState={editorState}
            onEditorStateChange={handleOnChange}
            placeholder='Write something'
        />
    )
}

export default Note