import { useEffect, useState } from "react";

import API from "../services/api";

function AdminDashboard() {

    const [users, setUsers] = useState([]);

    const [bookings, setBookings] = useState([]);

    const [homestays, setHomestays] = useState([]);

    const getUsers = async () => {

        try {

            const res = await API.get("/admin/users");

            setUsers(res.data);

        } catch(error){

            console.log(error);

        }

    };

    const getBookings = async () => {

        try {

            const res = await API.get("/admin/bookings");

            setBookings(res.data);

        } catch(error){

            console.log(error);

        }

    };

    const getHomestays = async () => {

        try {

            const res = await API.get("/homestays");

            setHomestays(res.data);

        } catch(error){

            console.log(error);

        }

    };

    useEffect(() => {

        getUsers();

        getBookings();

        getHomestays();

    }, []);

    return (

        <div
            style={{
                padding:"40px",
                background:"#f7f7f7",
                minHeight:"100vh"
            }}
        >

            <h1
                style={{
                    marginBottom:"30px",
                    color:"#ff385c"
                }}
            >

                Admin Dashboard

            </h1>

            {/* STATS */}

            <div
                style={{
                    display:"grid",
                    gridTemplateColumns:
                    "repeat(auto-fit,minmax(250px,1fr))",
                    gap:"20px",
                    marginBottom:"40px"
                }}
            >

                <div
                    style={{
                        background:"white",
                        padding:"30px",
                        borderRadius:"15px",
                        boxShadow:
                        "0px 4px 10px rgba(0,0,0,0.1)"
                    }}
                >

                    <h2>Total Users</h2>

                    <h1>{users.length}</h1>

                </div>

                <div
                    style={{
                        background:"white",
                        padding:"30px",
                        borderRadius:"15px",
                        boxShadow:
                        "0px 4px 10px rgba(0,0,0,0.1)"
                    }}
                >

                    <h2>Total Bookings</h2>

                    <h1>{bookings.length}</h1>

                </div>

                <div
                    style={{
                        background:"white",
                        padding:"30px",
                        borderRadius:"15px",
                        boxShadow:
                        "0px 4px 10px rgba(0,0,0,0.1)"
                    }}
                >

                    <h2>Total Stays</h2>

                    <h1>{homestays.length}</h1>

                </div>

            </div>

            {/* USERS */}

            <div
                style={{
                    background:"white",
                    padding:"30px",
                    borderRadius:"15px",
                    marginBottom:"40px"
                }}
            >

                <h2
                    style={{
                        marginBottom:"20px"
                    }}
                >

                    Registered Users

                </h2>

                {

                    users.map((user) => (

                        <div
                            key={user._id}
                            style={{
                                padding:"15px",
                                borderBottom:
                                "1px solid #ddd"
                            }}
                        >

                            <h3>

                                {user.name}

                            </h3>

                            <p>

                                {user.email}

                            </p>

                        </div>

                    ))

                }

            </div>

            {/* BOOKINGS */}

            <div
                style={{
                    background:"white",
                    padding:"30px",
                    borderRadius:"15px",
                    marginBottom:"40px"
                }}
            >

                <h2
                    style={{
                        marginBottom:"20px"
                    }}
                >

                    Recent Bookings

                </h2>

                {

                    bookings.map((booking) => (

                        <div
                            key={booking._id}
                            style={{
                                padding:"15px",
                                borderBottom:
                                "1px solid #ddd"
                            }}
                        >

                            <h3>

                                {booking.homestay?.title}

                            </h3>

                            <p>

                                Guest:
                                {" "}
                                {booking.tourist?.name}

                            </p>

                            <p>

                                ₹ {booking.totalPrice}

                            </p>

                        </div>

                    ))

                }

            </div>

            {/* STAYS */}

            <div
                style={{
                    background:"white",
                    padding:"30px",
                    borderRadius:"15px"
                }}
            >

                <h2
                    style={{
                        marginBottom:"20px"
                    }}
                >

                    All Homestays

                </h2>

                <div
                    style={{
                        display:"grid",
                        gridTemplateColumns:
                        "repeat(auto-fit,minmax(300px,1fr))",
                        gap:"20px"
                    }}
                >

                    {

                        homestays.map((stay) => (

                            <div
                                key={stay._id}
                                style={{
                                    background:"#fafafa",
                                    borderRadius:"15px",
                                    overflow:"hidden"
                                }}
                            >

                                <img
                                    src={stay.image}
                                    alt={stay.title}
                                    style={{
                                        width:"100%",
                                        height:"220px",
                                        objectFit:"cover"
                                    }}
                                />

                                <div
                                    style={{
                                        padding:"20px"
                                    }}
                                >

                                    <h3>

                                        {stay.title}

                                    </h3>

                                    <p>

                                        📍 {stay.location}

                                    </p>

                                    <p>

                                        ₹ {stay.price}/night

                                    </p>

                                </div>

                            </div>

                        ))

                    }

                </div>

            </div>

        </div>

    );

}

export default AdminDashboard;