import express, { Express} from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./config/database";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

connectToDatabase()

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
