import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Iregister, login_response,Login_input } from "./_types";
import Users from "../../models/user";
import { custom_errors } from "../../helpers/error_handler";
import { GraphQLError } from "graphql";
import { data_source } from "./data_source";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
@Resolver()
export class user_resolvers {
     @Mutation(()=> Users)
    async register(@Arg('args') args: Iregister){
       try {
        const { email, username, password, role } = args
       if(!email || !username || !password || !role) throw new custom_errors().Bad_Request("Please enter required fields")

       const user_exist = await data_source.findByEmail(email)
       if(user_exist) throw new custom_errors().Conflict("Email already exist")

       const create = await data_source.newAccount(args)
       if(!create) throw new GraphQLError('Error registering at this time')
       return create
       } catch (error) {
        throw error
       }

    }
    @Mutation(()=> login_response )
    async Login(@Arg('args') args: Login_input):Promise<login_response>
    {

        const {email, password} = args
        if(!email || !password) throw new custom_errors().Bad_Request('Please Enter required Fields')
        const user_exist = await data_source.findByEmail(email)
        if(!user_exist) throw new custom_errors().Not_Found("Email does not exist")

        const compare_pass = await bcrypt.compare(password, user_exist.password)
        if(!compare_pass) throw new custom_errors().Unauthorized('Incorrect Password')

        const accesstoken = jwt.sign({_id: user_exist._id}, process.env.ACCESS_SECRET_KEY as string, {expiresIn: '1hr'})
        const refreshtoken = jwt.sign({_id: user_exist._id}, process.env.REFRESH_SECRET_KEY as string, {expiresIn: '1hr'})
        return {accesstoken, refreshtoken}
    }
    @Query(()=> String)
    me(){
        return 'hello world'
    }
}