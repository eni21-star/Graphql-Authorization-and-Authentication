import { GraphQLError, GraphQLErrorOptions } from "graphql";
import { ApolloServerErrorCode } from '@apollo/server/errors'

export enum AppoloExtraCodes 
{
    BAD_REQUEST = "BAD_REQUEST",
    FORBIDDEN = "FORBIDDEN",
    UNAUTHORIZED = "UNAUTHORIZED",
    CONFLICT = "CONFLICT",
    NOT_FOUND = "NOT FOUND"
}
class error_handler extends GraphQLError {

    constructor(message: string, code:ApolloServerErrorCode | AppoloExtraCodes, options: GraphQLErrorOptions)
    {
        super(message, 
            {
            ...options,
            extensions: {...options.extensions, code}
        })
    }
    
}

export class custom_errors {
    Bad_Request(message: string, options?: GraphQLErrorOptions)
    {
        const error = new GraphQLError(message, options)
    
       return new error_handler(error.message || 'BAD REQUEST', AppoloExtraCodes.BAD_REQUEST, {
         path: error.path,
         extensions: { ...error.extensions,http:{ status: 400}}
       })
    }

    Forbidden(message: string, options?: GraphQLErrorOptions)
    {
        const error = new GraphQLError(message, options)
    
       return new error_handler(error.message || 'FORBIDDEN', AppoloExtraCodes.FORBIDDEN, {
         path: error.path,
         extensions: { ...error.extensions,http:{ status: 403}}
       })
    }

    Not_Found(message: string, options?: GraphQLErrorOptions)
    {
        const error = new GraphQLError(message, options)
    
       return new error_handler(error.message || 'RESOURCE NOT FOUND', AppoloExtraCodes.NOT_FOUND, {
         path: error.path,
         extensions: { ...error.extensions,http:{ status: 404}}
       })
    }

    Unauthorized(message: string, options?: GraphQLErrorOptions)
    {
        const error = new GraphQLError(message, options)
    
       return new error_handler(error.message || 'UNAUTHORIZED', AppoloExtraCodes.UNAUTHORIZED, {
         path: error.path,
         extensions: { ...error.extensions, http:{ status: 401}}
       })
    }
    Conflict(message: string, options?: GraphQLErrorOptions)
    {
        const error = new GraphQLError(message, options)
    
       return new error_handler(error.message || 'CONFLICT ERROR', AppoloExtraCodes.CONFLICT, {
         path: error.path,
         extensions: { ...error.extensions,http:{ status: 409}}
       })
    }
}