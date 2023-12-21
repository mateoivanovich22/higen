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
  
    window.location.href = `/cart?carrito=${JSON.stringify(carrito)}`;
  
})

function updateBigPhoto(element, imageUrl) {
    var bigPhotoImg = document.getElementById('bigPhotoImg');
    bigPhotoImg.src = "../img/products/" + imageUrl;

    var squarePhotos = document.querySelectorAll('.squarePhoto');
    squarePhotos.forEach(function(photo) {
        photo.classList.remove('active');
    });

    element.classList.add('active');
}

const success = document.querySelector(".success");

function addToCart(productId) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    const productoExistente = carrito.find(item => item.id === productId);

    const spinner = document.querySelector('.spinner');

    const CartBtn = document.querySelector(".CartBtn");

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({ id: productId, cantidad: 1 });
    }

    CartBtn.style.display = "none"
    spinner.style.display = "flex";

    setTimeout(() => {
        spinner.style.display = "none";
        CartBtn.style.display = "flex";
        success.style.display = "flex";
    }, 1000);

    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCantidadCarrito();
}

function actualizarCantidadCarrito() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let cantidadTotal = 0;

    carrito.forEach(item => {
        cantidadTotal += item.cantidad;
    });

    const botonCarrito = document.querySelector('.btn-cart');
    if (botonCarrito) {
        botonCarrito.setAttribute('data-quantity', cantidadTotal);
        botonCarrito.querySelector('.quantity').innerText = cantidadTotal;
    }
}

function actualizarCantidadCarritoEnInicio() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let cantidadTotal = 0;

    carrito.forEach(item => {
        cantidadTotal += item.cantidad;
    });

    const botonCarrito = document.querySelector('.btn-cart');
    if (botonCarrito) {
        botonCarrito.setAttribute('data-quantity', cantidadTotal);
        botonCarrito.querySelector('.quantity').innerText = cantidadTotal;
    }
}

window.onload = function() {
    actualizarCantidadCarritoEnInicio();
};

const success__close = document.querySelector(".success__close");

success__close.addEventListener('click', () => {
    success.style.display = 'none';
});



document.getElementById('sendReviewBtn').addEventListener('click', function() {

    const reviewText = document.getElementById('reviewText').value;

    const selectedRating = document.querySelector('.rating input:checked');

    const productId = document.querySelector('#productId').textContent;
    
    if (reviewText.trim() === '') {
        alert('Please enter your review message.');
        return; 
    }

    if (!selectedRating) {
        alert('Please select a rating.');
        return;
    }

    const ratingValue = selectedRating.value;


    const reviewData = {
        message: reviewText,
        rating: ratingValue,
        productId: productId
    };

    fetch('/review', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reviewData)
    })
    .then(response => {
        document.getElementById('reviewText').value = ''; 
        document.querySelectorAll('.rating input').forEach(input => input.checked = false);
        location.reload();
    })
    .catch(error => {
        console.error('Error submitting review:', error);
    });
});