import express from "express";
import * as functions from "../controllers/homeController.js"

const router = express.Router();

router.get("/", functions.showHomePage );

router.get("/snowboards", functions.showHomeSnowboardPage );
router.get("/snowboards/filter", functions.showSnowboardFilter );

router.get("/skis", functions.showHomeSkiesPage);
router.get("/skis/filter", functions.showSkiesFilter);

router.get("/skiPoles", functions.showHomeSkiPolesPage);
router.get("/skiPoles/filter", functions.showSkiPolesFilter);

router.get("/product/:pid", functions.showProduct);

router.post("/createProduct", functions.createProducts);

router.post("/review", functions.createReview);

router.post("/cart", functions.showCart);
router.get("/cart", functions.renderCart);

router.post("/newsletter/sections", functions.sendNewsletterSection);

router.post("/createQuestion", functions.createQuestion);

router.post("/createOrder", functions.createOrder);

router.get("/order-created", functions.orderCreated);

export default router;