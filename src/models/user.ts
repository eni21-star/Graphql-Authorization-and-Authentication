import { Column, CreateDateColumn, Entity,ObjectId, ObjectIdColumn, UpdateDateColumn,BeforeInsert, getMongoRepository, BaseEntity } from "typeorm";
import bcrypt from 'bcrypt'
import { Field, ObjectType } from "type-graphql";
import { registerEnumType } from "type-graphql";
import { db_config } from "../config/db_config";
export enum IRole {
    USER = "USER",
    AUTHOR = "AUTHOR"
}
registerEnumType(IRole, {
    name: "IRole", 
    description: "The roles of the user" 
});
@ObjectType()

@Entity('users')
class users{

    @Field(()=> String)
    @ObjectIdColumn()
    readonly _id!: ObjectId;

    @Field(()=> String)
    @Column({
      unique: true,
      
    })
    email!: string
    
    @Field(()=> String)
    @Column()
    username!: string

    @Field(()=> String)
    @Column()
    password!: string

    @Field(()=> IRole)
    @Column({
        type: "enum",
        enum: IRole
    })
    role!: IRole

    @Field(()=> String)
    @CreateDateColumn()
    createdAt!: Date

    @Field(()=> String)
    @UpdateDateColumn()
    updatedAt!: Date


    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 12);
    }

}
export default users