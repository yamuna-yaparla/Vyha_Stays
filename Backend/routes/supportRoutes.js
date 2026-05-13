const express = require("express");

const router = express.Router();

const {
    createSupportRequest,
    getMyRequests,
    updateSupportStatus
} = require("../controllers/supportController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createSupportRequest);

router.get("/myrequests", protect, getMyRequests);

router.put("/:id", protect, updateSupportStatus);

module.exports = router;