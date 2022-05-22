import express from "express";
import connectDatabase from "./configure/database.js";
import morgan from "morgan";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import { notFounderr, errorHandler } from "./middlewares/errors.js";
import path from "path";

dotenv.config();
connectDatabase();

const app = express();

if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'));
}

app.use(express.json()); //use json data in the body

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
//Custom error handler for statuscode using custom middleware

app.use(notFounderr);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running at port ${PORT} on ${process.env.NODE_ENV} mode.`)
);
