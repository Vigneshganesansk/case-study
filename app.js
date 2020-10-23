require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./api/users/user.router");
const fileRouter = require("./api/file/file.router");

app.use(express.json());

app.use("/api/users",userRouter);
app.use("/api/file",fileRouter);
// app.listen(process.env.APP_PORT,()=>{
//     console.log("Success, running on port ", process.env.APP_PORT);
// })

module.exports = app;