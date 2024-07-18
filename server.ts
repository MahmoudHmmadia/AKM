import { config } from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { dirname } from "path";
import { fileURLToPath } from "url";
import mainConfig from "./config/mainConfig";
import router from "./routes/Router";

//MAIN CONFIG

config();

const server = express();

const __filename = fileURLToPath(import.meta.url);

export const DIRNAME = dirname(__filename);

mainConfig(server);

router(server);

mongoose.connect(process.env.DB_URL!, { dbName: "AKM" }).then(() => {
  server.listen(process.env.PORT, async () => {
    console.log("Server Up And Running On Port: " + process.env.PORT);
  });
});
