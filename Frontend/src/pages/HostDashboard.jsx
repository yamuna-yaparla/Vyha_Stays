import { useEffect, useState } from "react";

import API from "../services/api";

function HostDashboard(){

    const [stays,setStays] = useState([]);

    const [formData,setFormData] = useState({

        title:"",
        description:"",
        location:"",
        price:"",
        image:""

    });

    const getHostStays = async () => {

        try{

            const res = await API.get(
                "/homestays/host/my-stays"
            );

            setStays(res.data);

        }catch(error){

            console.log(error);

        }

    };

    useEffect(() => {

        getHostStays();

    },[]);

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try{

            const res = await API.post(
                "/homestays",
                formData
            );

            alert(res.data.message);

            getHostStays();

        }catch(error){

            console.log(error);

            alert("Failed to create stay");

        }

    };

    const deleteStay = async (id) => {

        try{

            const res = await API.delete(
                `/homestays/${id}`
            );

            alert(res.data.message);

            getHostStays();

        }catch(error){

            console.log(error);

        }

    };

    return(

        <div style={{padding:"40px"}}>

            <h1>

                Host Dashboard

            </h1>

            <form
                onSubmit={handleSubmit}
                style={{
                    display:"flex",
                    flexDirection:"column",
                    gap:"15px",
                    marginTop:"30px",
                    maxWidth:"500px"
                }}
            >

                <input
                    type="text"
                    name="title"
                    placeholder="Stay Title"
                    onChange={handleChange}
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    onChange={handleChange}
                />

                <button type="submit">

                    Add Stay

                </button>

            </form>

            <hr style={{margin:"40px 0"}} />

            <h2>

                My Stays

            </h2>

            {

                stays.map((stay) => (

                    <div
                        key={stay._id}
                        style={{
                            background:"white",
                            padding:"20px",
                            marginTop:"20px",
                            borderRadius:"10px"
                        }}
                    >

                        <img
                            src={stay.image}
                            alt={stay.title}
                            style={{
                                width:"100%",
                                height:"250px",
                                objectFit:"cover",
                                borderRadius:"10px"
                            }}
                        />

                        <h2>

                            {stay.title}

                        </h2>

                        <p>

                            {stay.location}

                        </p>

                        <p>

                            ₹ {stay.price}

                        </p>

                        <button
                            onClick={() =>
                                deleteStay(stay._id)
                            }
                        >

                            Delete Stay

                        </button>

                    </div>

                ))

            }

        </div>

    );

}

export default HostDashboard;