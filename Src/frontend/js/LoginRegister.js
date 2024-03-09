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

let registerPasswordConfirmInput = document.getElementById("register__input__password-confirm");
let registerLabelInputPasswordConfirm = document.getElementById("label__register__password-confirm");

let emailIcon = document.getElementById("mail-icon");

let lmailIcon = document.getElementById("lmail-icon");
let validLmail = document.getElementById("valid-lmail");
let invalidLmail = document.getElementById("invalid-lmail");
let lpwdIcon = document.getElementById("lpwd-icon");
let validLpwd = document.getElementById("valid-lpwd");
let invalidLpwd = document.getElementById("invalid-lpwd");

let rmailIcon = document.getElementById("rmail-icon");
let validRmail = document.getElementById("valid-rmail");
let invalidRmail = document.getElementById("invalid-rmail");
let rpwdIcon = document.getElementById("rpwd-icon");
let validRpwd = document.getElementById("valid-rpwd");
let invalidRpwd = document.getElementById("invalid-rpwd");
let rcpwdIcon = document.getElementById("rcpwd-icon");
let validRcpwd = document.getElementById("valid-rcpwd");
let invalidRcpwd = document.getElementById("invalid-rcpwd");

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

loginWrapper.addEventListener('click', (e)=> {
    e.stopPropagation();
    // disappearElement(mask, -99);
    if (e.target.id === "login") {
        disappearElement(registerWrapper,-100);
        disappearElement(loginWrapper, -101);
    }
})

registerWrapper.addEventListener('click', (e)=> {
    e.stopPropagation();
    // disappearElement(mask, -99);
    if (e.target.id === "register") {
        disappearElement(loginWrapper,-100);
        disappearElement(registerWrapper, -101);
    }
})

loginQuit.addEventListener('click', ()=> {
    // disappearElement(mask, -99);
    disappearElement(loginWrapper, -100);
})

registerQuit.addEventListener('click', ()=> {
    // disappearElement(mask, -99);
    disappearElement(registerWrapper,-100);
})

loginBtn.addEventListener('click', ()=> {
    // appearElement(mask, 99);
    disappearElement(registerWrapper, -100);
    appearElement(loginWrapper, 100);
})

registerBtn.addEventListener('click', ()=> {
    // appearElement(mask, 99);
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
    loginLabelInputMail.style.top = '3px';
    loginMailInput.placeholder = "Ex: xyz@mail.fr";
    loginMailInput.addEventListener("focusout", () => {
        if (loginMailInput.value) {
            loginLabelInputMail.style.top = '3px';
        }
        else{
            loginMailInput.placeholder = "";
            loginLabelInputMail.style.top = '70px';
        }
    })
})

loginPasswordInput.addEventListener("click", () => {
    loginLabelInputPassword.style.top = '3px';
    loginPasswordInput.placeholder = "Ex: Tototutu@27841";
    loginPasswordInput.addEventListener("focusout", () => {
        if (loginPasswordInput.value) {
            loginLabelInputPassword.style.top = '3px';
        }
        else{
            loginPasswordInput.placeholder = "";
            loginLabelInputPassword.style.top = '70px';
        }
    })
})

registerMailInput.addEventListener("click", () => {
    registerLabelInputMail.style.top = '3px';
    registerMailInput.placeholder = "Ex: xyz@mail.fr";
    registerMailInput.addEventListener("focusout", () => {
        if (registerMailInput.value) {
            registerLabelInputMail.style.top = '3px';
        }
        else{
            registerMailInput.placeholder = "";
            registerLabelInputMail.style.top = '70px';
        }
    })
})

registerPasswordInput.addEventListener("click", () => {
    registerLabelInputPassword.style.top = '3px';
    registerPasswordInput.placeholder = "Ex: Tototutu@27841";
    registerPasswordInput.addEventListener("focusout", () => {
        if (registerPasswordInput.value) {
            registerLabelInputPassword.style.top = '3px';
        }
        else{
            registerPasswordInput.placeholder = "";
            registerLabelInputPassword.style.top = '70px';
        }
    })
})

registerPasswordConfirmInput.addEventListener("click", () => {
    registerLabelInputPasswordConfirm.style.top = '3px';
    registerPasswordConfirmInput.placeholder = "Ex: Tototutu@27841";
    registerPasswordConfirmInput.addEventListener("focusout", () => {
        if (registerPasswordConfirmInput.value) {
            registerLabelInputPasswordConfirm.style.top = '3px';
        }
        else{
            registerPasswordConfirmInput.placeholder = "";
            registerLabelInputPasswordConfirm.style.top = '70px';
        }
    })
})

