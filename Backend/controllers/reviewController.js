const Review = require("../models/Review");

const createReview = async (req, res) => {

    try {

        const {
            homestay,
            rating,
            comment
        } = req.body;

        const review = await Review.create({

            user: req.user._id,

            homestay,

            rating,

            comment

        });

        res.status(201).json({

            message: "Review added",

            review

        });

    } catch(error){

        res.status(500).json({

            message: error.message

        });

    }

};

const getReviews = async (req, res) => {

    try {

        const reviews = await Review.find({

            homestay: req.params.id

        }).populate("user", "name");

        res.status(200).json(reviews);

    } catch(error){

        res.status(500).json({

            message: error.message

        });

    }

};

module.exports = {

    createReview,
    getReviews

};