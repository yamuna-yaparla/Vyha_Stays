const SupportRequest = require("../models/SupportRequest");

const createSupportRequest = async (req, res) => {

    try {

        const {
            booking,
            issueType,
            description
        } = req.body;

        const request = await SupportRequest.create({

            tourist: req.user._id,
            booking,
            issueType,
            description

        });

        res.status(201).json({
            message: "Support request created",
            request
        });

    } catch(error){

        res.status(500).json({
            message: error.message
        });

    }

};

//support Function
const getMyRequests = async (req, res) => {

    try {

        const requests = await SupportRequest.find({

            tourist: req.user._id

        })

        .populate("tourist", "name email")
        .populate({
            path: "booking",
            populate: {
                path: "homestay"
            }
        });

        res.status(200).json(requests);

    } catch(error){

        res.status(500).json({
            message: error.message
        });

    }

};

//UPdate Support Status 
const updateSupportStatus = async (req, res) => {

    try {

        const request = await SupportRequest.findById(req.params.id);

        if(!request){

            return res.status(404).json({
                message: "Support request not found"
            });

        }

        request.status = req.body.status || request.status;

        await request.save();

        res.status(200).json({
            message: "Status updated",
            request
        });

    } catch(error){

        res.status(500).json({
            message: error.message
        });

    }

};


module.exports = {
    createSupportRequest,
    getMyRequests,
    updateSupportStatus
};