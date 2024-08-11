import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { resolvers } from './resolvers/resolvers.js'
import { typeDefs } from './typeDefs/typeDefs.js'
import { jwtVerify } from './middleware/jwt.auth.js'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose';
import express from 'express'

const context = async ({ req }) => {
    const token = req.headers.token.split(" ")[1];
    if (!token) {
      return { error: new Error('no token found') };
    }
    const user = await jwtVerify(token);
    return { user }; // <--- Return the user object correctly
  }
// const app = express()
// app.use(jwtVerify)
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context
  });

mongoose.connect('mongodb://localhost:27017/games')
    .then(async () => {
        const { url } = await startStandaloneServer(server, {
            listen: { port: 4000 },
        });

        console.log(`🚀  Server ready at: ${url}`);
    })
    .catch((err) => console.error(err))


  