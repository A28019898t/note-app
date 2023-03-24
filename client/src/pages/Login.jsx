import React, { useContext } from 'react'
import { Button, Typography } from '@mui/material'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { AuthContext } from './../context/AuthProvider';
import { Navigate, useNavigate } from 'react-router-dom';
import { graphqlRequest } from './../utils/requests';

const Login = () => {
    const auth = getAuth();
    const { user } = useContext(AuthContext);
    console.log({ user });
    // const navigate = useNavigate();

    const handleLoginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();

        const { user: { uid, displayName } } = await signInWithPopup(auth, provider);

        const { data } = await graphqlRequest({
            query: `mutation register($uid: String!, $name: String!) {
                register(uid: $uid, name: $name) {
                    uid
                    name
                }
            }`,
            variables: {
                uid,
                name: displayName
            }
        })
        console.log('[Login User]', data);

        return;
    }

    if (localStorage.getItem('accessToken')) {
        return <Navigate to='/' />
    }

    return (
        <>
            <Typography
                variant='h5'
                sx={{ marginBottom: '10px' }}
            >
                Welcome to Note App
            </Typography>

            <Button
                variant='outlined'
                onClick={handleLoginWithGoogle}
            >
                Login With Google
            </Button>

        </>
    )
}

export default Login