import { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import API from "../services/api";

import "./HomestayDetails.css";

function HomestayDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [homestay, setHomestay] = useState(null);

    const [reviews, setReviews] = useState([]);

    const [showBookingForm, setShowBookingForm]
    = useState(false);

    const [showReviewForm, setShowReviewForm]
    = useState(false);

    const [bookingData, setBookingData] = useState({

        fromDate: "",
        toDate: "",
        totalPrice: ""

    });

    const [reviewData, setReviewData] = useState({

        rating: "",
        comment: ""

    });

    const getSingleHomestay = async () => {

        try {

            const res = await API.get(

                `/homestays/${id}`
            );

            setHomestay(res.data);

        } catch(error){

            console.log(error);

        }

    };

    const getReviews = async () => {

        try {

            const res = await API.get(

                `/reviews/${id}`
            );

            setReviews(res.data);

        } catch(error){

            console.log(error);

        }

    };

    useEffect(() => {

        getSingleHomestay();

        getReviews();

    }, []);

    const handleChange = (e) => {

        setBookingData({

            ...bookingData,

            [e.target.name]: e.target.value

        });

    };

    const handleReviewChange = (e) => {

        setReviewData({

            ...reviewData,

            [e.target.name]: e.target.value

        });

    };

    const handleBooking = async (e) => {

        e.preventDefault();

        try {

            const bookingPayload = {

                homestay: id,

                fromDate: bookingData.fromDate,

                toDate: bookingData.toDate,

                totalPrice: bookingData.totalPrice

            };

            const res = await API.post(

                "/bookings",
                bookingPayload

            );

            alert(res.data.message);

            navigate("/mybookings");

        } catch(error){

            console.log(error);

            alert("Booking failed");

        }

    };

    const submitReview = async (e) => {

        e.preventDefault();

        try {

            const payload = {

                homestay: id,

                rating: reviewData.rating,

                comment: reviewData.comment

            };

            const res = await API.post(

                "/reviews",
                payload

            );

            alert(res.data.message);

            getReviews();

            setReviewData({

                rating: "",
                comment: ""

            });

            setShowReviewForm(false);

        } catch(error){

            console.log(error);

            alert("Review failed");

        }

    };

    if(!homestay){

        return <h1>Loading...</h1>;

    }

    return (

        <div className="details-container">
            <div className="details-image-container">
                <img  className="details-image" src={homestay.image} />
            </div>
            

            <div className="details-content">

                <h1>{homestay.title}</h1>

                <p>📍 {homestay.location}</p>

                <p>₹ {homestay.price}/night</p>

                <p>{homestay.description}</p>

                <p>

                    Host: {homestay.hostName}

                </p>

                <button
                    className="action-btn"
                    onClick={() =>
                        setShowBookingForm(
                            !showBookingForm
                        )
                    }
                >

                    Book Now

                </button>

                {

                    showBookingForm && (

                        <form
                            className="booking-form"
                            onSubmit={handleBooking}
                        >

                            <input
                                type="date"
                                name="fromDate"
                                onChange={handleChange}
                            />

                            <input
                                type="date"
                                name="toDate"
                                onChange={handleChange}
                            />

                            <input
                                type="number"
                                name="totalPrice"
                                placeholder="Total Price"
                                onChange={handleChange}
                            />

                            <button type="submit">

                                Confirm Booking

                            </button>

                        </form>

                    )

                }

                <hr className="divider" />

                <div className="review-header">

                    <h2>

                        Reviews & Ratings

                    </h2>

                    <button
                        className="action-btn"
                        onClick={() =>
                            setShowReviewForm(
                                !showReviewForm
                            )
                        }
                    >

                        Add Review

                    </button>

                </div>

                {

                    showReviewForm && (

                        <form
                            className="booking-form"
                            onSubmit={submitReview}
                        >

                            <input
                                type="number"
                                name="rating"
                                placeholder="Rating (1-5)"
                                value={reviewData.rating}
                                onChange={
                                    handleReviewChange
                                }
                            />

                            <textarea
                                name="comment"
                                placeholder="Write review"
                                value={reviewData.comment}
                                onChange={
                                    handleReviewChange
                                }
                            />

                            <button type="submit">

                                Submit Review

                            </button>

                        </form>

                    )

                }

                {

                    reviews.length === 0 ? (

                        <p className="no-review">

                            No reviews yet

                        </p>

                    ) : (

                        reviews.map((review) => (

                            <div
                                className="review-card"
                                key={review._id}
                            >

                                <h3>

                                    ⭐ {review.rating}/5

                                </h3>

                                <p>

                                    {review.comment}

                                </p>

                                <small>

                                    By {review.user?.name}

                                </small>

                            </div>

                        ))

                    )

                }

            </div>

        </div>

    );

}

export default HomestayDetails;