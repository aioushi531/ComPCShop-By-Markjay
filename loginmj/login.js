var loginForm = document.getElementById("login-form");
var emailInput = document.getElementById("email");
var passwordInput = document.getElementById("password");
var errorMessage = document.getElementById("error-message");

loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;

    errorMessage.textContent = "";

    if (validateCredentials(email, password)) {
        window.location.href = "main.html"; //dito ilagay ang landing page natin mga loko
    } else {
        errorMessage.textContent = "yah mali email at password mo yah";
    }
});

function validateCredentials(email, password) {
    let users = [
        { email: "newuser@pogi", password: "1234" },
        { email: "user1@pogi", password: "1234" },
        { email: "user2@pogi", password: "1234" },
        { email: "markjay@pogi", password: "050603"},
        { email: "joshua@pogi", password: "1234" },
        { email: "reyden@pogi", password: "1234" }
    ];

    for (const user of users) {
        if (user.email === email && user.password === password) {
            return true;
        }
    }
    return false;
}

document.getElementById('show-wrapper2').addEventListener('click', function () {
    const wrapper2 = document.getElementById('wrapper2');
    const loginForm = document.querySelector('.wrapper');
    wrapper2.style.display = 'block';
    loginForm.style.display = 'none';
});

document.getElementById('back-to-login').addEventListener('click', function () {
    const wrapper2 = document.getElementById('wrapper2');
    const loginForm = document.querySelector('.wrapper');
    wrapper2.style.display = 'none';
    loginForm.style.display = 'block';
});