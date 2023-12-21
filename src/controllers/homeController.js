import ProductsManager from "../services/productsManager.js";
const productsManager = new ProductsManager();

import ReviewsManager from "../services/reviewsManager.js";
const reviewsManager = new ReviewsManager();

import QuestionsManager from "../services/questionsManager.js";
const questionsManager = new QuestionsManager();

import CartManager from "../services/cartManager.js";
const cartsManager = new CartManager();

import config from "../config/config.js";

import nodemailer from "nodemailer";
const nodemailerKey = config.nodemailer.key;

function getLatestProductsByCategory(products) {
  const productsByCategory = {};

  products.forEach((product) => {
    const { category } = product;
    if (!productsByCategory[category]) {
      productsByCategory[category] = [];
    }
    productsByCategory[category].push(product);
  });

  for (const category in productsByCategory) {
    productsByCategory[category] = productsByCategory[category]
      .sort((a, b) => b.timeOfCreation - a.timeOfCreation) 
      .slice(0, 3);
  }

  return productsByCategory;
}

async function orderMail(email, productsName){
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Higen Newsletter</title>
        <style>
            /* Estilos CSS para el correo electrónico */
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                background-color: #f7f7f7;
                margin: 0;
                padding: 20px;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #fff;
                border-radius: 8px;
                padding: 20px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
                color: #333;
                font-size: 24px;
                margin-bottom: 20px;
            }
            p {
                color: #555;
                font-size: 16px;
                margin-bottom: 10px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Thanks for choosing to purchase the following products: </h1>
            <h2>${productsName}</h2>
            <p>Your order has been successfully processed, and we are delighted to inform you that your items will soon be on their way to you.</p>
            <p>We appreciate your trust in our products and services. Should you have any inquiries or require further assistance, please don't hesitate to contact our customer support team.</p>
            <p>Thank you once again for shopping with us. We hope you enjoy your new products!</p>
            <p>Best regards,<br>Higen</p>
        </div>
    </body>
    </html>
  `
  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    auth: {
      user: "mateoivanovichichi@gmail.com",
      pass: nodemailerKey,
    },
  });

  const mailOptions = {
    from: "Mateoivanovich43@gmail.com",
    to: email,
    subject: "Higen purchase",
    html: html,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log("Error al enviar el correo:", err);
      return;
    }

    console.log(`Mensaje enviado con éxito de ${email}`);
  });
}

async function sendMail(title, info ,email){

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Higen Newsletter</title>
        <style>
            /* Estilos CSS para el correo electrónico */
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                background-color: #f7f7f7;
                margin: 0;
                padding: 20px;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #fff;
                border-radius: 8px;
                padding: 20px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
                color: #333;
                font-size: 24px;
                margin-bottom: 20px;
            }
            p {
                color: #555;
                font-size: 16px;
                margin-bottom: 10px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Welcome to the Newsletter!</h1>
            <p>${info}</p>
        </div>
    </body>
    </html>
  `

  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    auth: {
      user: "mateoivanovichichi@gmail.com",
      pass: nodemailerKey,
    },
  });

  const mailOptions = {
    from: "Mateoivanovich43@gmail.com",
    to: email,
    subject: title,
    html: html,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log("Error al enviar el correo:", err);
      return;
    }

    console.log(`Mensaje enviado con éxito de ${email}`);
  });
}

export const sendNewsletterSection = async (req, res) => {

  const email = req.body.email;
  const section = req.body.section;

  let textBody = ""

  if(section == "Snowboards"){
    textBody = "¡Welcome aboard the snowboard enthusiasts' community! We're thrilled to have you join our exclusive newsletter. Thank you for signing up. Prepare to immerse yourself in a world of enticing offers, updates on the latest snowboard designs, and insider tips to elevate your snowboarding adventures. Expect to receive firsthand updates on our newest snowboard collections, exclusive deals, and access to exciting events. Stay in the loop with the latest trends and enjoy premium content tailored to fuel your passion for snowboarding. We're excited to have you as part of our community and look forward to sharing thrilling snowboard experiences, expertise, and stories with you. Thanks for embarking on this exhilarating journey with us!"
  }else if (section == "Skis"){
    textBody = "Welcome to the skiing community! We're thrilled to welcome you to our exclusive newsletter. Thank you for joining us. Dive into a world of exciting offers, product news, and expert tips to enhance your experience on snow-covered slopes. Get ready to receive the latest updates on our new ski collections, special offers, and access to exclusive events. Stay up-to-date with the latest trends and enjoy exclusive content designed to elevate your passion for skiing. We're excited to have you as part of our community and look forward to sharing thrilling adventures and experiences on the slopes with you. Thank you for joining us on this exciting journey!"
  }else{
    textBody = "Welcome to the Ski Poles Enthusiasts Club! We're thrilled to have you on board our exclusive newsletter. Thank you for signing up. Get ready to delve into a world filled with exciting offers, the latest innovations in ski pole technology, and insider insights that will enhance your skiing adventures. Get the latest updates on our cutting-edge ski pole collections, access exclusive deals, and stay informed about upcoming events. Stay ahead of the curve with the newest trends and indulge in premium content designed to elevate your skiing experience. We're delighted to have you join our community and anticipate sharing thrilling ski pole experiences, expertise, and engaging stories with you. Thanks for joining us on this exhilarating journey!"
  }

  await sendMail(`Higen ${section} newsletter!`, textBody, email)

  res.sendStatus(200)
}

