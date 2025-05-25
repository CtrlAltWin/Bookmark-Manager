const mongoose = require("mongoose");

const connectDatabase = async() => {
    return await mongoose.connect("mongodb+srv://raunakkumar1611:oo25uwjbz63k0lWV@learningmongodb.gidlz.mongodb.net/BookmarkManager")
}

module.exports= {
    connectDatabase,
}