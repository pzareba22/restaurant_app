const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    dishID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
});

module.exports = Order = mongoose.model("order", OrderSchema);
