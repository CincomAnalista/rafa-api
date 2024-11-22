import 'dotenv/config';

export const config = {
    PORT: process.env.PORT || 4000,
}

export const mongoConfig = {
    MONGO_URI: process.env.MONGO_URI,
    MONGO_DB_NAME: process.env.MONGO_DB_NAME,
}