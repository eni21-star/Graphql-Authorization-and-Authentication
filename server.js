import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { resolvers } from './resolvers/resolvers.js'
import { typeDefs } from './typeDefs/typeDefs.js'
import { jwtVerify } from './middleware/jwt.auth.js'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose';

const context =  ({ req }) => {
    const header = req.headers.token
    if(!header)
    {
      throw new Error(' no token header')
    }
    const token = header.split(" ")[1];
    if (!token) {
      throw { error: new Error('no token in header found') };
    }
    const user =  jwtVerify(token);
    return { user }; 
  }
const server = new ApolloServer({
    typeDefs,
    resolvers,
    
  });

mongoose.connect('mongodb://localhost:27017/games')
    .then(async () => {
        const { url } = await startStandaloneServer(server, {
            listen: { port: 4000 },
            context
        });

        console.log(`🚀  Server ready at: ${url}`);
    })
    .catch((err) => console.error(err))


  