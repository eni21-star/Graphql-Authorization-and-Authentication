import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { author } from "../../models/author";
import { Icreate_book, Idelete_book, Iview_book } from "./_types";
import { ReqUser } from "../../server";
import { custom_errors } from "../../helpers/error_handler";
import { GraphQLBoolean, GraphQLError } from "graphql";
import { data_source } from "./data_source";
import book from "../../models/books";
import { ObjectId } from "mongodb";

@Resolver()
export class author_resolver {

    @Mutation(()=> book)
    async create_book(@Arg('args') args: Icreate_book, @Ctx('user') user: ReqUser){
       try {
        if(!user) throw new custom_errors().Unauthorized('Please Login to Proceed')

            console.log(user)
            const {title, content, price} = args
            if(!title || !content || !price) throw new custom_errors().Bad_Request('Please Provide all required fields')
            const {_id } = user
            const user_exist = await data_source.findById(_id)
            
            if(!user_exist) throw new custom_errors().Forbidden("You are not an author")
             
            const create_book = await data_source.createBook(args, user_exist._id)
            if(!create_book) throw new GraphQLError('error creating book')
             
            return create_book
       } catch (error) {
        throw error
       }
        
    }
    @Mutation(()=> book)
    async view_Book(@Arg('args') args: Iview_book){
        const {book_id} = args
        if(!book_id) throw new custom_errors().Bad_Request("Provide required Fields")
        
        const findBook = await data_source.findBook(book_id)
        if(!findBook) throw new custom_errors().Not_Found('Book not found')
        
        return findBook

    }

    @Mutation(()=> String)
    async delete_book(@Arg('args') args: Idelete_book, @Ctx('user') user: ReqUser)
    {
        try {
          
            if(!user) throw new custom_errors().Unauthorized('Please login to proceed')  
            const { _id } = user
            const { book_id}= args
            if(!book_id) throw new custom_errors().Bad_Request('Please provide required fields')
             
            const User_exist = await data_source.findByUserId(_id)
            if(!User_exist) throw new custom_errors().Unauthorized("Please create an account to proceed")
            if(User_exist.role !== 'AUTHOR') throw new custom_errors().Unauthorized('you are not an author')

                const author_exist = await data_source.findById(new ObjectId(_id))
                if(!author_exist) throw new custom_errors().Forbidden('You are not permitted')

                const delete_book = await data_source.deleteBook(book_id, author_exist._id.toString())
                if(delete_book) return 'book deleted'
                throw new GraphQLError('could not delete book at this time')
        } catch (error) {
            throw error
        }
    }
}