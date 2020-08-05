const socket = io("http://localhost:4000/");
socket.emit("initialize",url);

socket.on("message-initialize",data=>{
    let textInput = document.querySelector("#textInput");
    if(textInput.value.length!==0){
        console.log(textInput.value)
        socket.emit("message-initialized",textInput.value);
    }
})
let textInput = document.querySelector("#textInput");
textInput.addEventListener("keyup",()=>{
    let text = textInput.value;
    socket.emit("message",text);
})
socket.on("message-updated",data=>{
    let textInput = document.querySelector("#textInput");
    textInput.value = data;
})
socket.on("update",data=>{
    console.log("received")
    let textInput = document.querySelector("#textInput");
    textInput.value = data;
})