import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import API from "../services/api";

import "./Home.css";

function Home() {

    const [homestays, setHomestays] = useState([]);

    const getHomestays = async () => {

        try {

            const res = await API.get("/homestays");

            setHomestays(res.data);

        } catch(error){

            console.log(error);

        }

    };

    useEffect(() => {

        getHomestays();

    }, []);

    // GROUP STAYS BY LOCATION

    const groupedStays = homestays.reduce(

        (groups, stay) => {

            const location = stay.location;

            if(!groups[location]){

                groups[location] = [];

            }

            groups[location].push(stay);

            return groups;

        },

        {}

    );

    return (

        <div className="home-container">

            <div className="hero">

                <div className="hero-content">

                    <h1>

                        Find Your Perfect Stay

                    </h1>

                    <p>

                        Explore stays across India

                    </p>

                </div>

            </div>

            {

                Object.keys(groupedStays).map(

                    (place) => (

                        <div
                            key={place}
                            className="place-section"
                        >

                            <h1 className="place-title">

                                {place}

                            </h1>

                            <div className="place-cards">

                                {

                                    groupedStays[place].map(

                                        (stay) => (

                                            <div
                                                key={stay._id}
                                                className="stay-card"
                                            >

                                                <img
                                                    src={
                                                        stay.image ||

                                                        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
                                                    }

                                                    alt={stay.title}
                                                />

                                                <div
                                                    className="stay-content"
                                                >

                                                    <h2>

                                                        {stay.title}

                                                    </h2>

                                                    <p>

                                                        ₹ {stay.price}/night

                                                    </p>

                                                    <Link
                                                        to={`/homestay/${stay._id}`}
                                                    >

                                                        View Details

                                                    </Link>

                                                </div>

                                            </div>

                                        )

                                    )

                                }

                            </div>

                        </div>

                    )

                )

            }

        </div>

    );

}

export default Home;