const createLevelElement = (level) => {
    level.accessible.forEach(element => {
        let template = document.getElementById("item__model");
        let copy = document.importNode(template.content, true);
        copy.querySelector("[data-type='level__ref']").setAttribute('href', "./level_algo.html?id=" + element.id);
        copy.querySelector("[data-type='level__ref']").setAttribute('id', "level" + element.id);
        copy.querySelector("[data-type='level__family']").textContent=element.family;
        copy.querySelector("[data-type='level__theme']").textContent=element.theme;
        for (let i = 0; i < element.difficulty; i++) {
            let star = document.createElement("i");
            star.setAttribute("class", "fa-solid fa-star");
            copy.querySelector("[data-type='level__difficulty']").appendChild(star);
        }
        for (let i = 0; i < (5-element.difficulty); i++) {
            let emptyStar = document.createElement("i");
            emptyStar.setAttribute("class", "fa-regular fa-star"); 
            copy.querySelector("[data-type='level__difficulty']").appendChild(emptyStar);
            
        }
        document.getElementById("section").appendChild(copy);
    });
    level.bloque.forEach(element => {
        let template = document.getElementById("item__model");
        let copy = document.importNode(template.content, true);
        copy.querySelector("[data-type='level__ref']").setAttribute('class', "inaccessible");
        copy.querySelector("[data-type='level__ref']").setAttribute('href', "./");
        copy.querySelector("[data-type='level__ref']").setAttribute('id', "level" + element.id);
        copy.querySelector("[data-type='level__family']").textContent=element.family;
        copy.querySelector("[data-type='level__theme']").textContent=element.theme;

        let padlockImg = document.createElement("img");
        padlockImg.src = "./frontend/img/padlock.png";
        padlockImg.setAttribute('class', "lock__icon");
        copy.querySelector(".lock").appendChild(padlockImg);

        for (let i = 0; i < element.difficulty; i++) {
            let star = document.createElement("i");
            star.setAttribute("class", "fa-solid fa-star");
            copy.querySelector("[data-type='level__difficulty']").appendChild(star);
        }
        for (let i = 0; i < (5-element.difficulty); i++) {
            let emptyStar = document.createElement("i");
            emptyStar.setAttribute("class", "fa-regular fa-star"); 
            copy.querySelector("[data-type='level__difficulty']").appendChild(emptyStar);
            
        }
        document.getElementById("section").appendChild(copy);
    });
}

fetch("./backend/getNiveaux.php?lim=9", { method: 'get' })
    .then(res => res.json())
    .then(data => {
        createLevelElement(data);
    })
    .catch(err => console.log(err))


fetch("./backend/verifSession.php", { method: 'get' })
.then(res => res.json())
.then(data => {
    if (data.active == "true") {
        let header = document.body.querySelector(".header__nav");
        header.innerHTML = `<a href="#" class="header__btn" id="logout__btn">Se Déconnecter</a>`;

        let btn_logout = document.body.querySelector("#logout__btn");

        btn_logout.addEventListener('click', () => {
            fetch("./backend/logout.php")
            .then(location.reload())
        });
    }
})










