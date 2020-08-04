const socket = io("http://localhost:4000/");
socket.on("joined",data=>{
    console.log(data);
})