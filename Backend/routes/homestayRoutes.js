const express = require("express");

const router = express.Router();

const {
    createHomestay,
    getHomestays,
    getSingleHomestay,
    getHostHomestays,
    deleteHomestay
} = require("../controllers/homestayController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createHomestay);

router.get("/", getHomestays);

router.get("/:id", getSingleHomestay);

router.get("/host/my-stays",protect, getHostHomestays);

router.delete("/:id",protect, deleteHomestay);

module.exports = router;