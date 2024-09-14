import { BaseEntity, Column, CreateDateColumn, Entity, ObjectId, ObjectIdColumn, UpdateDateColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";




@ObjectType()
@Entity('books')
class book {

    @Field(()=> String)
    @ObjectIdColumn()
    readonly _id!: ObjectId;

    @Field(()=> String)
    @ObjectIdColumn()
    author!: ObjectId

    @Field(()=> String)
    @Column()
    title!: string

    @Field(()=> String)
    @Column()
    contents!: string

    @Field(()=> Number)
    @Column()
    price!: number

    @Field(()=> String)
    @CreateDateColumn()
    createdAt!: Date

    @Field(()=> String)
    @UpdateDateColumn()
    updatedAt!: Date


}
export default book