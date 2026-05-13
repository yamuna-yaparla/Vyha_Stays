import { useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../services/api";

import "./Auth.css";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({

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

            const res = await API.post("/auth/login", formData);

            localStorage.setItem("token", res.data.token);
            localStorage.setItem( "role", res.data.user.role);

           alert("Login successful");

            if(res.data.user.role === "admin"){

                navigate("/admin");

            }else{

               navigate("/");

            }

        } catch(error){

            console.log(error);

            alert("Login failed");

        }

    };

    return (

        <div  className="auth-container">

            <form  className="auth-form"
                 onSubmit={handleSubmit}
            >
                <h1>Login</h1>
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

                    Login

                </button>

            </form>

        </div>

    );

}

export default Login;