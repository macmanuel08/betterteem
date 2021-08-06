function signup(e) {

    let username = document.querySelector('#username').value;
    let email = document.querySelector('#email').value;
    let pw = document.querySelector('#password').value;

    let user = {
        username: username,
        email: email,
        password: pw,
    };

    let json = JSON.stringify(user);
    localStorage.setItem(username, json);
    document.querySelector('#signupstate').textContent = "Already Signed Up";
    document.querySelector('#username').value = "";
    document.querySelector('#email').value = "";
    document.querySelector('#password').value = "";

    return true;
}

function signin(e) {

    let un = document.querySelector('#un').value;
    let pw = document.querySelector('#pw').value;
    let state = document.querySelector('#state');

    let user = localStorage.getItem(un);
    let info = JSON.parse(user);

    if (user == null) {
        state.innerHTML = "Invalid Username";
        state.classList.add('invalid');
        return false;
    } else if (un == info.username && pw == info.password) {
        state.innerHTML = "Logged In";
        state.classList.add('correct');
        return true;
    } else {
        state.innerHTML = "Invalid Password";
        state.classList.add('invalid');
        return false;
    }
}