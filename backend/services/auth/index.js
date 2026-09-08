import express from "express";
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import router from "./routes/auth.route.js";
import cors from "cors"

dotenv.config();

const port = process.env.PORT

const app = express()
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json())
app.use("/", router)

app.get("/", (req, res) => {
    res.json({message: "Auth service is running"})
})

app.listen(port, () => {
    console.log(`Auth services started at port: ${port}`);
    connectDB()
})