import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../services/api";

function HostDashboard() {

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    if(!token){

        alert("Please login first");

        navigate("/login");

        return null;

    }

    const [stays, setStays] = useState([]);

    const [formData, setFormData] = useState({

        title: "",

        description: "",

        location: "",

        price: "",

        hostName: "",

        image: ""

    });

    const getHostStays = async () => {

        try {

            const res = await API.get(

                "/homestays"

            );

            setStays(res.data);

        } catch(error){

            console.log(error);

        }

    };

    useEffect(() => {

        getHostStays();

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

                "/homestays",

                formData

            );

            alert("Stay added successfully");

            console.log(res.data);

            setFormData({

                title: "",

                description: "",

                location: "",

                price: "",

                hostName: "",

                image: ""

            });

            getHostStays();

        } catch(error){

            console.log(error);

            alert("Failed to add stay");

        }

    };

    const deleteStay = async (id) => {

        try {

            const res = await API.delete(

                `/homestays/${id}`

            );

            alert(res.data.message);

            getHostStays();

        } catch(error){

            console.log(error);

            alert("Delete failed");

        }

    };

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

                Host Dashboard

            </h1>

            {/* FORM */}

            <form
                onSubmit={handleSubmit}
                style={{
                    background:"white",

                    padding:"30px",

                    borderRadius:"20px",

                    boxShadow:
                    "0px 4px 15px rgba(0,0,0,0.1)",

                    display:"flex",

                    flexDirection:"column",

                    gap:"15px",

                    maxWidth:"600px",

                    marginBottom:"50px"
                }}
            >

                <input
                    type="text"
                    name="title"
                    placeholder="Stay Title"
                    value={formData.title}
                    onChange={handleChange}
                    style={inputStyle}
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    style={textareaStyle}
                />

                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                    style={inputStyle}
                />

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                    style={inputStyle}
                />

                <input
                    type="text"
                    name="hostName"
                    placeholder="Host Name"
                    value={formData.hostName}
                    onChange={handleChange}
                    style={inputStyle}
                />

                <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    value={formData.image}
                    onChange={handleChange}
                    style={inputStyle}
                />

                <button
                    type="submit"
                    style={buttonStyle}
                >

                    Add Stay

                </button>

            </form>

            {/* STAYS */}

            <h2
                style={{
                    marginBottom:"20px"
                }}
            >

                Added Homestays

            </h2>

            <div
                style={{
                    display:"grid",

                    gridTemplateColumns:
                    "repeat(auto-fit,minmax(300px,1fr))",

                    gap:"25px"
                }}
            >

                {

                    stays.map((stay) => (

                        <div
                            key={stay._id}
                            style={{
                                background:"white",

                                borderRadius:"20px",

                                overflow:"hidden",

                                boxShadow:
                                "0px 4px 15px rgba(0,0,0,0.1)"
                            }}
                        >

                            <img
                                src={stay.image}
                                alt={stay.title}
                                style={{
                                    width:"100%",

                                    height:"240px",

                                    objectFit:"cover"
                                }}
                            />

                            <div
                                style={{
                                    padding:"20px"
                                }}
                            >

                                <h2>

                                    {stay.title}

                                </h2>

                                <p>

                                    📍 {stay.location}

                                </p>

                                <p>

                                    ₹ {stay.price}/night

                                </p>

                                <p>

                                    Host:
                                    {" "}
                                    {stay.hostName}

                                </p>

                                <button
                                    onClick={() =>
                                        deleteStay(stay._id)
                                    }
                                    style={{
                                        marginTop:"15px",

                                        padding:
                                        "12px 20px",

                                        border:"none",

                                        borderRadius:"10px",

                                        background:"#ff385c",

                                        color:"white",

                                        cursor:"pointer"
                                    }}
                                >

                                    Delete Stay

                                </button>

                            </div>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}

/* INPUT STYLE */

const inputStyle = {

    padding:"14px",

    border:"1px solid #ddd",

    borderRadius:"10px",

    fontSize:"16px"

};

/* TEXTAREA STYLE */

const textareaStyle = {

    padding:"14px",

    border:"1px solid #ddd",

    borderRadius:"10px",

    fontSize:"16px",

    minHeight:"120px",

    resize:"none"

};

/* BUTTON STYLE */

const buttonStyle = {

    padding:"14px",

    border:"none",

    borderRadius:"10px",

    background:
    "linear-gradient(135deg,#ff385c,#ff6b81)",

    color:"white",

    fontSize:"16px",

    fontWeight:"bold",

    cursor:"pointer"

};

export default HostDashboard;