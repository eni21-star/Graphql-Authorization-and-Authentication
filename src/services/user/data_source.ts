import { DeepPartial } from "typeorm"
import {author_model, user_model} from "../../server"
import User from  "../../models/user"
import { Iregister , Ireg} from "./_types"

export const data_source = {
   async findByEmail(email: string): Promise< User | null>
   {
   try {
      const find = await user_model.findOneBy({email})
      return find ? find : null
   } catch (error) {
      throw error
   }
   },

   async newAccount(data: Ireg): Promise< User | null >{
try {
   const create =   user_model.create(data)
   await user_model.save(create)
   if(create.role=== "AUTHOR"){const newAuthor =  author_model.create({user_id: create._id, name: create.username, books: []})
    author_model.save(newAuthor)}
   return create ? create : null
} catch (error) {
   console.log(error)
   throw error
}

   }
}