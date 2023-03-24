import 'dotenv/config'
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { expressMiddleware } from '@apollo/server/express4'
import mongoose from 'mongoose';
import './firebaseConfig.js'

import { typeDefs } from './schemas/index.js';
import { resolvers } from './resolvers/index.js'
import { getAuth } from 'firebase-admin/auth';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';

// express
const app = express();

const PORT = process.env.PORT || 4000;

const httpServer = http.createServer(app);

const URI = `mongodb+srv://${process.env.DB_username}:${process.env.DB_password}@note-app.ccr0eh6.mongodb.net/?retryWrites=true&w=majority`

const schema = makeExecutableSchema({ typeDefs, resolvers });

// Creating the WebSocket server
const wsServer = new WebSocketServer({
    // This is the `httpServer` we created in a previous step.
    server: httpServer,
    // Pass a different path here if app.use
    // serves expressMiddleware at a different path
    path: '/',
});

// Hand in the schema we just created and have the
// WebSocketServer start listening.
const serverCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer }), {
        async serverWillStart() {
            return {
                async drainServer() {
                    await serverCleanup.dispose();
                },
            };
        },
    },]
});

await server.start();

const authorizationJWT = async (req, res, next) => {
    const authorizationHeader = req.headers.authorizations;
    console.log({ authorizationHeader });

    if (authorizationHeader) {
        const accessToken = authorizationHeader.split(' ')[1];

        getAuth()
            .verifyIdToken(accessToken)
            .then(decodedToken => {
                console.log({ decodedToken: decodedToken });
                res.locals.uid = decodedToken.uid;
                next();
            })
            .catch(err => {
                console.log({ err });
                return res.status(403).json({ message: 'Forbidden', error: err });
            })

    } else {
        // console.log('are you sure ???');
        // return res.status(401).json({ message: 'Unauthorized' });
        next();
    }
}

app.use(cors(), authorizationJWT, bodyParser.json(), expressMiddleware(server, {
    context: async ({ req, res }) => {
        return { uid: res.locals.uid };
    }
}))

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
    console.log('Connected to DB');

    await new Promise((resolve) => httpServer.listen(PORT, resolve));

    console.log(`Server ready at http://localhost:${PORT}`);
})