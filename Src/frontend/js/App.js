const createLevelElement = (level) => {
    let template = document.getElementById("item__model");
    let copy = document.importNode(template.content, true);
    copy.querySelector("[data-type='level__ref']").setAttribute('href', "./level_algo.html" + level.id);
    copy.querySelector("[data-type='level__family']").textContent=level.family;
    copy.querySelector("[data-type='level__theme']").textContent=level.theme;
    for (let i = 0; i < level.difficulty; i++) {
        let star = document.createElement("i");
        star.setAttribute("class", "fa-solid fa-star");
        copy.querySelector("[data-type='level__difficulty']").appendChild(star);
    }
    for (let i = 0; i < (5-level.difficulty); i++) {
        let emptyStar = document.createElement("i");
        emptyStar.setAttribute("class", "fa-regular fa-star"); 
        copy.querySelector("[data-type='level__difficulty']").appendChild(emptyStar);
        
    }
    document.getElementById("section").appendChild(copy);
}


// fetch("./backend/getNiveaux.php?lim=9", {method : 'get'})
// .then(res => res.json())
// .then(data => {
//     for (let i = 0; i < data.accessible.length; i++) {
//        createLevelElement(data.accessible[i])
//     }
//     for (let i = 0; i < data.bloque.length; i++) {
//         createLevelElement(data.bloque[i])
//     }
// })
// .catch(err => console.log(err))


let data =  [
    {
        id: 1,
        family: "algo",
        theme: "boucle",
        difficulty: 3
    },
    {
        id: 1,
        family: "algo",
        theme: "boucle",
        difficulty: 3
    },
    {
        id: 1,
        family: "algo",
        theme: "boucle",
        difficulty: 3
    },
    {
        id: 1,
        family: "algo",
        theme: "boucle",
        difficulty: 3
    },
    {
        id: 1,
        family: "algo",
        theme: "boucle",
        difficulty: 3
    },
    {
        id: 1,
        family: "algo",
        theme: "boucle",
        difficulty: 3
    },
    {
        id: 1,
        family: "algo",
        theme: "boucle",
        difficulty: 3
    },
    {
        id: 1,
        family: "algo",
        theme: "boucle",
        difficulty: 3
    }
]

for (let i = 0; i < data.length; i++) {
    createLevelElement(data[i]);
}