import mongoose from "mongoose";

const userSchema =  mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minLength: 6,
        required: true,
    },
    profilePic: {
        type: String,
        default: "",
    },
    followers: {
        type: [String],
        default: [],
    },
    following: {
        type: [String],
        default: [],
    },
    bio: {
        type: String,
        default: "",
    },
    isFrozen: {
        type: Boolean,
        default: false
    },
    bannerPic: {
        type: String,
        default: "",
    },
    xp: {
        type: Number,
        default: 0,
    },
    rank: {
        type: Number,
    },
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

export default User;