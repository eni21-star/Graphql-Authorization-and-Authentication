// import mongoose from "mongoose";
// import { contentModel, userModel } from "./db";
// mongoose.connect("mongodb://localhost:27017/eni")
// .then(()=>{

//     userModel.create({
//         name: "Eniola",
//         email: "eniolaolagbegi@gmail.com",
//         age: 32
//     })
//     .then( async ()=>{
//         const author = await userModel.findOne({name: "Eniola"})
//         contentModel.create({
//             author: author?._id,
//             content: "hellow there my name is eniola",
//             publication: new Date()
//         })
//         .then(async ()=>{
    
//             const eni = await contentModel.findOne({}).populate('author')
//             const ban = await contentModel.aggregate([
//                 {
//                    $lookup:{
//                       from: 'users',
//                       localField: "author",
//                       foreignField: '_id',
//                       as: "cONTENTS - AUTHOR"
//                    } 
//                 },
//                 // {
//                 //     $project:{npm
                        
//                 //     }
//                 // }
//             ])
//             console.log(ban)
//         })
//     })
    
    
// })
