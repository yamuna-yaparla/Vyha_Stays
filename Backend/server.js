const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const authRoutes = require("./routes/authRoutes");
const homestayRoutes = require("./routes/homestayRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const supportRoutes = require("./routes/supportRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

const app = express();

app.use(cors());
app.use(express.json());

const port = 8000;
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

app.use("/api/auth", authRoutes);
app.use("/api/homestays", homestayRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/support", supportRoutes);
app.use("/api/reviews", reviewRoutes);

app.get("/",(req,res)=>{
    res.send("Server is working well");
});

app.get("/test", (req, res) => {
   res.send("working");
});

app.listen(port,()=>{
    console.log(`app is listening at ${port}`);
});