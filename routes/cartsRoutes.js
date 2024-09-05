import { Router } from "express";
import cartDao from "../dao/mongoDao/cart.dao.js";
import { authorization, passportCall } from "../middlewares/passport.middleware.js";
import cartsController from "../controllers/carts.controller.js";


const router = Router()


router.post("/",passportCall("jwt"), authorization("user"), cartsController.createCart)

router.post("/:cid/product/:pid", passportCall("jwt"), authorization("user"),  cartsController.addProductToCart)

router.put("/:cid/product/:pid", passportCall("jwt"), authorization("user"), cartsController.updateQuantityProductInCart)

router.delete("/:cid/product/:pid", passportCall("jwt"), authorization("user"), cartsController.deleteProductInCart)

router.get("/:cid", passportCall("jwt"), authorization("user"), cartsController.getById)

router.put("/:cid", passportCall("jwt"), authorization("user"), cartsController.updateCart)

router.delete("/:cid", passportCall("jwt"), authorization("user"), cartsController.deleteAllProductsInCart)


export default router;