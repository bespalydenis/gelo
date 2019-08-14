const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    access: {
        type: Number,
        default: 0,
        required: true
    },
    level: {
        type: Number,
        default: 0,
        required: true
    },
    status: {
        type: String,
        default: 'notactive',
        required: true
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    rights: {
        type: Number,
        default: 0,
        required: true
    },
    parent: {
        type: String,
        default: '0',
        required: true
    }
});

module.exports = User = mongoose.model("users", UserSchema);