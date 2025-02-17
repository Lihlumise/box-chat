window.addEventListener("storage", function (event) {
    if (event.key === 'chats') {
        displayGroupChat();
    }
});

function getAllChats() {
    const chats = JSON.parse(localStorage.getItem('chats'));

    return chats === null ? [{
        sender: 'user1',
        message: 'Welcome to BoxChat!',
        time: Date.now()
    }] : chats;
}

function getGroupChat() {
    console.log(localStorage.getItem('chats'));
    const chats = JSON.parse(localStorage.getItem('chats'));
    console.log(chats);
    let groupChat = chats === null ?
        [{
            sender: 'user1',
            message: 'Welcome to BoxChat!',
            time: Date.now()
        }] : chats[0]['messages'];
    return groupChat;
}

function displayGroupChat() {
    const currentUser = JSON.parse(sessionStorage.getItem('sessionId'));
    const groupMessagesSection = document.getElementById('group-chat-messages');

    groupMessagesSection.innerHTML = '';

    let groupMessages = getGroupChat();
    groupMessages.forEach(message => {
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

        groupMessagesSection.appendChild(chatBubble);
    });
}

function sendMessage() {
    const inputMessage = document.getElementById('chat-input').value;
    const currentUser = JSON.parse(sessionStorage.getItem('sessionId'));
    let groupChat = getGroupChat();
    const newMessage = {
        sender: currentUser.username,
        message: inputMessage,
        time: Date.now()
    }

    groupChat.push(newMessage);

    const chats = getAllChats();
    chats[0]['messages'] = groupChat;

    localStorage.setItem('chats', JSON.stringify(chats));
}

function formatTime(value) {
    const date = new Date(value);
    let hours = date.getHours();
    let minutes = date.getMinutes();

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    return `${hours}:${minutes}`;
}