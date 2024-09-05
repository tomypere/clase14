import cartDao from "../dao/mongoDao/cart.dao.js";
import productDao from "../dao/mongoDao/product.dao.js";

const createCart = async () => {
    return await cartDao.create();
};

const addProductToCart = async (cid, pid) => {
    await checkProductAndCart(cid, pid);
    const productInCart = await cartDao.update({ _id: cid, "products.product": pid }, { $inc: { "products.$.quantity": 1 } });

    if (!productInCart) {
        return await cartDao.update({ _id: cid }, { $push: { products: { product: pid, quantity: 1 } } });
    }

    return productInCart;
};

const updateQuantityProductInCart = async (cid, pid, quantity) => {
    await checkProductAndCart(cid, pid);
    return await cartDao.update({ _id: cid, "products.product": pid }, { $set: { "products.$.quantity": quantity } });
};

const deleteProductInCart = async (cid, pid) => {
    await checkProductAndCart(cid, pid);

    return await cartDao.update({ _id: cid, "products.product": pid }, { $inc: { "products.$.quantity": -1 } });
};

const getCartById = async (id) => {
    return await cartDao.getById(id);
};

const updateCart = async (query, data) => {
    return await cartDao.update(query, data);
};

const deleteAllProductsInCart = async (cid) => {
    return await cartDao.update({ _id: cid }, { $set: { product: [] } });
};

const checkProductAndCart = async (cid, pid) => {
    const product = await productDao.getById(pid);
    if (!product) return { product: false };
    const cart = await cartDao.getById(cid);
    if (!cart) return { cart: false };
};

export default {
    createCart,
    addProductToCart,
    updateQuantityProductInCart,
    deleteProductInCart,
    getCartById,
    updateCart,
    deleteAllProductsInCart,
};