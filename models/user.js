 const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String, default: "/assets/Profile_avatar_placeholder_large.png" } // Default profile picture
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
