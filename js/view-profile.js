function showProfileInfo() {
    const currentUser = JSON.parse(sessionStorage.getItem('sessionId'));

    let usernameText = document.getElementById('username-text');
    usernameText.textContent = currentUser.username;

    let emailText = document.getElementById('email-text');
    emailText.textContent = currentUser.email;

}

function logout(){
    sessionStorage.setItem('sessionId', '');
    sessionStorage.setItem('currentPrivateChat', '');
    location.replace('../index.html');
}