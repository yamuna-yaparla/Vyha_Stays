const mongoose = require("mongoose");

const supportRequestSchema = new mongoose.Schema({

    tourist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    booking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking"
    },

    issueType: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    status: {
        type: String,
        default: "Pending"
    }

}, { timestamps: true });

module.exports = mongoose.model("SupportRequest", supportRequestSchema);