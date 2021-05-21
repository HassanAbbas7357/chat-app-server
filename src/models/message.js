const mongoose = require("mongoose");

const message = new mongoose.Schema(
    {
        sender: {
            type: String,
            required: true
        },
        receiver: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = Message = mongoose.model("Message", message);
