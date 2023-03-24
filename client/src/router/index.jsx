import { createBrowserRouter, Outlet } from "react-router-dom";
import AuthProvider from "../context/AuthProvider";
import Home from "../pages/Home"
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import ErrorPage from './../pages/ErrorPage';
import NoteList from "../components/NoteList";
import Note from './../components/Note';
import { noteLoader, notesLoader, updateNote } from '../utils/notesUtils';
import { foldersLoader } from './../utils/foldersUtils';
import { addNewNote } from './../utils/notesUtils';

const AuthLayout = () => {
    return <AuthProvider><Outlet /></AuthProvider>
}

export default createBrowserRouter([
    {
        element: <AuthLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                element: <Login />,
                path: '/login'
            },
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        element: <Home />,
                        path: '/',
                        loader: foldersLoader,
                        children: [
                            {
                                element: <NoteList />,
                                path: `folders/:folderId`,
                                action: addNewNote,
                                loader: notesLoader,
                                children: [
                                    {
                                        element: <Note />,
                                        path: 'note/:noteId',
                                        action: updateNote,
                                        loader: noteLoader
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
])