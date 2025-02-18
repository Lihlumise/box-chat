window.addEventListener("storage", function (event) {
    if (event.key === 'privateChats') {
        displayChat();
    }
});

function displayChat() {
    const currentUser = JSON.parse(sessionStorage.getItem('sessionId'));
    const messagesSection = document.getElementById('private-chat-messages');

    messagesSection.innerHTML = '';

    let privateMessages = getChat();
    console.log(privateMessages);
    privateMessages.messages.forEach(message => {
        const chatBubble = document.createElement('div');
        message.sender === currentUser.username ?
            chatBubble.classList.add('chat-bubble-right') :
            chatBubble.classList.add('chat-bubble-left');

        const sender = document.createElement('div');
        sender.classList.add('sender');
        const senderContent = document.createElement('h5');
        senderContent.textContent = message.sender;
        sender.appendChild(senderContent);
        chatBubble.appendChild(sender);

        const messageBody = document.createElement('div');
        messageBody.classList.add('message');
        const messageBodyContent = document.createElement('h5');
        messageBodyContent.textContent = message.message;
        messageBody.appendChild(messageBodyContent);
        chatBubble.appendChild(messageBody);

        const time = document.createElement('div');
        time.classList.add('time');
        const timeContent = document.createElement('h5');
        timeContent.textContent = formatTime(message.time);
        time.appendChild(timeContent);
        chatBubble.appendChild(time);

        messagesSection.appendChild(chatBubble);
    });
}

function getChat() {
    const chats = JSON.parse(localStorage.getItem('privateChats'));
    const currentChat = JSON.parse(sessionStorage.getItem('currentPrivateChat'));

   let privateChats = chats === null ?
        [] : chats;

    let activeChat = [];
    for (let i = 0; i < privateChats.length; i++) {
        if (privateChats[i]['id'] === currentChat) {
            activeChat = privateChats[i];
        }
    }
    return activeChat;
}

function sendMessage() {
    const inputMessage = document.getElementById('chat-input').value;
    const currentUser = JSON.parse(sessionStorage.getItem('sessionId'));
    const currentPrivateChat = JSON.parse(sessionStorage.getItem('currentPrivateChat'));
    let chats = JSON.parse(localStorage.getItem('privateChats'));

    const newMessage = {
        sender: currentUser.username,
        message: inputMessage,
        time: Date.now()
    }
    for (let i = 0; i < chats.length; i++) {
        if (chats[i]['id'] === currentPrivateChat) {
            let activeChat = chats[i]['messages'];
            activeChat.push(newMessage);
            chats[i]['messages'] = activeChat;
            localStorage.setItem('privateChats', JSON.stringify(chats));
        }
    }

}

function formatTime(value) {
    const date = new Date(value);
    let hours = date.getHours();
    let minutes = date.getMinutes();

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    return `${hours}:${minutes}`;
}