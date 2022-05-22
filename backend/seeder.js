import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import connectDatabase from "./configure/database.js";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Order from "./models/orderModel.js";
import Product from "./models/productModel.js";

dotenv.config();

connectDatabase();

const importData = async () => {
  try {
    await User.deleteMany();
    await Order.deleteMany();
    await Product.deleteMany();

    const aUsers = await User.insertMany(users);

    const anAdmin = aUsers[0]._id;

    console.log(anAdmin);

    const productSamples = products.map((product) => {
      return { ...product, user: anAdmin };
    });

    await Product.insertMany(productSamples);

    console.log("Data imported: ".green.inverse);
    process.exit();
  } catch (err) {
    console.log(`Error: ${err}`.red.inverse);
  }
};
const destroyData = async () => {
  try {
    await User.deleteMany();
    await Order.deleteMany();
    await Product.deleteMany();

    console.log("Data destroyed: ".red.inverse);
    process.exit();
  } catch (err) {
    console.log(`Error: ${err}`.red.inverse);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
