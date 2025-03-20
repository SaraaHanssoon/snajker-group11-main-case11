const express = require('express');
const router = express.Router();
const { Cart, CartItem } = require('../models');

router.post('/add', async (req, res) => {
    try {
        const { fk_userid, fk_productid, quantity } = req.body;

        console.log(" Received data:", req.body);

        if (!fk_userid || !fk_productid || !quantity || quantity <= 0) {
            return res.status(400).json({ error: " Ogiltig förfrågan: Alla fält måste vara ifyllda." });
        }

        let cart = await Cart.findOne({ where: { fk_userid } });
        if (!cart) {
            console.log(" Ingen kundvagn hittades, skapar en ny...");
            cart = await Cart.create({ fk_userid });
        }

        let cartItem = await CartItem.findOne({ where: { fk_cartid: cart.cart_id, fk_productid } });
        if (cartItem) {
            console.log(" Produkten finns redan i varukorgen, ökar antal...");
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            console.log(" Lägger till ny produkt i varukorgen...");
            cartItem = await CartItem.create({ fk_cartid: cart.cart_id, fk_productid, quantity });
        }

        res.json(cartItem);
    } catch (error) {
        console.error(" Server error:", error);
        res.status(500).json({ error: "Något gick fel på servern." });
    }
});

router.put('/update/:cartItem_id', async (req, res) => {
    try {
        const { cartItem_id } = req.params;
        const { quantity } = req.body;

        const cartItem = await CartItem.findByPk(cartItem_id);
        if (!cartItem) return res.status(404).json({ error: ' Cart item not found' });

        cartItem.quantity = quantity;
        await cartItem.save();
        res.json({ message: " Kvantitet uppdaterad!", cartItem });

    } catch (error) {
        console.error(" Error updating cart item:", error);
        res.status(500).json({ error: "Kunde inte uppdatera produkt i varukorgen" });
    }
});

router.delete('/remove/:cartItem_id', async (req, res) => {
    try {
        const { cartItem_id } = req.params;

        const cartItem = await CartItem.findByPk(cartItem_id);
        if (!cartItem) return res.status(404).json({ error: ' Cart item not found' });

        await cartItem.destroy();
        res.json({ message: " Produkt borttagen från varukorgen!" });

    } catch (error) {
        console.error(" Error removing product from cart:", error);
        res.status(500).json({ error: "Kunde inte ta bort produkt från varukorgen" });
    }
});

router.get('/:fk_userid', async (req, res) => {
    try {
        const { fk_userid } = req.params;

        const cart = await Cart.findOne({
            where: { fk_userid },
            include: [{ model: CartItem }]
        });

        if (!cart) return res.status(404).json({ error: " No cart found for this user" });

        res.json(cart);

    } catch (error) {
        console.error(" Error fetching cart:", error);
        res.status(500).json({ error: "Kunde inte hämta varukorg" });
    }
});

module.exports = router;
