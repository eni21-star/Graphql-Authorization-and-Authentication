import { Field, InputType } from "type-graphql";


@InputType()
export class Icreate_book {
    @Field(()=> String)
    title!: string

    @Field(()=> String)
    content!: string

    @Field(()=> Number)
    price!: number
}