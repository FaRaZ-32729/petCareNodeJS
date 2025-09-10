const { configDotenv } = require("dotenv");
const express = require("express");
const db_Connection = require("./src/config/db_Connection.js");
const userRouter = require("./src/routes/userRoute.js");


configDotenv();
db_Connection();
const app = express();
const PORT = process.env.PORT;

//middlewares 
app.use(express.json());




//routes
app.use("/user", userRouter);


app.listen(PORT, () => (
    console.log(`Server Is Running On Port No:${PORT}`)
));