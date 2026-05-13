const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    homestay: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Homestay"
    },

    rating: {
        type: Number,
        required: true
    },

    comment: {
        type: String,
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model(
    "Review",
    reviewSchema
);