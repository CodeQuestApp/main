const createLevelElement = (level) => {
    let template = document.getElementById("level__model");
    let copy = document.importNode(template.content, true);
    copy.querySelector("[data-type='level__ref']").setAttribute('href', level.url);
    copy.querySelector("[data-type='level__family']").textContent=level.family;
    copy.querySelector("[data-type='level__theme']").textContent=level.theme;
    document.getElementById("main").appendChild(copy);
}

