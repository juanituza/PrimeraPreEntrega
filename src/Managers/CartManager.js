import fs, { existsSync } from "fs";

import ProductManager from "./ProductManager.js";
import { type } from "os";

const pm = new ProductManager();
const products = pm.getProducts();


export default class CartManager {
  constructor() {
    (this.carts = []), (this.path = "./files/carts.json");
  }

  appendCarts = async () => {
    try {
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.carts, null, "\t")
      );
    } catch (error) {
      console.error(error);
    }
  };

  getCarts = async () => {
    try {
      if (fs.existsSync(this.path)) {
        const data = await fs.promises.readFile(this.path, "utf-8");
        const carts = JSON.parse(data);
        return carts;
      }
      return [];
    } catch (error) {
      console.error(error);
    }
  };

  getCartById = async (ID) => {
    try {
      const cart = await this.getCarts();
      const cartId = cart.find((cart) => cart.id === ID);
      if (!cartId) {
        return console.log("ID Not found");
      } else {
        return cartId;
      }
    } catch (error) {
      console.error(error);
    }
  };

  createCarts = async (cart) => {
    try {
      const carts = await this.getCarts();

      if (carts.length === 0) {
        cart.id = 1;
      } else {
        const lastCart = carts[carts.length - 1];
        cart.id = lastCart.id + 1;
      }
      if (typeof cart.products === "undefined") {
        cart.products = [];
      }
      carts.push(cart);

      await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));
      return cart;
    } catch (error) {
      console.error(error);
    }
  };
  addProduct = async (cid, pid, quant) => {
    
    const carts = await this.getCarts();
    const cart = carts.find((c) => c.id === cid) || {};
    
    
    const product = await pm.getProductById(pid);
    if (Object.keys(cart).length === 0) {
      return "No existe carrito";
    }
    if (typeof product !== "object") {
      return "No existe producto";
    }
    if (quant === 0) {
        return "Cantidad de producto nula";
    }
    const prodInCart = cart['products'].find((prod) => prod.id === pid) || {};
   
    if (Object.keys(prodInCart).length === 0) {
      prodInCart.id=pid;
      prodInCart.quantity=quant;

      cart.products.push(prodInCart);
   
    } else {
      prodInCart.quantity = prodInCart.quantity+quant;
   
    }
    this.carts = carts;
    this.appendCarts();
    return prodInCart;
    
  };
}