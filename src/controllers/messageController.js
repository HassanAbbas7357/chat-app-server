const Message = require("../models/message");

const messageController = {
    saveMessage(data) {
        let message = new Message({
            sender: data.sender,
            receiver: data.receiver,
            message: data.message
        });
        message.save((err) => {
            if (err) {
                console.log(err);
            }
        });
    }
};

module.exports = messageController;
