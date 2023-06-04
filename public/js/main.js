const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

// Get username and room from URL
const {username,room} = Qs.parse(location.search,{
    ignoreQueryPrefix: true
});
console.log(username,room)

const socket = io(); // we have access to io because of script tag that we added in chat.html

socket.emit('joinRoom',{username,room})

socket.on('message',message => {
    console.log(message);
    outputMessage(message);

    // Scroll Down
    chatMessages.scrollTop = chatMessages.scrollHeight;
})

// We are creating event listener for submission of form line 1
// Message submit
chatForm.addEventListener('submit',(e)=>{
    // we are passing event in the function here because when you submit somethig, it gets stored in a file and we need to prevent that
    e.preventDefault(); // This will prevent the default behavior of storing the form to a file 

    // Get message text from the form
    const msg = e.target.elements.msg.value;  
    
    // Emit message to server and server will actch the message and wthen will emit back to client
    socket.emit('chatMessage',msg)

    // Clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
    
})

function outputMessage(message){
    const div = document.createElement("div");
    div.classList.add('message');
    div .innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
      ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div)
}