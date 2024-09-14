import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity,ObjectId, ObjectIdColumn, UpdateDateColumn  } from "typeorm";

@ObjectType()
@Entity('author')
export class author {
    @Field(()=> ObjectId)
    @ObjectIdColumn()
    _id!: ObjectId;

    @Field(()=> ObjectId)
    @ObjectIdColumn()
    user_id!: ObjectId

    @Field(()=> [String])
    @ObjectIdColumn({type: 'array', default: []})
    books!: ObjectId[]

    @Field(()=> String)
    @Column({
        unique: true
    })
    name!: string;

}

