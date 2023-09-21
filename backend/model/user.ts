import mongoose, {Schema, Model, Document, mongo} from "mongoose";
import bcrypt from 'bcryptjs'
interface IUser extends Document{
    name: string,
    email: string,
    password: string,
    avator: {
        public_id: string,
        url: string
    },
    role: string,
    isVarified: boolean,
    courses: Array <{userId: string}>,
    comparePassword: (password: string )=> Promise<boolean>
}

const emailPattren : RegExp = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/ ;


const userSechama : Schema<IUser> = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "plase enter your name"]
    },
    email: {
        type: String,
        required: [true, 'please enter your email'],
        validate: {
            validator: function (value: string){
                return emailPattren.test(value)
            }
        }

    },
    avator: {
        public_id  : String,
        url: String
    },
    role: {
        type: String,
        default: 'user'
    },
    isVarified: {
        type: Boolean,
        default: false
    },
    courses: [
        {
            userId: String
        }
    ],
    password: {
        type: String,
        required: true,
        minlength: [6, "please enter your minx lenth is 6"],
        select: false
    }
},{timestamps: true})

/// hash you password

userSechama.pre<IUser>('save', async function(next){
    if(!this.isModified('password')){
        next()
    }
    this.password =await bcrypt.hash(this.password, 10)
    next()

})


/// compare the passowrd was hashed


userSechama.methods.comparePassword = async function(enterPassword: string){
return await bcrypt.compare(enterPassword, this.passowrd)
}

export default mongoose.model("User", userSechama)