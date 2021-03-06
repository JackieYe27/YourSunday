import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser:true,
      useCreateIndex: true
    })
    console.log(`MongoDB Connected: ${connection.connection.host}`.magenta.bold);
  } catch (error) {
    console.log(`Errpr: ${error.message}`.red.bold)
    process.exit(1);
  }
}

export default connectDB;