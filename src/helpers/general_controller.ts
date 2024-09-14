























// import { Query, Resolver, Arg, InputType, Field, Mutation, Ctx} from "type-graphql";
// import { UserModel } from "../schemas/user.schema";
// import bcrypt from 'bcrypt'
// import { graphql } from "graphql";
// import { rateLimit } from "../middleware/reatelimiter";



// @InputType()
// class inputType   // this will be moved
// {
    
// @Field(()=> String)
// email!: string

// @Field(()=> String)
// username!: string


// @Field(()=> String)
// password!: string

// }

// @Resolver()
// export class RegisterResolver
// {
//     @Query(()=> String)
//     me()
//     {
//         return "hello world!!!!!"
//     }

//     @Mutation( ()=> UserModel)
//     async register(
//         @Arg("args") args: inputType,
//         @Ctx('context') context:any
//     )
//     {
//         const ip = context?.req?.ip || 'unknown_ip'
//         console.info(ip)
//         rateLimit(ip)
//         let { email, username, password} = args
//         const create = UserModel.create({email, username, password})
//         await create.save()

//         return create
//     }

// }