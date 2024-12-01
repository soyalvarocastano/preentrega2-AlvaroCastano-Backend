import { Router } from 'express';
import CartManager from '../services/CartManager.js';

const router = Router();
const cartManager = new CartManager();

// Crear un nuevo carrito
router.post('/', async (req, res) => {
    try {
        const newCart = await cartManager.createCart();
        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).send('Error al crear el carrito');
    }
});

// Obtener productos de un carrito por ID
router.get('/:cid', async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid);
        const cart = await cartManager.getCartById(cartId);

        if (!cart) {
            return res.status(404).send('Carrito no encontrado');
        }

        res.json(cart);
    } catch (error) {
        res.status(500).send('Error al obtener el carrito');
    }
});

// Agregar producto a un carrito
router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid);
        const productId = parseInt(req.params.pid);

        const updatedCart = await cartManager.addProductToCart(cartId, productId);
        if (!updatedCart) {
            return res.status(404).send('Carrito no encontrado');
        }

        res.json(updatedCart);
    } catch (error) {
        res.status(500).send('Error al agregar el producto al carrito');
    }
});

export default router;
