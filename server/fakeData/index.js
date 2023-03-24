export default {
    authors: [
        {
            id: '123',
            name: 'Duy Anh'
        },
        {
            id: '999',
            name: 'Huyen Tran'
        },

    ],
    folders: [
        {
            id: '1',
            name: 'Home',
            createdAt: '2023-01-18T03:42:13Z',
            authorId: '123'
        },
        {
            id: '2',
            name: 'New Folder',
            createdAt: '2023-02-18T03:42:13Z',
            authorId: '999'
        },
        {
            id: '3',
            name: 'Work',
            createdAt: '2023-03-18T03:42:13Z',
            authorId: '123'
        },
    ],
    notes: [
        {
            id: '123',
            content: '<p>Test for the fake note<p>',
            folderId: '1'
        },
        {
            id: '124',
            content: '<p>Test for the fake note 1<p>',
            folderId: '2'
        },
        {
            id: '125',
            content: '<p>Test for the fake note 2<p>',
            folderId: '1'
        },
    ]
}