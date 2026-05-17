import { useState } from "react";

function Settings() {

    const [darkMode, setDarkMode]
    = useState(false);

    const toggleDarkMode = () => {

        setDarkMode(!darkMode);

    };

    return (

        <div
            style={{
                minHeight:"100vh",

                background:
                darkMode
                ? "#111"
                : "#f7f7f7",

                color:
                darkMode
                ? "white"
                : "#222",

                padding:"50px"
            }}
        >

            <div
                style={{
                    background:
                    darkMode
                    ? "#222"
                    : "white",

                    maxWidth:"700px",

                    margin:"auto",

                    padding:"40px",

                    borderRadius:"25px",

                    boxShadow:
                    "0px 4px 20px rgba(0,0,0,0.1)"
                }}
            >

                <h1
                    style={{
                        marginBottom:"30px"
                    }}
                >

                    Settings

                </h1>

                {/* DARK MODE */}

                <div
                    style={{
                        display:"flex",

                        justifyContent:
                        "space-between",

                        alignItems:"center",

                        marginBottom:"30px"
                    }}
                >

                    <div>

                        <h3>

                            Dark Mode

                        </h3>

                        <p>

                            Enable dark theme

                        </p>

                    </div>

                    <button
                        onClick={toggleDarkMode}

                        style={{
                            padding:"12px 20px",

                            border:"none",

                            borderRadius:"10px",

                            background:"#ff385c",

                            color:"white",

                            cursor:"pointer"
                        }}
                    >

                        {

                            darkMode
                            ? "Disable"
                            : "Enable"

                        }

                    </button>

                </div>

                {/* NOTIFICATIONS */}

                <div
                    style={{
                        marginBottom:"30px"
                    }}
                >

                    <h3>

                        Notifications

                    </h3>

                    <p>

                        Booking and stay alerts enabled

                    </p>

                </div>

                {/* SECURITY */}

                <div>

                    <h3>

                        Security

                    </h3>

                    <p>

                        Your account is protected

                    </p>

                </div>

            </div>

        </div>

    );

}

export default Settings;