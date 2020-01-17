const mongoose = require("mongoose");
const uuidv1 = require("uuid/v1");
const crypto = require("crypto");
const { ObjectId } = mongoose.Schema;
const Post = require("./post");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    salt: String,
    created: {
        type: Date,
        dafault: Date.now
    },
    updated: Date,
    photo: {
        data: Buffer,
        contentType: String
    },
    about: {
        type: String,
        trim: true
    },
    following: [{ type: ObjectId, ref: "User" }],
    followers: [{ type: ObjectId, ref: "User" }],
    resetPasswordLink: {
        data: String,
        default: ""
    },
    role: {
        type: String,
        default: "subscriber"
    }

});

//Virtual Schema
userSchema.virtual("password")
    .set(function (password) {
        //Create temporary variable called _password
        this._password = password; //password from user input
        //Generate timestamp
        this.salt = uuidv1(); //Generate a random string
        //encryptPassword()
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function () {
        return this._password;
    });

userSchema.pre("deleteUser", function (next) {
    Post.remove({ postedBy: this._id }).exec();
    next();
});

//Methods
userSchema.methods = {

    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    encryptPassword: function (password) {
        if (!password) return "";

        try {
            return crypto.createHmac("sha1", this.salt)
                .update(password)
                .digest("hex");
        }
        catch (err) {
            return "";
        }
    }
};




module.exports = mongoose.model("User", userSchema);