let loginQuit = document.getElementById("login__close");
let registerQuit = document.getElementById("register__close");
let loginBtn = document.getElementById("login__btn");
let registerBtn = document.getElementById("register__btn");
let loginLink = document.getElementById("login__link");
let registerLink = document.getElementById("register__link");

let loginWrapper = document.getElementById("login");
let registerWrapper = document.getElementById("register");

let mask = document.getElementById("mask");

let loginLabelInputMail = document.getElementById("label__login__email");
let loginLabelInputPassword = document.getElementById("label__login__password");
let loginMailInput = document.getElementById("login__input__email");
let loginPasswordInput = document.getElementById("login__input__password");

let registerLabelInputMail = document.getElementById("label__register__email");
let registerLabelInputPassword = document.getElementById("label__register__password");
let registerMailInput = document.getElementById("register__input__email");
let registerPasswordInput = document.getElementById("register__input__password");

let emailIcon = document.getElementById("mail-icon");

function appearElement(elt, zIndex){
    document.body.style.overflowY = "hidden";
    elt.style.zIndex = zIndex;
    elt.style.opacity = 1;
}

function disappearElement(elt, zIndex){
    document.body.style.overflowY = "auto";
    elt.style.zIndex = zIndex;
    elt.style.opacity = 0;
}

mask.addEventListener('click', ()=> {
    disappearElement(mask, -99);
    disappearElement(registerWrapper,-100);
    disappearElement(loginWrapper, -101);
})

loginQuit.addEventListener('click', ()=> {
    disappearElement(mask, -99);
    disappearElement(loginWrapper, -100);
})

registerQuit.addEventListener('click', ()=> {
    disappearElement(mask, -99);
    disappearElement(registerWrapper,-100);
})

loginBtn.addEventListener('click', ()=> {
    console.log("btn login");
    appearElement(mask, 99);
    disappearElement(registerWrapper, -100);
    appearElement(loginWrapper, 100);
})

registerBtn.addEventListener('click', ()=> {
    appearElement(mask, 99);
    disappearElement(loginWrapper, -100);
    appearElement(registerWrapper, 100);
})

loginLink.addEventListener('click', ()=> {
    disappearElement(registerWrapper, -100);
    appearElement(loginWrapper, 100);
})

registerLink.addEventListener('click', ()=> {
    disappearElement(loginWrapper, -100);
    appearElement(registerWrapper, 100);
})

loginMailInput.addEventListener("click", () => {
    loginLabelInputMail.style.top = '-62px';
    loginMailInput.placeholder = "Ex: xyz@mail.fr";
    loginMailInput.addEventListener("focusout", () => {
        if (loginMailInput.value) {
            loginLabelInputMail.style.top = '-62px';
        }
        else{
            loginMailInput.placeholder = "";
            loginLabelInputMail.style.top = '-32px';
        }
    })
})

loginPasswordInput.addEventListener("click", () => {
    console.log("password input");
    loginLabelInputPassword.style.top = '-62px';
    loginPasswordInput.placeholder = "Ex: Tototutu@27841";
    loginPasswordInput.addEventListener("focusout", () => {
        if (loginPasswordInput.value) {
            loginLabelInputPassword.style.top = '-62px';
        }
        else{
            loginPasswordInput.placeholder = "";
            loginLabelInputPassword.style.top = '-32px';
        }
    })
})

registerMailInput.addEventListener("click", () => {
    registerLabelInputMail.style.top = '-62px';
    registerMailInput.placeholder = "Ex: xyz@mail.fr";
    registerMailInput.addEventListener("focusout", () => {
        if (registerMailInput.value) {
            registerLabelInputMail.style.top = '-62px';
        }
        else{
            registerMailInput.placeholder = "";
            registerLabelInputMail.style.top = '-32px';
        }
    })
})

registerPasswordInput.addEventListener("click", () => {
    registerLabelInputPassword.style.top = '-62px';
    registerPasswordInput.placeholder = "Ex: Tototutu@27841";
    registerPasswordInput.addEventListener("focusout", () => {
        if (registerPasswordInput.value) {
            registerLabelInputPassword.style.top = '-62px';
        }
        else{
            registerPasswordInput.placeholder = "";
            registerLabelInputPassword.style.top = '-32px';
        }
    })
})

function isEmpty(input) {
    return input.value.trim() === '';
}

const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
const pwd = /^[a-zA-Z]+$/;
let inputControlerMail;
let inputControlerPwd;

const checkFormIsComplete = () => {
    console.log(inputControlerMail,inputControlerPwd);
    if (inputControlerMail && inputControlerPwd) {
        document.getElementById("valid-login").removeAttribute("disabled");
    } else {
        document.getElementById("valid-login").setAttribute("disabled", true);
    }
}

const loginDiv = document.querySelector(".login__input");

loginMailInput.addEventListener("input", function(e) {
    if (emailRegex.test(e.target.value)) {
        loginMailInput.style.borderBottom = '2px solid green';
        emailIcon.style.color = 'green';
        inputControlerMail = true;
    } else {
        loginMailInput.style.borderBottom = '2px solid red';
        loginDiv.children[0].classList[1] = 'fa-circle-xmark';
        emailIcon.style.color = 'red';
        inputControlerMail = false;
    }
    checkFormIsComplete();
})

loginPasswordInput.addEventListener("input", (e) => {
    if (pwd.test(e.target.value)) {
        loginPasswordInput.style.borderBottom = '2px solid green';
        //emailIcon.style.color = 'green';
        inputControlerPwd = true;
    } else {
        loginPasswordInput.style.borderBottom = '2px solid red';
        //emailIcon.style.color = 'red';
        inputControlerPwd = false;
    }
    checkFormIsComplete();
})