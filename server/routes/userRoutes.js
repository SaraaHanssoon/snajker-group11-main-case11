const express = require("express");
const router = express.Router();
const { User } = require("../models");

router.get("/", async (req, res) => {
	try {
		const users = await User.findAll();
		res.json(users);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.get("/:id", async (req, res) => {
	try {
		const user = await User.findByPk(req.params.id);
		if (!user) return res.status(404).json({ error: "User not found" });
		res.json(user);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.post("/", async (req, res) => {
	try {
		const { name, email, password, role } = req.body;
		const newUser = await User.create({ name, email, password, role });
		res.status(201).json(newUser);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.put("/:id", async (req, res) => {
	try {
		const { name, email, role } = req.body;
		await User.update({ name, email, role }, { where: { user_id: req.params.id } });
		res.json({ message: "User updated" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.delete("/:id", async (req, res) => {
	try {
		await User.destroy({ where: { user_id: req.params.id } });
		res.json({ message: "User deleted" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

module.exports = router;
