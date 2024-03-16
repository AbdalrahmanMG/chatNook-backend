const mongoose = require('mongoose')
const yup = require('yup')

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required: true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    profilePic:{
        type: String,
        default: ''
    },
},{timestamps: true})

userSchema.virtual('id').get(function (){
    return this._id.toHexString()
})
userSchema.set('toJSON',{
    virtuals:true
})

// yup validation 
const userValidationSchema = yup.object().shape({
    fullName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    phone: yup.number().required(),
    profilePic: yup.string().default('')
})

const validateUser = async (userData) =>{
    try {
        await userValidationSchema.validate(userData, {abortEarly:false})
        return {isValid: true}
    } catch (error) {
        return {isValid: false, error: error.errors}
    }
}

const User = mongoose.model('User', userSchema)
module.exports = { User, validateUser}

