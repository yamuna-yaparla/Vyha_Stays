import { Link } from "react-router-dom";

import "./Navbar.css";


function Navbar() {

    return (

        <header className="navbar">

            <div className="logo">

                Vyha Stays

            </div>

            <nav className="nav-links">

                <Link to="/">Home</Link>

                <Link to="/login">Login</Link>

                <Link to="/register">Register</Link>

                <Link to="/mybookings">

                    My Bookings

                </Link>

                <Link to="/support">

                    Contact Us

                </Link>

                <Link to="/host">

                        Host 

                </Link>


            </nav>

        </header>

    );

}

export default Navbar;