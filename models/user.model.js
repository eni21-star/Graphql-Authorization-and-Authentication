import mongoose from 'mongoose'

const schema = new mongoose.Schema({

    email:{
        type: String,
        required: true,
        unique: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type:String,
        required: true
    }
})
const userModel = mongoose.model("users", schema)

export default userModel