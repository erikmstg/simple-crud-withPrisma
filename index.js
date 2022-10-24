import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ProductRoute from "./routes/ProductRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(express.json());

app.use("/product", ProductRoute);

app.listen(port, () => {
  console.log(`runnning at port ${port}`);
});
