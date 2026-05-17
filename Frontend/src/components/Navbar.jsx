import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";

import { FaUserCircle } from "react-icons/fa";

import "./Navbar.css";

import logo from "../assets/logo.png";

function Navbar() {

    const navigate = useNavigate();

    const [showMenu, setShowMenu]
    = useState(false);

    const token =
    localStorage.getItem("token");

    const logoutHandler = () => {

        localStorage.clear();

        navigate("/login");

    };

    return (

        <nav className="navbar">

            {/* LOGO */}

            <Link
                to="/"
                className="logo-container"
                >

                <img
                    src={logo}
                    alt="Vyha Stays"
                    className="logo-image"
                />

                <h1 className="logo-text">

                    Vyha Stays

                </h1>

                </Link>
            {/* NAV LINKS */}

            <div className="nav-links">

                <Link to="/">

                    Home

                </Link>

                <Link to="/mybookings">

                    My Bookings

                </Link>

                <Link to="/Support">

                    Contact Us

                </Link>

                <Link to="/host">

                        Host 

                </Link>

                {

                    !token && (

                        <>

                            <Link to="/login">

                                Login

                            </Link>

                            <Link to="/register">

                                Register

                            </Link>

                        </>

                    )

                }

            </div>

            {/* PROFILE */}

            {

                token && (

                    <div className="profile-menu">

                        <FaUserCircle
                            className="profile-icon"

                            onClick={() =>
                                setShowMenu(
                                    !showMenu
                                )
                            }
                        />

                        {

                            showMenu && (

                                <div
                                    className="dropdown"
                                >

                                    <Link
                                        to="/profile"
                                    >

                                        My Profile

                                    </Link>

                                    <Link
                                        to="/settings"
                                    >

                                        Settings

                                    </Link>

                                    <button
                                        onClick={
                                            logoutHandler
                                        }
                                    >

                                        Logout

                                    </button>

                                </div>

                            )

                        }

                    </div>

                )

            }

        </nav>

    );

}

export default Navbar;