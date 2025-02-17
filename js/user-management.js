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
    //preventDefault();
    const form = document.getElementById('create-account-form');

    if (form.checkValidity()) {
        const inputEmail = document.getElementById("email").value;
        const inputUsername = document.getElementById("username").value;
        const inputPassword = document.getElementById("password").value;
        const inputConfirmPassword = document.getElementById("confirm-password").value;

        if (passwordsMatch(inputPassword, inputConfirmPassword)) {
            let userAccounts = getUserAccounts();
            let accountExists = checkIfAccountExists(userAccounts, inputEmail);

            let newAccount = { 'email': inputEmail, 'username': inputUsername, 'password': inputPassword };

            if (accountExists) {
                alert('The email is already in use');
            } else {
                userAccounts.push(newAccount);
                localStorage.setItem('userAccounts', JSON.stringify(userAccounts));
                alert("Your account was successfully created! \nYou can now login");
                location.replace("../index.html");
            }
        } else {
            alert('The passwords you entered do not match');
        }
    } else {
        alert('Please fill in all the fields correctly');
    }
}

function passwordsMatch(password, confirmPassword) {
    if (password === confirmPassword) {
        return true;
    } else {
        return false
    }
}

function signIn() {
    const users = getUserAccounts();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    let userFound = false;

    for (let i = 0; i < users.length; i++) {

        if (username === users[i]['username'] && password === users[i]['password']) {
            sessionStorage.setItem('sessionId', JSON.stringify(users[i]));
            userFound = true;
            location.href = "./pages/group-chat.html";
        }
    }
    if(!userFound){ 
        alert("The username or password do not match");
    }
}