const express = require("express");
const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
const http = require("http").createServer(app);
const io = require("socket.io")(http);


app.get("/",(req,res)=>{
    res.render("index");
})

io.on("connection",socket=>{
    console.log("done");
    socket.emit("joined","first");
})
http.listen(process.env.PORT||4000,()=>{console.log("Listening on port 4000")})