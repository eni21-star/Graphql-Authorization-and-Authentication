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

@InputType()
export class Idelete_book {
    @Field(()=> String)
    book_id!: string
}


@InputType()
export class Iview_book {
    @Field(()=> String)
    book_id!: string
}