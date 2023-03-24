import { graphqlRequest } from './requests';

export const notesLoader = async ({ params: { folderId } }) => {
  console.log({ paramsFolderID: folderId });

  const query = `query Notes($folderId: String!) {
        folder(folderId: $folderId) {
          id
          name
          notes {
            content
            id
            updatedAt
          }
        }
      }`;

  const data = await graphqlRequest({
    query,
    variables: {
      folderId
    }
  });

  console.log('[Note List]', data);

  return data;
}

export const noteLoader = async ({ params: { noteId } }) => {
  console.log('[Params-Note]', noteId);

  const query = `query Note($noteId: String) {
      note(noteId: $noteId) {
        content 
        id

      }
    }`;

  const data = await graphqlRequest({
    query,
    variables: {
      noteId
    }
  });

  console.log('[Note]', data);

  return data;
}

export const addNewNote = async ({ params, request }) => {
  const newNote = await request.formData();
  const formDataObj = {};
  newNote.forEach((value, key) => (formDataObj[key] = value));

  console.log({ newNote, formDataObj });
  const query = `mutation Mutation($content: String, $folderId: ID!) {
    addNote(content: $content, folderId: $folderId) {
      id
      content
    }
  }`;

  const { addNote } = await graphqlRequest({
    query,
    variables: formDataObj
  })

  console.log({ addNote });

  return addNote;
}

export const updateNote = async ({ params, request }) => {
  const newNote = await request.formData();
  const formDataObj = {};
  newNote.forEach((value, key) => (formDataObj[key] = value));

  const query = `mutation Mutation($id: String!, $content: String!) {
    updateNode(id: $id, content: $content) {
      id,
      content
    }
  }`;

  const updateNote = await graphqlRequest({
    query,
    variables: formDataObj
  });

  return updateNote;
}