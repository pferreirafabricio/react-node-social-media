const mongooose = require("mongoose");
const { ObjectId } = mongooose.Schema;

const postSchema = new mongooose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    postedBy: {
        type: ObjectId,
        ref: "User"
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,
    likes: [{ type: ObjectId, ref: "User" }],
    comments: [{
        text: String,
        created: { type: Date, default: Date.now },
        postedBy: { type: ObjectId, ref: "User" }
    }]
})

module.exports = mongooose.model("Post", postSchema);