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


function deleteProduct(id, quantity){

    let oldCart = JSON.parse(localStorage.getItem('carrito'));
    const product = oldCart.filter(product => product.id ==  id);
    let newCart = [];

    if(product[0].cantidad > 1){

        if(product[0].cantidad - quantity == 0){
            console.log("Chaui")
            newCart = oldCart.filter(product => product.id !=  id);
        }else{
            console.log("Lenght oldCartv ",oldCart.length)
            for(let i = 0; i < oldCart.length; i++){
                if(oldCart[i].id == id){
                    oldCart[i].cantidad -= quantity;
                }
            }
            console.log(oldCart)

            newCart= newCart.concat(oldCart);
            console.log(newCart)
        }
    }else{
        newCart = oldCart.filter(product => product.id !=  id);

    }

    localStorage.removeItem('carrito');

    localStorage.setItem('carrito', JSON.stringify(newCart));


    setTimeout(() => {
        window.location.href = `/cart?carrito=${JSON.stringify(newCart)}`;
    }, 100);
}
const questions = document.querySelectorAll('.question');

  questions.forEach(question => {
    question.addEventListener('click', () => {
      const answer = question.querySelector('.answer');
      const icon = question.querySelector('.toggleIcon');

      if (answer.style.display === 'flex') {
        answer.style.display = 'none';
        icon.textContent = '+';
      } else {
        // Oculta todas las respuestas
        document.querySelectorAll('.answer').forEach(ans => {
          ans.style.display = 'none';
        });
        // Restaura los íconos
        document.querySelectorAll('.toggleIcon').forEach(ic => {
          ic.textContent = '+';
        });

        answer.style.display = 'flex';
        answer.style.alignItems  = "center";
        icon.textContent = '-';
      }
    });
});

document.getElementById('questionForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('emailQuestion').value;
    const comment = document.getElementById('commentQuestion').value;

    const data = {
        email,
        message: comment
    }
    
    const response = await fetch('/createQuestion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    if (response.ok) {
        document.getElementById('questionForm').reset();
    }
    
});

const buttonFinishBuy = document.querySelector(".buttonFinishBuy")
  
const divCreateOrder = document.querySelector(".divCreateOrder");
const cartDetails = document.querySelector(".cartDetails");

const formOrder = document.querySelector(".orderForm");

formOrder.addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const phoneNumber = document.getElementById("phone").value;
    const paymentMethod = document.getElementById('paymentMethod').value;

    let products = JSON.parse(localStorage.getItem('carrito'));

    const data = {
        email,
        phoneNumber,
        paymentMethod,
        products
    };

    const response = await fetch("/createOrder", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });

    if (response.status == 200) {
        localStorage.removeItem('carrito');
        

        window.location.href = "/order-created";
    } else if (response.status == 204) {
        alert("We don't have enough stock for this order.");
    } else {
        alert("We had an error with your purchase");
    }
    
});

const buttonCloseOrder = document.querySelector(".buttonCloseOrder")

buttonCloseOrder.addEventListener('click', () => {
    divCreateOrder.style.display = "none";
    cartDetails.style.display= "flex";
    buttonFinishBuy.style.display = 'flex';
})

buttonFinishBuy.addEventListener('click', async function() {
    divCreateOrder.style.display = "flex";
    cartDetails.style.display= "none";
    buttonFinishBuy.style.display = 'none';
});
