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
let words = document.querySelector("#words");
let characters = document.querySelector("#characters");
textInput.addEventListener("keyup",()=>{
    let text = textInput.value;
    if(text.length === 0){
        words.textContent="Words: 0"
    }
    else{
    let wordCount = 1;
    text.replace(/\s+/g,(a)=>{wordCount++;});
    words.textContent="Words: "+wordCount;
}
    characters.textContent = "Characters: " + text.replace(/\s+/g,"").length;
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