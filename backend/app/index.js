import 'dotenv/config'
import routes from "./routes/index.mjs"
import cors from "cors";
import express from "express";

const app = express();
const { PORT } = process.env;
app.listen(PORT);
app.use(
  cors({
    origin: "http://localhost:3000", // Allow the frontend URL
    credentials: true,
  }),
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(routes);
console.log("Listening on port", PORT);

