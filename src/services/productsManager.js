import productsModel from "../models/products.js";

class ProductsManager {
    constructor() {}
  
    async createProduct(product) {
      let result = await productsModel.create(product);
      return result;
    }
  
    async getProducts() {
      try {
        const products = await productsModel.find({}).lean();
        return products;
      } catch (error) {
        console.log(error);
        return error
      }
    }

    async getFilterProducts(category, filter) {
      let products = await productsModel.find({category: category}).lean();
      if(filter == "PriceUp"){
        products.sort((a, b) => b.price - a.price);
      }else if(filter == "PriceDown"){
        products.sort((a, b) => a.price - b.price);
      }else if(filter == "Newest"){
        products.sort((a, b) => b.timeOfCreation - a.timeOfCreation) 
      }
      return products;
    }

    async getProductById(id){
      const product = await productsModel.find({_id: id}).lean();
      if(!product){
        return null;
      }
      return product;
    }

    async getSimilarProducts(productId, categoryProduct){
      const product = await productsModel.find({_id: productId}).lean();
      if(!product){
        return null;
      }
      let products = await productsModel.find({category: categoryProduct}).lean();

      const similarProducts = products.filter(product => product._id != productId);

      return similarProducts;

    }

    async updateProduct(id, fieldsToUpdate) {
      try {
        const updatedProduct = await productsModel.findByIdAndUpdate(id, fieldsToUpdate, { new: true }).lean();
        return updatedProduct;
      } catch (error) {
        console.log(`Error modificando producto: ${error}`)
        return false;
      }
    }

    async stockAvailable(products){
      try {
        let noStock = "";
        for (let i = 0; i < products.length; i++) {
          const product = await this.getProductById(products[i].id);

          const stockAfter = product[0].stock - products[i].cantidad;
  
          if ( stockAfter < 0) {
            if (noStock !== '') {
              noStock += ', ';
            }
            noStock += product[0].title;
          } 

        }
    
        return noStock;
      } catch (error) {

        console.error('Error al actualizar el stock:', error);
        return false; 
      }
    
    }

    async newStock(products) {
      try {
        for (let i = 0; i < products.length; i++) {
          const product = await this.getProductById(products[i].id);
    
          if (product) {
            product[0].stock -= products[i].cantidad;

            const productUpdated =  await this.updateProduct(product[0]._id, {"stock": product[0].stock})

          } else {
            console.log(`Producto con ID ${products[i].id} no encontrado.`);
          }
        }
    
        return true;
      } catch (error) {

        console.error('Error al actualizar el stock:', error);
        return false; 
      }
    }

  async getProductNames(products){
    try {
      let names = "";
      for(let i = 0; i < products.length; i++) {
        const product = await this.getProductById(products[0].id);
        if(names != ""){
          names += ", ";
        }
        names += product[0].title;
      }

      return names;
    } catch (error) {
      return error; 
    }
  }
  
}

export default ProductsManager;