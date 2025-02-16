function getGroupChat() {
    const chats = JSON.parse(localStorage.getItem('chats'));

    let groupChat = chats === null ?
        [{
            sender: 'user1',
            message: 'Welcome to BoxChat!',
            time: Date.now()
        }]
        : chats[0]['messages'];

    return groupChat;
}

function displayGroupChat() {
    const groupMessagesSection = document.getElementById("group-chat-messages");

    let groupMessages = getGroupChat();
    console.log(groupMessages);
    groupMessages.forEach(message => {

        const chatBubble = document.createElement('div');
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

function formatTime(value) {
    const date = new Date(value);
    let hours = date.getHours();
    let minutes = date.getMinutes();

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    return `${hours}:${minutes}`;
}