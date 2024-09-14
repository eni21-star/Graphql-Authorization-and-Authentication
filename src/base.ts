import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { ReqUser } from './server'
import { GraphQLError } from 'graphql'
dotenv.config()

export class Base{

    verify_token(token: string)
    {
      return jwt.verify(token, process.env.ACCESS_SECRET_KEY as string)
    }

   token_exp(payload: any)
   {
    const time_in_seconds = Math.floor(Date.now()/1000)
    return payload.exp < time_in_seconds
   }

    get_user(token: string)
    {
      const payload = this.verify_token(token)

      const verify = this.token_exp(payload)
      if(!verify) throw new GraphQLError('invalid token')
      
      return payload
    }


}