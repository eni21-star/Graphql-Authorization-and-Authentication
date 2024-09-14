import 'reflect-metadata'
import { ApolloServer } from "@apollo/server"
import { expressMiddleware } from '@apollo/server/express4'
import express, { Application, NextFunction, Request, Response } from 'express'
import { db_config } from "./config/db_config"
import { buildSchema } from "type-graphql"
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import http from 'http'
import cors from 'cors'
import dotenv from 'dotenv'
import { resolvers } from "./resolvers"
import { GraphQLFormattedError } from "graphql"
import { formatError } from "./helpers/format_error"
import { author } from "./models/author"
import users from "./models/user"
import book from "./models/books"
import { Base } from './base'
import { ObjectId } from 'typeorm'
const PORT: number = process.env.PORT ? Number(process.env.PORT) : 4000
const app: Application = express()
dotenv.config() // env is in root
const httpServer = http.createServer(app)

interface MyContext {
    token?: String;
  }

export interface ReqUser{
_id: ObjectId
author_id?: ObjectId
iat: number
exp: number
}

  declare global 
  {
    namespace Express{
        interface Request
        {
            user?: ReqUser
        }
    }
  }


const startServer = async () =>{
    const schema = await buildSchema(
        {
            resolvers
        }
    )
    
    const server = new ApolloServer<MyContext>({
        schema,
        formatError: formatError,
        plugins:[
            ApolloServerPluginDrainHttpServer({ httpServer })
        ],
        csrfPrevention: false, // for dev
        
    })

   await server.start()

   app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
         let user = null
         let token
        const header = req?.headers?.authorization 
        if(header)
        {
           token = header.startsWith('Bearer') ? header.split(" ")[1] : null
        }
        if(token)
        {
            user = new Base().verify_token(token)
        }
         

        return { req, res, user } 
       
      },
    
    })
  );
            await db_config.initialize()
            httpServer.listen({port: PORT}, ()=>{
                console.info(`server is running on http://localhost:4000/graphql`)
            })
      
}
startServer()
export const author_model = db_config.getMongoRepository(author)
export const user_model = db_config.getMongoRepository(users)
export const book_model = db_config.getMongoRepository(book)
