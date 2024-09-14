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

    @Field(() => [String])
    @Column({default: []})
    books!: string[]
    

    @Field(()=> String)
    @Column({
        unique: true
    })
    name!: string;
    

}

