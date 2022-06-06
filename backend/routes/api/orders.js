const express = require("express");
const router = express.Router();
const authenticateToken = require("./users").authenticateToken;

const Order = require("../../models/Order");
const Dish = require("../../models/Dish");

router.get("/", (req, res) => res.send("order route test"));

router.get("/:username", authenticateToken, (req, res) => {
    if (req.user.username != req.params.username && !req.user.isAdmin) {
        return res.sendStatus(403);
    }
    Order.find({ username: req.params.username })
        .then((orders) => res.json(orders))
        .catch((err) => res.status(404).json({ error: "no orders found" }));
});

router.post("/:username", authenticateToken, (req, res) => {
    if (req.params.username != req.user.username) {
        return res.sendStatus(403);
    }

    const newItem = {
        ...req.body,
        username: req.params.username,
    };

    Order.create(newItem)
        .then((order) => res.json({ msg: "order added successfully" }))
        .catch((err) =>
            res.status(400).json({ error: "Unable to add this order" })
        );

    Dish.findOneAndUpdate(req.body.amount, {
        $inc: { dayAmount: -1 * req.body.amount },
    }).exec();
});

module.exports = router;
