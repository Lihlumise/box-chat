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
