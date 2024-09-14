
import {ObjectId} from 'mongodb'
import { author_model, book_model, user_model } from "../../server";
import { author } from "../../models/author";
import { Icreate_book } from "./_types";
import book from "../../models/books";
import users from "../../models/user";




export const data_source = {
    async findById(_id: ObjectId): Promise<author| null>
    {
    const find = await author_model.findOneBy({user_id: new ObjectId(_id)})
    return find ? find : null
    },

    async createBook(data: any, author_id: ObjectId): Promise<book | null>
    {
        const { title, content, price} = data
        const create =  book_model.create({
            title,
            price,
            contents : content,
            author: author_id
        })
       await book_model.save(create)
       const author = await author_model.findOneBy({_id: new ObjectId(author_id)}) as author
       console.log(author)
       author.books.push(new ObjectId(create._id))
       await author_model.save(author)
       return create ? create : null

    }
}