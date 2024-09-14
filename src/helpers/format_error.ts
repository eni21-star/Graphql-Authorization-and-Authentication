import {  GraphQLFormattedError } from "graphql";
import { AppoloExtraCodes } from "./error_handler";

export const formatError = (formatError: GraphQLFormattedError): GraphQLFormattedError =>{
 
    const code = formatError.extensions?.code

    if(
       code === AppoloExtraCodes.BAD_REQUEST ||
       code === AppoloExtraCodes.CONFLICT ||
       code === AppoloExtraCodes.FORBIDDEN ||
       code === AppoloExtraCodes.NOT_FOUND ||
       code === AppoloExtraCodes.UNAUTHORIZED
    )
    {
        return formatError
    }

    console.log(formatError)
    return formatError 
    
}