import { DeepPartial } from "typeorm"
import {author_model, user_model} from "../../server"
import User from  "../../models/user"
import { Iregister , Ireg} from "./_types"

export const data_source = {
   async findByEmail(email: string): Promise< User | null>
   {
    const find = await user_model.findOneBy({email})
    return find ? find : null
   },

   async newAccount(data: Ireg): Promise< User | null >{

   
    const create =   user_model.create(data)
    await user_model.save(create)
    if(create.role=== "AUTHOR"){const newAuthor =  author_model.create({user_id: create._id, name: create.username})
     author_model.save(newAuthor)}
    return create ? create : null

   }
}