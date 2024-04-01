import mongoose from 'mongoose'

const connectToMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO)
        console.log("Connected to MongoDb")
    } catch (error) {
        console.log("Error connecting to MongoDb", error.message)
    }
}

export default connectToMongo;