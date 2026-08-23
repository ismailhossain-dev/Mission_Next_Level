import dotenv from "dotenv";
import path from "path";

// env file root এ রাখবো
dotenv.config({
    path: path.join(process.cwd(), ".env"),
});

const config = {
    port: process.env.PORT,
    Connection_String: process.env.DATABASE_URL,
    secret_key : process.env.SECRET_KEY
};

export default config;