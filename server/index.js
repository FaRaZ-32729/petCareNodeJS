const { configDotenv } = require("dotenv");
const express = require("express");
const db_Connection = require("./src/config/db_Connection.js");
const userRouter = require("./src/routes/userRoute.js");
const cookieParser = require("cookie-parser");
const route = require("./src/routes/authRoute.js");
const petsrouter = require("./src/routes/petsmanageRoute.js");
const healthrecordRouter = require("./src/routes/healthrecordRoute.js");
const productRouter = require("./src/routes/productRoute.js");


configDotenv();
db_Connection();
const app = express();
const PORT = process.env.PORT;

//middlewares 
app.use(express.json());
app.use(cookieParser())



// all routes

app.use("/user", userRouter);
app.use('/auth', route)
//pets routes
app.use('/pets', petsrouter);
app.use('/health', healthrecordRouter);
app.use("/product", productRouter)






app.listen(PORT, () => (
    console.log(`Server Is Running On Port No:${PORT}`)
));