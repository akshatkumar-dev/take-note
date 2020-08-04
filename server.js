const express = require("express");
const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
const http = require("http").createServer(app);
const io = require("socket.io")(http);


app.get("/",(req,res)=>{
    res.redirect("/"+getUniqueId());
})
app.get("/:url",(req,res)=>{
    const url = req.params.url;    
    res.render("index",{url:url});
})
io.on("connection",socket=>{
    let url;
    socket.on("initialize",data=>{
        url = data;
        socket.join(data);
    })
    socket.on("message",data=>{
        socket.to(url).emit("message-updated",data);
    })
})
const getUniqueId = ()=>{
    const variables = ["a","b","c","d","e",
    "f","g","h","i","j",
    "k","l","m","n","o",
    "p","q","r","s","t",
    "u","v","w","x","y",
    "z","1","2","3","4",
    "5","6","7","8","9",
    "0","-","A","B","C",
    "D","E","F","G","H",
    "I","J","K","L","M",
    "N","O","P","Q","R",
    "S","T","U","V","W",
    "X","Y","Z"];
    let url = "";
    for(let i = 0;i<5;i++){
        let temp = Math.floor(Math.random()*63);
        url+=variables[temp];
    }
    return url;
}
http.listen(process.env.PORT||4000,()=>{console.log("Listening on port 4000")})