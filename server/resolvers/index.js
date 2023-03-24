import fakeData from '../fakeData/index.js'
import { FolderModel, NoteModel, NotificationModel } from '../model/index.js'
import AuthorModel from './../model/AuthorModel.js';
import { GraphQLScalarType } from 'graphql'
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();

export const resolvers = {
    Date: new GraphQLScalarType({
        name: 'Date',
        parseValue(value) {
            return value.toISOString();
        }
    }),
    Query: {
        folders: async (parent, args, context) => {
            const folders = await FolderModel.find({
                authorId: context.uid
            }).sort({
                updatedAt: 'desc'
            });
            console.log({ folders, context });
            return folders;
            // return fakeData.folders
        },
        folder: async (parent, args) => {
            const folderId = args.folderId;
            console.log({ folderId });
            const foundFolder = await FolderModel.findOne({
                _id: folderId
            });
            return foundFolder;
        },
        note: async (parent, args) => {
            console.log({ args });
            const noteId = args.noteId;
            const note = await NoteModel.findById(noteId);
            return note;
        }
    },
    Folder: {
        author: async (parent, args) => {
            const authorId = parent.authorId;
            const author = await AuthorModel.findOne({
                uid: authorId
            })
            return author;
        },
        notes: async (parent, args) => {
            console.log({ parent });
            const folderId = parent.id
            const foundNotes = await NoteModel.find({
                folderId
            }).sort({
                updatedAt: 'desc'
            });
            console.log({ foundNotes });

            return foundNotes
        }
    },
    Mutation: {
        addNote: async (parent, args) => {
            const newNote = new NoteModel(args);
            await newNote.save();
            return newNote;
        },
        updateNode: async (parent, args) => {
            const noteId = args.id;
            const note = await NoteModel.findByIdAndUpdate(noteId, args);
            return note;
        },
        addFolder: async (parent, args, context) => {
            const newFolder = new FolderModel({ ...args, authorId: context.uid });
            console.log({ newFolder });
            pubsub.publish('FOLDER_CREATED', {
                folderCreated: {
                    message: 'A new folder created'
                }
            })
            await newFolder.save();
            return newFolder;
        },
        register: async (parent, args) => {
            const foundUser = await AuthorModel.findOne({ uid: args.uid });

            if (!foundUser) {
                const newUser = new AuthorModel(args);
                newUser.save();
                return;
            }

            return foundUser;
        },
        pushNotification: async (parent, args) => {
            const newNotification = new NotificationModel(args);

            pubsub.publish('PUSH_NOTIFICATION', {
                pushNotification: {
                    message: args.content
                }
            });

            await newNotification.save();
            return { message: 'SUCCESS' };
        }
    },
    // subscription by graphQL
    Subscription: {
        folderCreated: {
            subscribe: () => pubsub.asyncIterator(['FOLDER_CREATED'])
        },
        pushNotification: {
            subscribe: () => pubsub.asyncIterator(['PUSH_NOTIFICATION'])
        }
    }
};