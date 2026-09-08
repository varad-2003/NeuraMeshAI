import "dotenv/config"
import express from "express";
import connectDB from "./config/db.js";
import router from "./routes/agent.route.js";
import morgan from "morgan";



const port = process.env.PORT

const app = express()


app.use(morgan("dev"))
app.use(express.json())
app.use("/",router)

app.use((err, req, res, next) => {
    console.log(err);
    if(err.status){
        return res.status(err.status).json(err.data)
    }
    return res.status(err.status).json({message: `agent error ${err}`})
})


app.get("/", (req, res) => {
    res.json({message: "Agent service is running"})
})

app.listen(port, () => {
    console.log(`Agent services started at port: ${port}`);
    connectDB()
})