import ProductManager from "./Class/ProductManager.js";
import CartManager from "./Class/CartManager.js";

const cart =  new CartManager();

const prod = new ProductManager();
prod.getProducts();

// const context = async()=>{

//     const test = await prod.getProducts();
    
//     let testProduct1 = {
//         title: "remera",
//         description: "BLACK",
//         price: 500,
//         thumbnail :"img",
//         code :300,
//         stock: 50
//     }
//     let testProduct2 = {
//         title: "remera",
//         description: "BLACK",
//         price: 500,
//         thumbnail :"img",
//         code :301,
//         stock: 50
//     }
//     let testProduct3 = {
//         title: "remera",
//         description: "BLACK",
//         price: 500,
//         thumbnail :"img",
//         code :302,
//         stock: 50
//     }
//     let testProduct4 = {
//         title: "remera",
//         description: "BLACK",
//         price: 500,
//         thumbnail :"img",
//         code :303,
//         stock: 50
//     }
//     let testProduct5 = {
//         title: "remera",
//         description: "BLACK",
//         price: 500,
//         thumbnail :"img",
//         code :304,
//         stock: 50
//     }
//     let testProduct6 = {
//         title: "remera",
//         description: "BLACK",
//         price: 500,
//         thumbnail :"img",
//         code :305,
//         stock: 50
//     }
//     await prod.createProducts(testProduct1);
//     await prod.createProducts(testProduct2);
//     await prod.createProducts(testProduct3);
//     await prod.createProducts(testProduct4);
//     await prod.createProducts(testProduct5);
//     await prod.createProducts(testProduct6);
// }

// context();

// cart.getCarts();
// cart.createCarts();
// console.log(cart);

prod.getProductById(4);
const produ = prod.getProducts();
console.log(produ);

// prod.updateProduct(5, "price", "blanco");
// prod.deleProduct(5)
