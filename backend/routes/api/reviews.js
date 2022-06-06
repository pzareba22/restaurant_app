const express = require("express");
const router = express.Router();
const authenticateToken = require("./users").authenticateToken;

const Review = require("../../models/Review");

router.get("/test", (req, res) => res.send("review route test"));

router.get("/:dishID", (req, res) => {
    Review.find({ dishID: req.params.dishID })
        .then((reviews) => res.json(reviews))
        .catch((err) => res.status(404).json({ error: "no reviews found" }));
});

router.post("/:dishID", authenticateToken, (req, res) => {
    if (req.user.username != req.body.username) {
        return res.sendStatus(403);
    }

    const newItem = {
        ...req.body,
        dishID: req.params.dishID,
    };
    Review.create(newItem)
        .then((review) => res.json({ msg: "Review added successfully" }))
        .catch((err) => {
            console.log(err);
            res.status(400).json({ error: "Unable to add this review" });
        });
});

router.delete("/:reviewID", authenticateToken, async (req, res) => {
    const username = (await Review.findById(req.params.reviewID)).username;

    if (req.user.username != username && !req.user.isAdmin) {
        return res.sendStatus(403);
    }

    Review.findByIdAndRemove(req.params.reviewID, req.body)
        .then((review) => res.json({ msg: "review deleted successfully" }))
        .catch((err) => {
            res.status(404).json({ error: "no such review" });
            console.log(err);
        });
});

module.exports = router;
