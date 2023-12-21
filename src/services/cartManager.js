import cartsModel from "../models/carts.js";

class CartManager {

    async newOrder(data) {
        try {
            const newCart = await cartsModel.create(data);
            return newCart;
        } catch (error) {
            console.log(error);
            return error
        }
    }

}

export default CartManager;