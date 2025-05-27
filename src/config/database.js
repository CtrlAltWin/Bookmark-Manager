const mongoose = require("mongoose");

const connectDatabase = async() => {
    return await mongoose.connect(process.env.DB_CONNECTION_SECRET)
}

module.exports= {
    connectDatabase,
}