import dotenv from "dotenv";
dotenv.config();
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;
export { MONGO_URI, JWT_SECRET };
