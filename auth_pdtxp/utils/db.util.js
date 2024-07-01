const config = require("config");
const mongoose = require("mongoose");

const option = {
    serverSelectionTimeoutMS: 5000, 
    socketTimeoutMS: 45000,
    family: 4
}

const connect = async () => {
    try{
        const dbURI = config.get("dbURI");
        if(mongoose.connection.readyState != 1){
            await mongoose.connect(dbURI, option);
            console.log("DB connected successfully");
        } else console.log("DB already connected");
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};

module.exports = connect;