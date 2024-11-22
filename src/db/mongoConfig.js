import mongoose from "mongoose";
import { mongoConfig } from "../config/index.js";

const { MONGO_URI, MONGO_DB_NAME } = mongoConfig;

export const connect = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            dbName: MONGO_DB_NAME
        })
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

