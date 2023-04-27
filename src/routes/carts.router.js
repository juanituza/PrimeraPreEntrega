import { Router } from "express";

const router = Router();

import CartManager from "../Managers/CartManager.js";

const cm = new CartManager();
const carts = cm.getCarts();

router.get("/", async (req, res) => {
  try {
    const allCarts = await carts;
    res.status(200).send(allCarts);
  } catch (error) {
    res
      .status(500)
      .send({ error: "Internal server error, contact the administrator" });
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const pos = parseInt(req.params.cid);
    const cart = await carts;
    const cartSelect = cart.find((cart) => cart.id === pos);
    res.status(200).send(cartSelect);
  } catch (error) {
    res
      .status(500)
      .send({ error: "Internal server error, contact the administrator" });
  }
});

router.post("/", async (req, res) => {
  try {
    const cart = req.body;
    const resCart = await cm.createCarts(cart);
    res.status(200).send(resCart);
  } catch (error) {
    res
      .status(500)
      .send({ error: "Internal server error, contact the administrator" });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);

    const quant = isNaN(req.body?.quantity) ? 0 : parseInt(req.body?.quantity);

    const resAddProduct = await cm.addProduct(cid, pid, quant);
    res.status(200).send(resAddProduct);
  } catch (error) {
    res
      .status(500)
      .send({ error: "Internal server error, contact the administrator" });
  }
});

export default router;
