/* import dotenv from "dotenv"

const environment = "PRODUCTION"
dotenv.config({
    path: environment === "PRODUCTION" ? "../" : ""
})



export default{
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    CODE_SECRET: process.env.CODE_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET
} */
import dotenv from "dotenv";

const environment = process.env.NODE_ENV || "dev";
dotenv.config({
    path: environment === "production" ? "./.env.prod" : "./.env.dev"
});

export default {
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    CODE_SECRET: process.env.CODE_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET
};