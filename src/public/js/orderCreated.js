const homeButton = document.querySelector("#homeButton");
const skipoles = document.querySelector("#skipoles");
const snowboardsButton = document.querySelector("#snowboardsButton");
const skiesButton = document.querySelector("#skiesButton");

homeButton.addEventListener("click", () => {
    window.location.href = "/";
})

skipoles.addEventListener("click", () => {
    window.location.href = "/skipoles";
})

snowboardsButton.addEventListener("click", () => {
    window.location.href = "/snowboards";
})

skiesButton.addEventListener("click", () => {
    window.location.href = "/skis";
})

// MENU MOVILE

const menuMovile = document.querySelector(".menuMovile")

const navBar = document.querySelector(".navBar")

const closeMenuMovile = document.querySelector(".closeMenuMovile")

menuMovile.addEventListener("click", () => {

    navBar.style.display = "flex";
    navBar.style.flexDirection = "column";
    menuMovile.style.display = "none";
    closeMenuMovile.style.display = "flex";
})

closeMenuMovile.addEventListener("click", ()=> {
    closeMenuMovile.style.display = "none";
    navBar.style.display = "none";
    menuMovile.style.display = "flex";
})


const buttonDismiss = document.querySelector(".successOrder-button-secondary");

buttonDismiss.addEventListener("click", () => {
    window.location.href = "/";
})