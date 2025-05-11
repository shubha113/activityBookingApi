import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please provide a name"],
        trim: true
    },
    email:{
        type: String,
        required: [true, "Please provide an email"],
        trim: true,
        unique: true,
        lowerCase: true,
    },
    phone:{
        type: Number,
        required: [true, "Please provide a Phone Number"],
        unique: true,
    },
    password:{
        type: String,
        required: [true, "Please provide a password"],
        minLength: 6,
        select: false
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

//hash password before saving
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return(next)
    }
    try{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    }
    catch(error){
        next(error);
    }
});


//method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password);
}

const User = mongoose.model('User', userSchema);
export default User;