export const showHomePage = async (req, res) => {
  const products = await productsManager.getProducts()

  const getLatestProducts = getLatestProductsByCategory(products)

  res.render("home", { products: getLatestProducts });
};


export const showHomeSnowboardPage = async (req, res) => {
  const products = await productsManager.getFilterProducts("snowboards", null);

  res.render("snowboards", {products: products});
};

export const showSnowboardFilter = async (req, res) => {
  const selectedFilter = req.query.filter; 
  try {
    const filteredProducts = await productsManager.getFilterProducts("snowboards" ,selectedFilter);
    res.render("snowboards", {products: filteredProducts});
  } catch (error) {
    res.status(500).json({ error: 'Error al filtrar productos' });
  }
};

export const showSkiesFilter = async (req, res) => {
  const selectedFilter = req.query.filter; 
  try {
    const filteredProducts = await productsManager.getFilterProducts("skis" ,selectedFilter);
    res.render("skies", {products: filteredProducts});
  } catch (error) {
    res.status(500).json({ error: 'Error al filtrar productos' });
  }
};

export const createProducts = async (req, res) => {
  const product = req.body.product;
  const createProduct = await productsManager.createProduct(product);

  console.log("Product created: ", createProduct);

  res.send({ message: "Producto agregado correctamente" });
};

export const showHomeSkiesPage = async (req, res) => {
  const products = await productsManager.getFilterProducts("skis", null);

  res.render("skies", {products: products});
};

export const showHomeSkiPolesPage = async (req, res) => {
  const products = await productsManager.getFilterProducts("skiPoles", null);

  res.render("skiPoles", {products: products});
};

export const showSkiPolesFilter = async (req, res) => {
  const selectedFilter = req.query.filter; 
  try {
    const filteredProducts = await productsManager.getFilterProducts("skiPoles" ,selectedFilter);
    res.render("skiPoles", {products: filteredProducts});
  } catch (error) {
    res.status(500).json({ error: 'Error al filtrar productos' });
  }
};

export const showProduct = async (req, res) => {
  const productId = req.params.pid

  const product = await productsManager.getProductById(productId);
  const reviews = await reviewsManager.getReviewsAndAverageRating(productId)

  const transformedReviews = reviews.reviews.map(review => {
    return {
      message: review.message,
      rating: review.rating
    };
  });

  const countOfReviews = reviews.reviews.length || 0;

  const similarProducts = await productsManager.getSimilarProducts(productId, product[0].category)

  res.render("product", {product: product[0], reviews: transformedReviews, averageRating: reviews.averageRating, totalReviews: countOfReviews, similarProducts: similarProducts})
};

export const createReview = async (req, res) => {

  const productId = req.body.productId;
  const review = {
    message: req.body.message,
    rating: req.body.rating
  }
  const reviewCreated = await reviewsManager.createReview(productId, review);

  res.sendStatus(200)
}


export const showCart = async (req, res) => {
  const carrito = req.body.carrito;

  res.redirect(`/cart?carrito=${JSON.stringify(carrito)}`);
};


export const createCart = async (req, res) => {
  res.sendStatus(200);
}

export const renderCart = async (req, res) => {
  const carrito = JSON.parse(req.query.carrito || '[]'); 

  let carritoDeMongo = [];

  let totalPrice = 0;

  for (let i = 0; i < carrito.length; i++) {
    const product = await productsManager.getProductById(carrito[i].id);
    carritoDeMongo = carritoDeMongo.concat(product);
    carritoDeMongo[i].quantity = carrito[i].cantidad;
    totalPrice += carrito[i].cantidad *  carritoDeMongo[i].price;
  }

  res.render("cart", { carritoDeMongo: carritoDeMongo, totalPrice: totalPrice });
};

export const createQuestion = async (req, res) => {

  const email = req.body.email;
  const question = req.body.message;

  const pushQuestion = await questionsManager.createQuestion(email, question);

  res.sendStatus(200);
}


export const createOrder = async (req, res) => {
  try {
    const formData = req.body;
    const productsToDelete = formData.products.concat(); 

    const checkStock = await productsManager.stockAvailable(formData.products)

    if(checkStock != ''){
      return res.sendStatus(204)
    }else{
      const orderPush = await cartsManager.newOrder(formData)
    
      const deleteStock = await productsManager.newStock(productsToDelete);

      const productNames = await productsManager.getProductNames(formData.products);

      await orderMail(formData.email, productNames)

      return res.sendStatus(200);
    }

  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error al procesar el formulario y el carrito');
  }
}


export const orderCreated = async (req, res) => {

  res.render("orderCreated")
}


// const product = {
//     title: "Shepherd",
//     imageFront: "shepherd1.webp",
//     imageBack: "shepherd2.webp",
//     description: "The Shepherd is your tool and spiritual guide for big mountain endeavors. Developed by Nick Russell, this board shares the same shape and dimensions as its split counterpart. Utilizing purpose-built biobased materials derived from microalgae oil to increase damping, stability and confidence while in the high alpine. Our Algal Core and Algal Wall allow this board to flow naturally through any mixed terrain that you may find. Its deep sidecut, taper, and directional camber enable responsive edge hold on steeper terrain, and maintain power and energy in deep snow. Set your line and let it ride with the Shepherd. ",
//     price: 699,
//     stock: 10,
//     category: "snowboards",
// }
