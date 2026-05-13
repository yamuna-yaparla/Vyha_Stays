import { useEffect, useState } from "react";

import API from "../services/api";

function Support() {

    const [bookings, setBookings] = useState([]);

    const [requests, setRequests] = useState([]);

    const [formData, setFormData] = useState({

        booking: "",
        issueType: "",
        description: ""

    });

    const getBookings = async () => {

        try {

            const res = await API.get("/bookings/mybookings");

            setBookings(res.data);

        } catch(error){

            console.log(error);

        }

    };

    const getRequests = async () => {

        try {

            const res = await API.get("/support/myrequests");

            setRequests(res.data);

        } catch(error){

            console.log(error);

        }

    };

    useEffect(() => {

        getBookings();

        getRequests();

    }, []);

    const handleChange = (e) => {

        setFormData({

            ...formData,
            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const res = await API.post(

                "/support",
                formData

            );

            alert(res.data.message);

            getRequests();

        } catch(error){

            console.log(error);

            alert("Support request failed");

        }

    };

    return (

        <div>

            <h1>Support Requests</h1>

            <form onSubmit={handleSubmit}>

                <select
                    name="booking"
                    onChange={handleChange}
                >

                    <option>

                        Select Booking

                    </option>

                    {

                        bookings.map((booking) => (

                            <option
                                key={booking._id}
                                value={booking._id}
                            >

                                {booking.homestay.title}

                            </option>

                        ))

                    }

                </select>

                <br /><br />

                <select
                    name="issueType"
                    onChange={handleChange}
                >

                    <option>

                        Select Issue

                    </option>

                    <option>

                        Navigation Help

                    </option>

                    <option>

                        Pickup Assistance

                    </option>

                    <option>

                        Connectivity Problem

                    </option>

                    <option>

                        Emergency Support

                    </option>

                </select>

                <br /><br />

                <textarea
                    name="description"
                    placeholder="Describe issue"
                    onChange={handleChange}
                />

                <br /><br />

                <button type="submit">

                    Create Support Request

                </button>

            </form>

            <hr />

            <h2>My Requests</h2>

            {

                requests.map((request) => (

                    <div
                        key={request._id}
                        style={{
                            border: "1px solid black",
                            margin: "20px",
                            padding: "20px"
                        }}
                    >

                        <h3>

                            {request.issueType}

                        </h3>

                        <p>

                            {request.description}

                        </p>

                        <p>

                            Status: {request.status}

                        </p>

                        <p>

                            Homestay:
                            {" "}
                            {request.booking?.homestay?.title}

                        </p>

                    </div>

                ))

            }

        </div>

    );

}

export default Support;