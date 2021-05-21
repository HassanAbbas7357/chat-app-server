// Configuring the database
const mongoose = require("mongoose");

mongoose.connect(
    "mongodb://robo:Hff32862@cluster0-shard-00-00.e2huy.mongodb.net:27017,cluster0-shard-00-01.e2huy.mongodb.net:27017,cluster0-shard-00-02.e2huy.mongodb.net:27017/chatapp?ssl=true&replicaSet=atlas-barv1c-shard-0&authSource=admin&retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);
mongoose.connection.on("error", (err) => {
    console.log("err", err);
});
mongoose.connection.on("connected", (err, res) => {
    console.log("mongoose is connected");
});
