function getUserAccounts() {
    const userAccounts = localStorage.getItem('userAccounts');
    return userAccounts ? JSON.parse(userAccounts) : [];
}

function showContactList() {
    const contactListContainer = document.getElementById('contact-list-container');

    let contacts = getUserAccounts();

    contacts.forEach(contact => {
        const contactTile = document.createElement('div');
        contactTile.classList.add('contact-tile');
        contactTile.addEventListener("click", function (event) {
            startPrivateChat(contact.username);
        });

        const leading = document.createElement('div');
        leading.classList.add('leading');
        const leadingContent = document.createElement('h2');
        leadingContent.textContent = contact['username'][0];
        leading.appendChild(leadingContent);
        contactTile.appendChild(leading);
        contactListContainer.appendChild(contactTile);

        const contactUsername = document.createElement('div');
        contactUsername.classList.add('contact-username');
        const contactUsernameContent = document.createElement('h2');
        contactUsernameContent.textContent = contact['username'];
        contactUsername.appendChild(contactUsernameContent);
        contactTile.appendChild(contactUsername);

        const contactEmail = document.createElement('div');
        contactEmail.classList.add('contact-email');
        const contactEmailContent = document.createElement('h4');
        contactEmailContent.textContent = contact['email'];
        contactEmail.appendChild(contactEmailContent);
        contactTile.appendChild(contactEmail);
    });

}

function startPrivateChat(contactUsername) {
    console.log(`contact username: ${contactUsername}`);
    const currentUser = JSON.parse(sessionStorage.getItem('sessionId'));

    const userAccounts = getUserAccounts();
    let currentUserChats = [];
    for (let i = 0; i < userAccounts.length; i++) {
        if (userAccounts[i]['username'] === currentUser.username) {
            currentUserChats = userAccounts[i]['privateChats'];
            break;
        }
    }
    
    let isNewChat = true;
    console.log(currentUserChats);
    alert('stop now');
    
    for (let i = 0; i < currentUserChats.length; i++) {
        if (currentUserChats[i]['other'] === contactUsername) {
            sessionStorage.setItem('currentPrivateChat', currentUserChats[i]['id']);
            isNewChat = false;
            break;
        }
    }

    if (isNewChat) {
        let newChatId = Date.now();
        for (let i = 0; i < userAccounts.length; i++) {
            if (userAccounts[i]['username'] === currentUser.username) {
                currentUserChats.push({
                    id: newChatId,
                    other: contactUsername
                });
                userAccounts[i] = {
                    email: userAccounts[i]['email'],
                    username: userAccounts[i]['username'],
                    password: userAccounts[i]['password'],
                    privateChats: currentUserChats
                }
                localStorage.setItem('userAccounts', JSON.stringify(userAccounts));
            } else if (userAccounts[i]['username'] === contactUsername) {
                let otherUserChats = userAccounts[i]['privateChats'];
                otherUserChats.push({
                    id: newChatId,
                    other: currentUser.username,
                });

                userAccounts[i] = {
                    email: userAccounts[i]['email'],
                    username: userAccounts[i]['username'],
                    password: userAccounts[i]['password'],
                    privateChats: otherUserChats,
                }

                let allPrivateChats = getGetAllPrivateChats();
                allPrivateChats.push({
                    id: newChatId, 
                    messages: []});

                sessionStorage.setItem('currentPrivateChat', JSON.stringify(newChatId));
                localStorage.setItem('privateChats', JSON.stringify(allPrivateChats))
                localStorage.setItem('userAccounts', JSON.stringify(userAccounts));
            }
        }
    }
    location.href = '../pages/private-chat.html';
}

function getGetAllPrivateChats(){
    const privateChats = localStorage.getItem('privateChats');
    return privateChats ? JSON.parse(privateChats) : [];
}