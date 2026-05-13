import { useState } from "react";
import API from "../services/api";
import "./Auth.css";

function Register() {

    const [formData, setFormData] = useState({

        name: "",
        email: "",
        password: ""


    });

    const handleChange = (e) => {

        setFormData({

            ...formData,
            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const res = await API.post("/auth/register", formData);

            alert(res.data.message);

        } catch(error){

            console.log(error);

            alert("Registration failed");

        }

    };

    return (

        <div className="auth-container">

            <form  className="auth-form"
                onSubmit={handleSubmit}
            >
                <h1>Register</h1>
                <input
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    onChange={handleChange}
                />

                <br /><br />

                <button type="submit">

                    Register

                </button>

            </form>

        </div>

    );

}

export default Register;