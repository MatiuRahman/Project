import mongoose from "mongoose";
import colors from "colors";

const connectDatabase = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {});

    console.log(
      `MongoDatabase Connected: ${connect.connection.host}`.cyan.underline
    );
  } catch (err) {
    console.log("====================================");
    console.log(`Error: ${err.message}`.red.underline.bold);
    console.log("====================================");
    process.exit(1);
  }
};

export default connectDatabase;
