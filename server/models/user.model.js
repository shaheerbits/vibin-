import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    followers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: [],
    },
    following: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: [],
    },
    bio: {
        type: String,
        default: "",
    },
    profilePic: {
        type: String,
        default: "",
    },
    posts: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Post",
        default: [],
    }
}, 
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;