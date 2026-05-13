const Booking = require("../models/Booking");

const createBooking = async (req, res) => {

    try {

        const {
            homestay,
            fromDate,
            toDate,
            totalPrice
        } = req.body;

        const booking = await Booking.create({

            tourist: req.user._id,
            homestay,
            fromDate,
            toDate,
            totalPrice

        });

        res.status(201).json({
            message: "Booking successful",
            booking
        });

    } catch(error){

        res.status(500).json({
            message: error.message
        });

    }

};

//Create Booking
const getMyBookings = async (req, res) => {

    try {

        const bookings = await Booking.find({

            tourist: req.user._id

        })

        .populate("homestay")
        .populate("tourist", "name email");

        res.status(200).json(bookings);

    } catch(error){

        res.status(500).json({
            message: error.message
        });

    }

};


//cancel Booking
const cancelBooking = async (req, res) => {

    try {

        const booking = await Booking.findById(req.params.id);

        if(!booking){

            return res.status(404).json({
                message: "Booking not found"
            });

        }

        await booking.deleteOne();

        res.status(200).json({
            message: "Booking cancelled"
        });

    } catch(error){

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    createBooking,
    getMyBookings,
    cancelBooking
};