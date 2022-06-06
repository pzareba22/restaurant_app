const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../../models/User");
const Review = require("../../models/Review");
const Order = require("../../models/Order");

router.get("/test", (req, res) => res.send("users route test"));

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
};

router.get("/", authenticateToken, (req, res) => {
    const user = req.user;

    if (!user.isAdmin) {
        res.sendStatus(403);
    }

    User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(404).json({ error: "no users found" }));
});

router.post("/register", async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = {
        username: req.body.username,
        password: hashedPassword,
        isAdmin: false,
        isManager: false,
        isBanned: false,
    };
    User.create(user)
        .then((user) => {
            res.json({ msg: "User added successfully😎" });
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ error: "Unable to add this user" });
        });
});

router.post("/login", async (req, res) => {
    User.find({ username: req.body.username }).then(async (user) => {
        if (user.length === 0) {
            res.status(400).json({ error: "no user found" });
        } else {
            user = user[0];
            try {
                if (await bcrypt.compare(req.body.password, user.password)) {
                    const accessToken = jwt.sign(
                        {
                            username: user.username,
                            isAdmin: user.isAdmin,
                            isManager: user.isManager,
                            isBanned: user.isBanned,
                        },
                        process.env.ACCESS_TOKEN_SECRET
                    );

                    const userReviews = await Review.find({
                        username: user.username,
                    });

                    const userOrders = await Order.find({
                        username: user.username,
                    });

                    res.status(200).json({
                        accessToken: accessToken,
                        isAdmin: user.isAdmin,
                        isManager: user.isManager,
                        isBanned: user.isBanned,
                        reviews: userReviews,
                        orders: userOrders,
                    });
                } else {
                    res.status(403).json({ message: "Not allowed" });
                }
            } catch (error) {
                res.status(500);
            }
        }
    });
});

router.put("/:id", authenticateToken, (req, res) => {
    if (!req.user.isAdmin) {
        res.sendStatus(403);
    }

    User.findByIdAndUpdate(req.params.id, { $set: req.body })
        .then((user) => res.json({ msg: "updated successfully😎" }))
        .catch((err) =>
            res.status(400).json({ error: "Unable to update user" })
        );
});

module.exports = router;
module.exports.authenticateToken = authenticateToken;
