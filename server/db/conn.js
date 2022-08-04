const mongoose = require('mongoose')

// const mongoUsername=process.env.MONGO_USERNAME
// const mongoPassword=process.env.MONGO_PASS
// const mongoCluster = process.env.MONGO_CLUSTER
// const mongoDB = process.env.MONGO_DB


//const MONGO_URI = `mongodb+srv://${mongoUsername}:${mongoPassword}@${mongoCluster}/${mongoDB}?retryWrites=true&w=majority`
const MONGO_URI="mongodb://localhost:27017/pizzaApp"
console.log(MONGO_URI)


mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


const conn = mongoose.connection;

conn.on("error", console.error.bind(console, "connection error: "));
conn.once("open", function () {
  console.log("Connected successfully");
});

conn.on('disconnected',function(){
    console.log('database is disconnected successfully');
})

module.exports = conn;