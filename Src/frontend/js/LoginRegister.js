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

const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
const pwd = /^[a-zA-Z0-9\\?\\@\\#\\&\\!]{8,16}$/u;

// Pour le control formulaire complet login
let inputControlerMail = false;
let inputControlerPwd = false;

// Pour le control formulaire complet register
let inputControlerRMail = false;
let inputControlerRPwd = false;
let inputControlerRcPwd = false;

const allPlaceholderTxt = {
    mail: "Ex: xyz@mail.fr",
    pwd: "Ex: Tototutu@27841"
};

function displayInputPlaceholder(htmlInputElm, placeholderTxt) {
    htmlInputElm.placeholder = placeholderTxt;
}

function resetPlaceholderValue(htmlInputElm) {
    htmlInputElm.placeholder = "";
}

function displayInputLabel(htmlLabelElm) {
    htmlLabelElm.style.top = '3px';
}

function hiddenInputLabel(htmlLabelElm) {
    htmlLabelElm.style.top = '35px';
}

function resetLoginControls() {
    inputControlerMail = false;
    inputControlerPwd = false;
}

function resetRegisterControls() {
    inputControlerRMail = false;
    inputControlerRPwd = false;
    inputControlerRcPwd = false;
}

function resetLoginFormStyle() {
    lmailIcon.style.opacity = 1;
    lpwdIcon.style.opacity = 1;

    validLmail.style.opacity = 0;
    invalidLmail.style.opacity = 0;
    validLpwd.style.opacity = 0;
    invalidLpwd.style.opacity = 0;

    hiddenInputLabel(loginLabelInputMail);
    hiddenInputLabel(loginLabelInputPassword);
    
    resetPlaceholderValue(loginMailInput);
    resetPlaceholderValue(loginPasswordInput);
}

function resetRegisterFormStyle() {
    rmailIcon.style.opacity = 1;
    rpwdIcon.style.opacity = 1;
    rcpwdIcon.style.opacity = 1;

    validRmail.style.opacity = 0;
    invalidRmail.style.opacity = 0;
    invalidRpwd.style.opacity = 0;
    validRpwd.style.opacity = 0;
    validRcpwd.style.opacity = 0;
    invalidRcpwd.style.opacity = 0;

    hiddenInputLabel(registerLabelInputMail)
    hiddenInputLabel(registerLabelInputPassword)
    hiddenInputLabel(registerLabelInputPasswordConfirm);

    resetPlaceholderValue(registerMailInput);
    resetPlaceholderValue(registerPasswordInput);
    resetPlaceholderValue(registerPasswordConfirmInput);
}


function checkLoginFormIsComplet() {
    if (inputControlerMail && inputControlerPwd) {
        document.getElementById("valid-login").removeAttribute("disabled");
    } else {
        document.getElementById("valid-login").setAttribute("disabled", true);
    }
}

function checkRegisterFormIsComplet() {
    if (inputControlerRMail && inputControlerRPwd 
         && inputControlerRcPwd) {
        document.getElementById("valid-register").removeAttribute("disabled");
    } else {
        document.getElementById("valid-register").setAttribute("disabled", true);
    }
}

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



function animInput(htmlInputElm, htmlLabelElm, bool) {
    if (bool) {
        displayInputLabel(htmlLabelElm);
    } else {
        resetPlaceholderValue(htmlInputElm);
        hiddenInputLabel(htmlLabelElm);
    }
}

function resetAllLoginInputs() {
    loginMailInput.value = "";
    loginPasswordInput.value = "";
}

function resetAllRegisterInputs() {
    registerMailInput.value = "";
    registerPasswordConfirmInput.value = "";
    registerPasswordInput.value = "";
}



loginWrapper.addEventListener('click', (e)=> {
    e.stopPropagation();
    if (e.target.id === "login") {
        disappearElement(registerWrapper,-100);
        disappearElement(loginWrapper, -101);
        resetAllLoginInputs();
        resetLoginFormStyle();
        resetLoginControls();
        checkLoginFormIsComplet();
    }
})

registerWrapper.addEventListener('click', (e)=> {
    e.stopPropagation();
    if (e.target.id === "register") {
        disappearElement(loginWrapper,-100);
        disappearElement(registerWrapper, -101);
        resetAllRegisterInputs();
        resetRegisterFormStyle();
        resetRegisterControls();
        checkRegisterFormIsComplet();
    }
})

loginQuit.addEventListener('click', ()=> {
    disappearElement(loginWrapper, -100);
    resetAllLoginInputs();
    resetLoginFormStyle();
    resetLoginControls();
    checkLoginFormIsComplet();
})

registerQuit.addEventListener('click', ()=> {
    disappearElement(registerWrapper,-100);
    resetAllRegisterInputs();
    resetRegisterFormStyle();
    resetRegisterControls();
    checkRegisterFormIsComplet();
})

loginBtn.addEventListener('click', ()=> {
    disappearElement(registerWrapper, -100);
    appearElement(loginWrapper, 100);
    resetAllRegisterInputs();
    resetRegisterFormStyle();
    resetRegisterControls();
    checkRegisterFormIsComplet();
})

registerBtn.addEventListener('click', ()=> {
    disappearElement(loginWrapper, -100);
    appearElement(registerWrapper, 100);
    resetAllLoginInputs();
    resetLoginFormStyle();
    resetLoginControls();
    checkLoginFormIsComplet()
})

loginLink.addEventListener('click', ()=> {
    disappearElement(registerWrapper, -100);
    appearElement(loginWrapper, 100);
    resetAllRegisterInputs();
    resetRegisterFormStyle();
    resetRegisterControls();
    checkRegisterFormIsComplet();
})

registerLink.addEventListener('click', ()=> {
    disappearElement(loginWrapper, -100);
    appearElement(registerWrapper, 100);
    resetAllLoginInputs();
    resetLoginFormStyle();
    resetLoginControls();
    checkLoginFormIsComplet();
})

/*
    Login form
*/ 

// Gestion animation mail login form
document.getElementById("lmail-wrapper").addEventListener("click", (e) => {
    displayInputLabel(loginLabelInputMail);
    displayInputPlaceholder(loginMailInput, allPlaceholderTxt["mail"]);
})
loginMailInput.addEventListener("focus", (e) => {
    displayInputLabel(loginLabelInputMail);
    displayInputPlaceholder(loginMailInput, allPlaceholderTxt["mail"]);
})
loginMailInput.addEventListener("focusout", () => {
    animInput(
        loginMailInput, 
        loginLabelInputMail, 
        loginMailInput.value
    );
})

// Gestion animation mot de passe login form
document.getElementById("lpwd-wrapper").addEventListener("click", (e) => {
    displayInputLabel(loginLabelInputPassword);
    displayInputPlaceholder(loginPasswordInput, allPlaceholderTxt["pwd"]);
})
loginPasswordInput.addEventListener("focus", (e) => {
    displayInputLabel(loginLabelInputPassword);
    displayInputPlaceholder(loginPasswordInput, allPlaceholderTxt["pwd"]);
})
loginPasswordInput.addEventListener("focusout", (e) => {
    animInput(
        loginPasswordInput, 
        loginLabelInputPassword, 
        loginPasswordInput.value
    );
})

/*
    Register form
*/ 

// Gestion animation mail register form
document.getElementById("rmail-wrapper").addEventListener("click", (e) => {
    displayInputLabel(registerLabelInputMail);
    displayInputPlaceholder(registerMailInput, allPlaceholderTxt["mail"]);
})
registerMailInput.addEventListener("focus", (e) => {
    displayInputLabel(registerLabelInputMail);
    displayInputPlaceholder(registerMailInput, allPlaceholderTxt["mail"]);
})
registerMailInput.addEventListener("focusout", () => {
    animInput(
        registerMailInput, 
        registerLabelInputMail, 
        registerMailInput.value != ""
    );
})

// Gestion animation mot de passe register form
document.getElementById("rpwd-wrapper").addEventListener("click", (e) => {
    displayInputLabel(registerLabelInputPassword);
    displayInputPlaceholder(registerPasswordInput, allPlaceholderTxt["pwd"]);
})
registerPasswordInput.addEventListener("focus", (e) => {
    displayInputLabel(registerLabelInputPassword);
    displayInputPlaceholder(registerPasswordInput, allPlaceholderTxt["pwd"]);
})
registerPasswordInput.addEventListener("focusout", () => {
    animInput(
        registerPasswordInput, 
        registerLabelInputPassword, 
        registerPasswordInput.value != ""
    );
})

// Gestion animation confirmation mot de passe register form
document.getElementById("rcpwd-wrapper").addEventListener("click", (e) => {
    displayInputLabel(registerLabelInputPasswordConfirm);
    displayInputPlaceholder(registerPasswordConfirmInput, allPlaceholderTxt["pwd"]);
})
registerPasswordConfirmInput.addEventListener("focus", (e) => {
    displayInputLabel(registerLabelInputPasswordConfirm);
    displayInputPlaceholder(registerPasswordConfirmInput, allPlaceholderTxt["pwd"]);
})
registerPasswordConfirmInput.addEventListener("focusout", () => {
    animInput(
        registerPasswordConfirmInput, 
        registerLabelInputPasswordConfirm, 
        registerPasswordConfirmInput.value != ""
    );
})



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
        invalidLpwd.style.opacity = 0;
        validLpwd.style.opacity = 1;
    } else {
        loginPasswordInput.style.borderBottom = '2px solid red';
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
    inputControlerRcPwd = registerPasswordInput.value === e.target.value;
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