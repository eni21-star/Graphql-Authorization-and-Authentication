
import {ObjectId} from 'mongodb'
import { author_model, book_model, user_model } from "../../server";
import { author } from "../../models/author";
import { Icreate_book } from "./_types";
import book from "../../models/books";
import users from "../../models/user";




export const data_source = {

    async findByUserId(_id: ObjectId): Promise<users | null>{

        try {
            const user_exist = await user_model.findOneBy({_id: new ObjectId(_id)})
            return user_exist ? user_exist : null
        } catch (error) {
            throw error
        }
    },

    async findById(_id: ObjectId): Promise<author| null>
    {
   try {
    const find = await author_model.findOneBy({user_id: new ObjectId(_id)})
    return find ? find : null
   } catch (error) {
    console.log(error)
    throw error
   }
    },

    async findBook(book_id: string): Promise<book | null>{

        const find  = await book_model.findOneBy({_id: new ObjectId(book_id)})
        return find ? find : null
    },

    async createBook(data: any, author_id: ObjectId): Promise<book | null>
    {
      try {
        const { title, content, price} = data
        const create =  book_model.create({
            title,
            price,
            contents : content,
            author: author_id
        })
       await book_model.save(create)
       const author = await author_model.findOneBy({_id: new ObjectId(author_id)}) as author
       const push =  author.books.push(create._id.toString())
       await author_model.save(author)
       return create ? create : null
      } catch (error) {
        console.log(error)
        throw error
      }
    },

    async deleteBook(book_id: string, author_id: string): Promise<boolean>
    {
       try {
        const author = await author_model.findOneBy({_id: new ObjectId(author_id)})
        if(author?.books.includes(book_id)){
            const deleteBook = await book_model.findOneAndDelete({_id: new ObjectId(book_id)})
            return deleteBook ? true : false
        }
        return false
       } catch (error) {
        throw error
       }
    }
}