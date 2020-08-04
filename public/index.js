const socket = io("http://localhost:4000/");
socket.emit("initialize",url);
let textInput = document.querySelector("#textInput");
textInput.addEventListener("keyup",()=>{
    let text = textInput.value;
    socket.emit("message",text);
})
socket.on("message-updated",data=>{
    let textInput = document.querySelector("#textInput");
    textInput.value = data;
})