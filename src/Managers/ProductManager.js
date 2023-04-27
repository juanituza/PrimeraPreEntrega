
import fs, { existsSync } from "fs";

export default class ProductManager {
  constructor() {
    (this.products = []),
      (this.status = true),
      (this.path = "./files/products.json");
  }

  appendProducts = async () => {
    try {
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.products, null, "\t")
      );
    } catch (error) {
      console.error(error);
    }
  };

  getProducts = async () => {
    try {
      if (fs.existsSync(this.path)) {
        const data = await fs.promises.readFile(this.path, "utf-8");
        const products = JSON.parse(data);
        return products;
      }
      return [];
    } catch (error) {
      console.error(error);
    }
  };

  createProducts = async (product) => {
    try {
      const products = await this.getProducts();

      if (
        !product.title ||
        !product.description ||
        !product.price ||
        !product.code ||
        !product.status ||        
        !product.category ||        
        !product.stock
      ) {
        console.log("Incomplete data");
        return "Incomplete data";
      }
      if (
        typeof products.find((item) => item.code == product.code) !==
        "undefined"
        ) {
          
          return `Duplicate product code ${product.code}`;
        }
        if (products.length === 0) {
          product.id = 1;
        } else {
          const lastProduct = products[products.length - 1];
          product.id = lastProduct.id + 1;
        }
      products.push(product);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(products, null, "\t")
      );
      // this.appendProducts();
      return product;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  getProductById = async (ID) => {
    try {
      const prod = await this.getProducts();
      const productId = prod.find((prod) => prod.id === ID);
      if (!productId) {
        return console.log("ID Not found");
      } else {
        return productId;
      }
    } catch (error) {
      console.error(error);
    }
  };

  updateProduct = async (_id, elem) => {
    try {
      const produ = await this.getProducts();

      if (!produ[_id]) {
        console.log("no existe id");
      } else {
    
        const newProduct = produ.map((p) =>
          p.id === _id ? { ...p, ...elem } : p
        );
        
      
        this.products = newProduct;
        this.appendProducts();
      }
    } catch (error) {
      console.error(error);
    }
  
  };

  deleteProduct = async (_id) => {
    try {
      const produ = await this.getProducts();
      const delProd = produ.filter((p) => p.id !== _id);
      this.products = delProd;
      this.appendProducts();
   
    } catch (error) {
      console.error(error);
    }
  };
}
  
