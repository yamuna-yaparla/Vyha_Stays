import { useEffect, useState } from "react";

import API from "../services/api";

function MyBookings() {

    const [bookings, setBookings] = useState([]);

    const getBookings = async () => {

        try {

            const res = await API.get("/bookings/mybookings");

            setBookings(res.data);

        } catch(error){

            console.log(error);

        }

    };

    useEffect(() => {

        getBookings();

    }, []);

    const cancelBooking = async (id) => {

        try {

            const res = await API.delete(`/bookings/${id}`);

            alert(res.data.message);

            getBookings();

        } catch(error){

            console.log(error);

        }

    };

    return (

        <div>

            <h1>My Bookings</h1>

            {

                bookings.map((booking) => (

                    <div
                        key={booking._id}
                        style={{
                            border: "1px solid black",
                            margin: "20px",
                            padding: "20px"
                        }}
                    >

                        <h2>

                            {booking.homestay.title}

                        </h2>

                        <p>

                            {booking.homestay.location}

                        </p>

                        <p>

                            ₹ {booking.totalPrice}

                        </p>

                        <p>

                            {booking.status}

                        </p>

                        <button
                            onClick={() =>
                                cancelBooking(booking._id)
                            }
                        >

                            Cancel Booking

                        </button>

                    </div>

                ))

            }

        </div>

    );

}

export default MyBookings;