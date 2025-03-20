const express = require("express");
const router = express.Router();
const { Product } = require("../models");
const { Op } = require("sequelize");

router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/filter", async (req, res) => {
  try {
    const { category, stock } = req.query;
    const whereClause = {};

    if (category) whereClause.fk_categoryid = category;
    if (stock === "true") whereClause.stock = { [Op.gt]: 0 }; 
    if (stock === "false") whereClause.stock = 0; 

    const products = await Product.findAll({ where: whereClause });

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, description, price, stock, fk_categoryid, imageUrl } = req.body;
    const newProduct = await Product.create({ name, description, price, stock, fk_categoryid, imageUrl });
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { name, description, price, stock, imageUrl } = req.body;
    await Product.update({ name, description, price, stock, imageUrl }, { where: { product_id: req.params.id } });
    res.json({ message: "Product updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Product.destroy({ where: { product_id: req.params.id } });
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
