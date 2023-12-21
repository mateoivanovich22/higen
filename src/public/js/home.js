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


function actualizarCantidadCarritoEnInicio() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let cantidadTotal = 0;

    // Calcular la cantidad total de productos en el carrito
    carrito.forEach(item => {
        cantidadTotal += item.cantidad;
    });

    // Actualizar el atributo data-quantity del botón del carrito
    const botonCarrito = document.querySelector('.btn-cart');
    if (botonCarrito) {
        botonCarrito.setAttribute('data-quantity', cantidadTotal);
        botonCarrito.querySelector('.quantity').innerText = cantidadTotal;
    }
}

window.onload = function() {
    actualizarCantidadCarritoEnInicio();
};

const buttonCart = document.querySelector(".btn-cart")

buttonCart.addEventListener('click', function (){
    const carrito = JSON.parse(localStorage.getItem('carrito'));
    console.log(carrito);
    if(!carrito || carrito.length == 0){
        alert("Your cart is empty. Please add some items to proceed.");
    }else{
        window.location.href = `/cart?carrito=${JSON.stringify(carrito)}`;
    }  
  
})
const snowboardCategory = document.querySelector(".snowboardCategory")

snowboardCategory.addEventListener("click", () => {
    window.location.href = "/snowboards";
})

const skiesCategory = document.querySelector(".skiesCategory")

skiesCategory.addEventListener("click", () => {
    window.location.href = "/skis";
})

const skiPoleCategory = document.querySelector(".skiPoleCategory")

skiPoleCategory.addEventListener("click", () => {
    window.location.href = "/skipoles";
})

