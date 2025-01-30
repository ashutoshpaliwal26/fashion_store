import mongoose from "mongoose"

interface IUser {
    name : string,
    email : string,
    password : string,
    phoneNo : number,
    address : string
}

const UserSchema = new mongoose.Schema<IUser>({
    name : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        trim : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    },
    phoneNo : {
        type : Number,
        trim : true
    },
    address : {
        type : String,
        trim : true
    },
    
});

const User = mongoose.model<IUser>("User", UserSchema);
export default User;