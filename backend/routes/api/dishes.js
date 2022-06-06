const express = require("express");
const router = express.Router();
const authenticateToken = require("./users").authenticateToken;

const Dish = require("../../models/Dish");

router.get("/test", (req, res) => res.send("dish route test"));

router.get("/", (req, res) => {
    Dish.find()
        .then((dishes) => res.json(dishes))
        .catch((err) =>
            res.status(404).json({ noDishesFound: "no dishes found" })
        );
});

router.post("/", authenticateToken, (req, res) => {
    if (!req.user.isManager) {
        res.sendStatus(403);
    }

    Dish.create(req.body)
        .then((dish) => res.json({ msg: "Dish added successfully" }))
        .catch((err) => {
            console.log(err);
            res.status(400).json({ error: "Unable to add this dish" });
        });
});

router.delete("/:id", authenticateToken, (req, res) => {
    if (!req.user.isManager) {
        res.sendStatus(403);
    }

    Dish.findByIdAndRemove(req.params.id, req.body)
        .then((dish) => res.json({ msg: "deleted successfully" }))
        .catch((err) => {
            res.status(404).json({ error: "No such dish" });
            console.log(err);
        });
});

router.put("/:id", (req, authenticateToken, res) => {
    if (!req.user.isManager) {
        res.sendStatus(403);
    }

    Dish.findByIdAndUpdate(req.params.id, req.body)
        .then((dish) => res.json({ msg: "updated successfully" }))
        .catch((err) =>
            res.status(400).json({ error: "Unable to update the dish" })
        );
});

module.exports = router;
