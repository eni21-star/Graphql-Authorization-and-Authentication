import { InputType, Field, ObjectType } from "type-graphql"

import { IRole } from "../../models/user"

@InputType()
export class Iregister {
    @Field(()=> String)
    email!: string

    @Field(()=> String)
    username!: string

    @Field(()=> String)
    password!: string

    @Field(()=> IRole)
    role!: IRole
}


@InputType()
export class Login_input {
    @Field(()=> String)
    email!: string

    @Field(()=> String)
    password!: string
}
export interface Ireg {
   email: string
   username: string
   password: string
   role: IRole
}

@ObjectType()
export class login_response 
{
    @Field(()=> String)
    accesstoken!: string

    @Field(()=> String)
    refreshtoken!: string
}