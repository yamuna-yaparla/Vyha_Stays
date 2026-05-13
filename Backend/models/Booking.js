const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({

    tourist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    homestay: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Homestay"
    },

    fromDate: {
        type: Date,
        required: true
    },

    toDate: {
        type: Date,
        required: true
    },

    totalPrice: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        default: "Booked"
    }

}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);