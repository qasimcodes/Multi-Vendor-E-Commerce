import mongoose from "mongoose";

const dbconnect = () => {
    mongoose.connect(process.env.MONGODB_CLOUD)
            .then( con => console.log(`DB is connected with ${con.connection.host}`))
            .catch( err => console.log(`DB is connected with ${err.message}`))
}   

export default dbconnect;