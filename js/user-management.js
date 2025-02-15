function getUserAccounts() {
    const userAccounts = localStorage.getItem('userAccounts');
    return userAccounts ? JSON.parse(userAccounts) : [];
}

function checkIfAccountExists(userAccounts, userInput) {
    for (let i = 0; i < userAccounts.length; i++) {
        if (userInput === userAccounts[i]['email']) {
            return true;
        }
    }
    return false;
}

function createAccount() {
    const inputEmail = document.getElementById("email").value;
    const inputUsername = document.getElementById("username").value;
    const inputPassword = document.getElementById("confirm-password").value;

    let userAccounts = getUserAccounts();
    let accountExists = checkIfAccountExists(userAccounts, inputEmail);

    let newAccount = { 'email': inputEmail, 'username': inputUsername, 'password': inputPassword };

    if (accountExists) {
        alert('The email is already in use');
    } else {
        userAccounts.push(newAccount);
        localStorage.setItem('userAccounts', JSON.stringify(userAccounts));
        alert("Your account was successfully created! \nYou can now login");
        location.href = "../index.html";
    }
}