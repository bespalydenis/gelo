const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
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

    // AUTH: step1
    profilePhoto: {
        type: String,
        required: false
    },
    organizationTitle: {
        type: String,
        required: false
    },
    country: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    zip: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    phoneNumber1: {
        type: String,
        required: false
    },
    phoneNumber2: {
        type: String,
        required: false
    },
    website: {
        type: String,
        required: false
    },
    accountDesc: {
        type: String,
        required: false
    },


    // AUTH: step2
    language: {
        type: String,
        required: false
    },
    unitSystem: {
        type: String,
        required: false
    },
    currency: {
        type: String,
        required: false
    },


    // AUTH: step3
    personalPhoto: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        required: false
    },
    jobTitle: {
        type: String,
        required: false
    },
    bio: {
        type: String,
        required: false
    },
    birthMonth: {
        type: String,
        required: false
    },
    birthDay: {
        type: String,
        required: false
    },
    birthYear: {
        type: String,
        required: false
    },

    // AUTH: step4
    schedule: {
        type: Object,
        required: false
    },
    isAvailable: {
        type: Boolean,
        required: false
    },
    resetSecret: {
        type: String,
        required: false
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
        type: Number,
        default: 0,
        required: true
    },
    secret: {
      type: String,
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