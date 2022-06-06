// IP: 149.156.204.50

const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();
const dishes = require("./routes/api/dishes");
const reviews = require("./routes/api/reviews");
const users = require("./routes/api/users");
const orders = require("./routes/api/orders");

console.clear();

connectDB();

// const Dish = require("./models/Dish");
// const Review = require("./models/Review");

app.get("/", (req, res) => res.send("Hello world!"));

const port = process.env.PORT || 3001;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ extended: false }));

app.use("/api/dishes", dishes);
app.use("/api/reviews", reviews);
app.use("/api/users", users);
app.use("/api/orders", orders);

app.listen(port, () => console.log(`Server running on port: ${port}`));