function isEmpty(input) {
    return input.value.trim() === '';
}

const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
const pwd = /^[a-zA-Z0-9\\?\\@\\#\\&\\!]{8,16}$/u;
let inputControlerMail = false;
let inputControlerPwd = false;

// Pour le control formulaire complet register
let inputControlerRMail = false;
let inputControlerRPwd = false;
let inputControlerRcPwd = false;

const checkLoginFormIsComplet = () => {
    if (inputControlerMail && inputControlerPwd) {
        document.getElementById("valid-login").removeAttribute("disabled");
    } else {
        document.getElementById("valid-login").setAttribute("disabled", true);
    }
}

const checkRegisterFormIsComplet = () => {
    if (inputControlerRMail && inputControlerRPwd 
         && (inputControlerRPwd === inputControlerRcPwd)) {
        document.getElementById("valid-register").removeAttribute("disabled");
    } else {
        document.getElementById("valid-register").setAttribute("disabled", true);
    }
}

const loginDiv = document.querySelector(".login__input");

loginMailInput.addEventListener("input", function(e) {
    lmailIcon.style.opacity = 0;
    if (emailRegex.test(e.target.value)) {
        loginMailInput.style.borderBottom = '2px solid green';
        validLmail.style.opacity = 1;
        invalidLmail.style.opacity = 0;
        inputControlerMail = true;
    } else {
        loginMailInput.style.borderBottom = '2px solid red';
        validLmail.style.opacity = 0;
        invalidLmail.style.opacity = 1;
        inputControlerMail = false;
    }
    checkLoginFormIsComplet();
})

loginPasswordInput.addEventListener("input", (e) => {
    e.stopPropagation();
    e.preventDefault();
    lpwdIcon.style.opacity = 0;
    inputControlerPwd = pwd.test(e.target.value);
    if (inputControlerPwd) {
        loginPasswordInput.style.borderBottom = '2px solid green';
        //emailIcon.style.color = 'green';
        invalidLpwd.style.opacity = 0;
        validLpwd.style.opacity = 1;
    } else {
        loginPasswordInput.style.borderBottom = '2px solid red';
        //emailIcon.style.color = 'red';
        validLpwd.style.opacity = 0;
        invalidLpwd.style.opacity = 1;
    }
    checkLoginFormIsComplet();
})


registerMailInput.addEventListener("input", function(e) {
    rmailIcon.style.opacity = 0;
    if (emailRegex.test(e.target.value)) {
        registerMailInput.style.borderBottom = '2px solid green';
        validRmail.style.opacity = 1;
        invalidRmail.style.opacity = 0;
        inputControlerRMail = true;
    } else {
        registerMailInput.style.borderBottom = '2px solid red';
        validRmail.style.opacity = 0;
        invalidRmail.style.opacity = 1;
        inputControlerRMail = false;
    }
    checkRegisterFormIsComplet();
})

registerPasswordInput.addEventListener("input", (e) => {
    e.stopPropagation();
    e.preventDefault();
    rpwdIcon.style.opacity = 0;
    inputControlerRPwd = pwd.test(e.target.value);
    if (inputControlerRPwd) {
        registerPasswordInput.style.borderBottom = '2px solid green';
        invalidRpwd.style.opacity = 0;
        validRpwd.style.opacity = 1;
    } else {
        registerPasswordInput.style.borderBottom = '2px solid red';
        validRpwd.style.opacity = 0;
        invalidRpwd.style.opacity = 1;
    }
    checkRegisterFormIsComplet();
})

registerPasswordConfirmInput.addEventListener("input", (e) => {
    e.stopPropagation();
    e.preventDefault();
    rcpwdIcon.style.opacity = 0;
    inputControlerRcPwd = pwd.test(e.target.value);
    if (inputControlerRcPwd) {
        registerPasswordConfirmInput.style.borderBottom = '2px solid green';
        invalidRcpwd.style.opacity = 0;
        validRcpwd.style.opacity = 1;
    } else {
        registerPasswordConfirmInput.style.borderBottom = '2px solid red';
        validRcpwd.style.opacity = 0;
        invalidRcpwd.style.opacity = 1;
    }
    checkRegisterFormIsComplet();
})