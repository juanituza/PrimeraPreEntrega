import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import __dirname from "./utils.js";


const app = express();


// app.engine("handlebars", handlebars.engine());
// app.set("views", `${__dirname}/views`);
// app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //Objetos codificados desde URL
app.use(express.static(`${__dirname}/public`));
app.use('/api/products',productsRouter);
app.use('/api/carts', cartsRouter);


app.listen(8080, () => console.log("Listening on http://localhost:8080"));
