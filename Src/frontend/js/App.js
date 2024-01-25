const createLevelElement = (level) => {
    let template = document.getElementById("level__model");
    let copy = document.importNode(template.content, true);
    copy.querySelector("[data-type='level__ref']").setAttribute('href', level.id);
    copy.querySelector("[data-type='level__family']").textContent=level.family;
    copy.querySelector("[data-type='level__theme']").textContent=level.theme;
    for (let i = 0; i < level.difficulty; i++) {
        let star = document.createElement("i");
        star.setAttribute("class", "fa-solid fa-star");
        copy.querySelector("[data-type='level__difficulty']").appendChild(star);
    }
    document.getElementById("main").appendChild(copy);
}

/*
fetch("./backend/getNiveaux.php?lim=9", {method : 'get'})
.then(res => res.json())
.then(data => {
    for (let i = 0; i < data.accessible.length; i++) {
       createLevelElement(data.accessible[i])
    }
    for (let i = 0; i < data.bloque.length; i++) {
        createLevelElement(data.bloque[i])
    }
})
.catch(err => console.log(err))
*/

let test = {
    id: 12,
    family: 12,
    theme: 'boucle',
    difficulty: 3
}
createLevelElement(test);