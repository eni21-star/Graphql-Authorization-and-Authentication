// import { model, Model, ObjectId, Schema } from "mongoose";

// interface Ischema extends Document {
//     name: string
//     email: string
//     age: number
// }
// const schema  = new Schema<Ischema>({

//     name:{
//         type: String
//     },

//     email:{
//         type: String
//     },
//     age: {
//         type: Number
//     }
// })

// export const userModel = model<Ischema>("users", schema)
// interface IContent extends Document {
//     author: ObjectId
//     content: string
//     publication: Date
// }
// const contentSchema = new Schema<IContent>({

//     author:{
//         type: Schema.Types.ObjectId,
//         ref: 'users'
//     },

//     content: {
//         type: String
//     },
    
//     publication:{
//         type: Date
//     }
// })

// export const contentModel =  model<IContent>("content", contentSchema)