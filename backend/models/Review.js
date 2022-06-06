const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    grade: {
        type: Number,
        required: true,
    },
    dishID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
});

module.exports = Review = mongoose.model("review", ReviewSchema);
