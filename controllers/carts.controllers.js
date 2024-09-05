import cartsServices from "../services/carts.services.js"

const createCart = async (req, res) => {

    try{

        const cart = await cartsServices.createCart()

        res.status(201).json({status: "success", payload: cart})

    }catch(error){
        console.log(error)
        res.status(500).json({status: "Error", msg: "Error interno del servidor"})
    }
}

const addProductToCart = async (req, res) => {

    try{
        const {cid, pid} = req.params
        const cart = await cartDao.addProductToCart(cid, pid)
        if(cart.product === false) return res.status(404).json({status: "Error", msg: `No se encontro el producto con el id ${pid}`})
        if(cart.cart === false) return res.status(404).json({status: "Error", msg: `No se encontro el producto con el id ${cid}`})

        res.status(200).json({status: "success", payload: cart})

    }catch(error){
        console.log(error)
        res.status(500).json({status: "Error", msg: "Error interno del servidor"})
    }
}

const updateQuantityProductInCart = async (req, res) => {

    try{
        const {cid, pid} = req.params
        const { quantity } = req.body
        const cart = await cartDao.updateQuantityProductInCart(cid, pid, quantity)
        if(cart.product === false) return res.status(404).json({status: "Error", msg: `No se encontro el producto con el id ${pid}`})
        if(cart.cart === false) return res.status(404).json({status: "Error", msg: `No se encontro el producto con el id ${cid}`})

        res.status(200).json({status: "success", payload: cart})

    }catch(error){
        console.log(error)
        res.status(500).json({status: "Error", msg: "Error interno del servidor"})
    }
}

const deleteProductInCart = async (req, res) => {

    try{
        const {cid, pid} = req.params
        const cart = await cartDao.deleteProductInCart(cid, pid)
        if(cart.product === false) return res.status(404).json({status: "Error", msg: `No se encontro el producto con el id ${pid}`})

        res.status(200).json({status: "success", payload: cart})

    }catch(error){
        console.log(error)
        res.status(500).json({status: "Error", msg: "Error interno del servidor"})
    }
}

const getById = async (req, res) => {

    try{
        const {cid} = req.params
        const cart = await cartDao.getById(cid)
        if(!cart) return res.status(404).json({status: "Error", msg: `No se encontro el carrito con el id ${cid}`})

        res.status(200).json({status: "success", payload: cart})

    }catch(error){
        console.log(error)
        res.status(500).json({status: "Error", msg: "Error interno del servidor"})
    }
}

const updateCart = async(req, res) => {
    try{
        const { cid } = req.params;
        const body = req.body;
        const cart = await cartDao.update(cid, body)
        if(!cart) return res.status(404).json({status: "Error", msg: `No se encontro el carrito con el id ${cid}`})


        res.status(200).json({ status: "success", payload: cart})
    }
    catch{
        console.log(error)
        res.status(500).json({ status: "Error", msg: "Error interno del servidor"})
    }
}

const deleteAllProductsInCart = async(req, res) => {
    try{
        const { cid } = req.params;
        const cart = await cartDao.deleteAllProductsInCart(cid)
        if(!cart) return res.status(404).json({status: "Error", msg: `No se encontro el carrito con el id ${cid}`})


        res.status(200).json({ status: "success", payload: cart})
    }
    catch{
        console.log(error)
        res.status(500).json({ status: "Error", msg: "Error interno del servidor"})
    }
}

export default {
    createCart,
    addProductToCart,
    updateQuantityProductInCart,
    deleteProductInCart,
    getById,
    updateCart,
    deleteAllProductsInCart,
}