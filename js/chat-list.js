function getChats() {
    const chats = localStorage.getItem('chats');
    return chats ? JSON.parse(chats) : [{
        id: 'group',
        messages: [{ sender: 'user1', message: 'Welcome to BoxChat!', time: Date.now()}],
    }];
}

function displayChatList() {
    let chats = getChats();
    const chatListSection = document.getElementById('chat-list');

    chats.forEach(chat => {

        const chatTile = document.createElement('div');
        chatTile.classList.add('chat-tile');

        const leading = document.createElement('div');
        leading.classList.add('leading');
        const leadingContent = document.createElement('h2');
        leadingContent.textContent = chat['id'][0];
        leading.appendChild(leadingContent);
        chatTile.appendChild(leading);

        const tileTitle = document.createElement('div');
        tileTitle.classList.add('tile-title');
        const tileTitleContent = document.createElement('h2');
        tileTitleContent.textContent = chat['id'];
        tileTitle.appendChild(tileTitleContent);
        chatTile.appendChild(tileTitle);

        const tileSubtitle = document.createElement('div');
        tileSubtitle.classList.add('tile-subtitle');
        const tileSubtitleContent = document.createElement('h4');
        tileSubtitleContent.textContent = chat['messages'][0]['message'];
        tileSubtitle.appendChild(tileSubtitleContent);
        chatTile.appendChild(tileSubtitle);

        const trialing = document.createElement('div');
        trialing.classList.add('trailing');
        const trailingContent = document.createElement('h5');
        trailingContent.textContent = chat['messages'][0]['time'];
        trialing.appendChild(trailingContent);
        chatTile.appendChild(trialing)

        chatListSection.appendChild(chatTile);
    });
}