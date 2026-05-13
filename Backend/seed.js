const mongoose = require("mongoose");

const dotenv = require("dotenv");

const Homestay = require("./models/Homestay");

const homestays =
require("./data/homestays.json");

dotenv.config();

mongoose.connect(process.env.MONGO_URI)

.then(() =>
    console.log("MongoDB Connected")
)

.catch((err) =>
    console.log(err)
);

const importData = async () => {

    try {

        await Homestay.deleteMany();

        await Homestay.insertMany(homestays);

        console.log("Data Imported");

        process.exit();

    } catch(error){

        console.log(error);

        process.exit(1);

    }

};

importData();