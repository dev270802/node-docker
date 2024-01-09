const mongoose=require("mongoose")
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require("./config/config");

const mongoUrl=`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectdb = async () => {
    let isConnected = false;
    while (!isConnected) {
        try {
            await mongoose.connect(
                mongoUrl
        );
        console.log("Successfully connected to DB");
        isConnected = true;
        } catch (error) {
            console.error(error);
            await new Promise(resolve => setTimeout(resolve, 5000));
    }
    }
};

module.exports=connectdb
