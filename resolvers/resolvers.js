import userModel from "../models/user.model.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import env from 'dotenv'
env.config()
const generateToken = (tok) => {
    const token = jwt.sign(tok, process.env.SECRET_KEY)
    return token
}

export const resolvers = {
    Query: {
        async login(_, args) {
            const user = args
          
            const findUser = await userModel.findOne({ email: user.email })
          
            if (!findUser) {
                throw new Error('please create an account')
            }

            const comparePassword = await bcrypt.compare(user.password, findUser.password)
            if (!comparePassword) {
                throw new Error('password do not match')
            }
            const userObj = findUser.toObject()
            delete userObj.password
            delete userObj.email
          const token =  generateToken(userObj)
            console.log(token)
            return { token }

        },
        protected: (_,args,context)=>{
            if(!context){
                throw new Error('you are not authenticated')
            }
            console.log(context)
            const message = "hello"
       //     console.log(process.env.SECRET_KEY)
            return {message}
        }
    },

    Mutation: {
        async register(_, args) {
            const user = args
            const findUser = await userModel.findOne({ email: user.email })
            if (findUser) {
                throw new Error('user already exist')
            }
            else {
                const hashed = await bcrypt.hash(user.password, 10)
                user.password = hashed
                const createUser = await userModel.create(user)
                if (!createUser) {
                    throw new Error('error creating user')
                }
                return await userModel.findOne({ email: user.email })
            }
        }
    }
}