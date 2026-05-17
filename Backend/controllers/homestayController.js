const Homestay = require("../models/Homestay");

const createHomestay = async (req, res) => {

    try {

        const {
            title,
            description,
            location,
            price,
            image,
            hostName
        } = req.body;

        const homestay = await Homestay.create({

            title,
            description,
            location,
            price,
            image,

            host: req.user._id

        });

        res.status(201).json({
            message: "Homestay created",
            homestay
        });

    } catch(error){

        res.status(500).json({
            message: error.message
        });

    }

};

//Homestay function
const getHomestays = async (req, res) => {

    try {

        const homestays = await Homestay.find()
        .populate("host", "name email");

        res.status(200).json(homestays);

    } catch(error){

        res.status(500).json({
            message: error.message
        });

    }

};


//single Homestays
const getSingleHomestay = async (req, res) => {

    try {

        const homestay = await Homestay.findById(req.params.id)
        .populate("host", "name email");

        if(!homestay){

            return res.status(404).json({
                message: "Homestay not found"
            });

        }

        res.status(200).json(homestay);

    } catch(error){

        res.status(500).json({
            message: error.message
        });

    }

};

//HostHomestay
const getHostHomestays = async (req,res) => {

    try{

        const stays = await Homestay.find({

            host:req.user._id

        });

        res.status(200).json(stays);

    }catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};

//Delete Homestay
const deleteHomestay = async (req,res) => {

    try{

        const stay = await Homestay.findById(
            req.params.id
        );

        if(!stay){

            return res.status(404).json({

                message:"Stay not found"

            });

        }

        await stay.deleteOne();

        res.status(200).json({

            message:"Stay deleted"

        });

    }catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};

module.exports = {
    createHomestay,
    getHomestays,
    getSingleHomestay,
    getHostHomestays,
    deleteHomestay

};