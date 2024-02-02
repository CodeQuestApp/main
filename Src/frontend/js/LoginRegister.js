let loginQuit = document.getElementById("login__close");
let registerQuit = document.getElementById("register__close");
let loginBtn = document.getElementById("login__btn");
let registerBtn = document.getElementById("register__btn");
let loginLink = document.getElementById("login__link");
let registerLink = document.getElementById("register__link");
let loginWrapper = document.getElementById("login");
let registerWrapper = document.getElementById("register");
let mask = document.getElementById("mask");
let registerInput = document.querySelectorAll(".register__input");
let labelInputMail = document.querySelectorAll(".label-mail");
let labelInputPassword = document.querySelectorAll(".label-password");
let loginMailInput = document.getElementById("login__input__email");
let loginPasswordInput = document.getElementById("login__input__password");
let registerMailInput = document.getElementById("register__input__email");
let registerPasswordInput = document.getElementById("register__input__password");
let emailIcon = document.getElementById("mail-icon")

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
    labelInputMail[0].style.top = '-62px';
    loginMailInput.addEventListener("input", () => {
        if (!isEmpty(loginMailInput)) {
            labelInputMail[0].style.top = '-62px';
        }
        else{
            labelInputMail[0].style.top = '-32px'
        }
    })
})


function isEmpty(input) {
    return input.value.trim() === '';
}

const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
let inputControlerMail;

const checkMailIsValid = () => {
    loginMailInput.addEventListener("input", function(e) {
        if (emailRegex.test(e.target.value)) {
            loginMailInput.style.borderBottom = '2px solid green';
            emailIcon.style.color = 'green';
            inputControlerMail = true;
        } else {
            loginMailInput.style.borderBottom = '2px solid red';
            emailIcon.style.color = 'red';
            inputControlerMail = false;
        }
    })
}

checkMailIsValid();