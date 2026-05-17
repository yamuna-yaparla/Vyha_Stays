import { FaUserCircle } from "react-icons/fa";

function Profile() {

    const userName =
    localStorage.getItem("name");

    const userEmail =
    localStorage.getItem("email");

    return (

        <div
            style={{
                minHeight:"100vh",

                background:"#f7f7f7",

                display:"flex",

                justifyContent:"center",

                alignItems:"center",

                padding:"40px"
            }}
        >

            <div
                style={{
                    background:"white",

                    padding:"40px",

                    borderRadius:"25px",

                    width:"450px",

                    boxShadow:
                    "0px 4px 20px rgba(0,0,0,0.1)",

                    textAlign:"center"
                }}
            >

                <FaUserCircle
                    style={{
                        fontSize:"120px",

                        color:"#ff385c",

                        marginBottom:"20px"
                    }}
                />

                <h1
                    style={{
                        marginBottom:"10px"
                    }}
                >

                    {userName}

                </h1>

                <p
                    style={{
                        color:"#666",

                        marginBottom:"30px"
                    }}
                >

                    {userEmail}

                </p>

                <div
                    style={{
                        textAlign:"left",

                        marginTop:"20px"
                    }}
                >

                    <h3>

                        Account Details

                    </h3>

                    <hr
                        style={{
                            margin:"15px 0"
                        }}
                    />

                    <p>

                        ✔ Verified Account

                    </p>

                    <p>

                        ✔ Secure Login Enabled

                    </p>

                    <p>

                        ✔ Booking Access Active

                    </p>

                </div>

            </div>

        </div>

    );

}

export default Profile;