import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import API from "../services/api";

import "./Home.css";

function Home() {

    const [homestays, setHomestays] = useState([]);

    const [search, setSearch] = useState("");

    const [maxPrice, setMaxPrice] = useState("");

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

    const filteredHomestays = homestays.filter((stay) => {

    return (

        stay.title
        .toLowerCase()
        .includes(search.toLowerCase())

        &&

        (
            maxPrice === ""

            ||

            stay.price <= Number(maxPrice)
        )

    );

});

    return (

        <div >

            <div className="search-bar" style={{
                marginBottom:"20px"
            }}
>
                <input
                    type="text"
                    placeholder="Search stays..."
                    value={search}
                    onChange={(e) =>
                    setSearch(e.target.value)
                    }
                    style={{
                    padding:"10px",
                    marginRight:"10px"
                    }}
                />

                <input
                    type="number"
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={(e) =>
                    setMaxPrice(e.target.value)
                    }
                    style={{
                    padding:"10px"
                    }}
                 />

            </div>

            {

                filteredHomestays.map((stay) => (

                    <div
                        key={stay._id}
                        style={{
                            border: "1px solid black",
                            margin: "20px",
                            padding: "20px"
                        }}
                    >

                        <h2>{stay.title}</h2>

                        <p>{stay.location}</p>

                        <p>₹ {stay.price}</p>

                        <Link to={`/homestay/${stay._id}`}>

                            View Details

                        </Link>

                    </div>

                ))

            }
            {
            filteredHomestays.length === 0 && (

           <h2>

                 No stays found

            </h2>

            )
            }

        </div>
        

        

    );

}

export default Home;