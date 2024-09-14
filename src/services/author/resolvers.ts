import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { author } from "../../models/author";
import { Icreate_book } from "./_types";
import { ReqUser } from "../../server";
import { custom_errors } from "../../helpers/error_handler";
import { GraphQLBoolean, GraphQLError } from "graphql";
import { data_source } from "./data_source";
import book from "../../models/books";

@Resolver()
export class author_resolver {

    @Mutation(()=> book)
    async create_book(@Arg('args') args: Icreate_book, @Ctx('user') user: ReqUser){
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
        
    }
}