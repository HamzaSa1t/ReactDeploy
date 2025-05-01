import React, { useState, useEffect  } from 'react';
import api from "../api";
import { useParams } from 'react-router-dom';

function StarRating() {
  const [hoverRating, setHoverRating] = useState(0);
  const { pk } = useParams(); 
  const [hasRendered, setHasRendered] = useState(false);

  const [Rating, setRating] = useState(0);
  const [displayRating, setDisplayRating] = useState(0);
  const [new_rating, setNew_rating] = useState(0);

  const [updatedRatingsCount, setUpdatedRatingsCount] = useState(0);
  const [number_of_ratings, setNumber_of_ratings] = useState(0);

  useEffect(() => {
    getNumber(pk);
    getRating(pk);
        }, []);

  useEffect(() => {
    if (!hasRendered) {
      setHasRendered(true);
      return;
    } 
  }, [new_rating]);

  const handleRatingClick = async (value) => {
    setNew_rating(value);
    const newCount = number_of_ratings + 1;
    setNumber_of_ratings(newCount);
    setUpdatedRatingsCount(newCount);
    await sendRating(value, newCount); 
    await getRating(pk); 
  };

const getNumber = async (pk) => {
    try {
        const response = await api.get(`api/products/${pk}/`);
        if (response.data) {
          setNumber_of_ratings(response.data.number_of_ratings);
        } else {
            console.error("Products not found or data is invalid");
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const getRating = async (pk) => {
  try {
      const response = await api.get(`api/products/${pk}/`);
      if (response.data) {
        setDisplayRating(response.data.rating);
      } else {
          console.error("Products not found or data is invalid");
      }
  } catch (error) {
      console.error('Error fetching data:', error);
  }
};

const sendRating = async (new_rating, newCount) => {
  try {
    const response = await api.patch(`api/products/${pk}/rate/`, {'new_rating':new_rating, 'number_of_ratings':77});
    if (response.status === 201 || response.status === 200) {
  // console.log("Rating successful", new_rating, " | ", newCount);
    } else {
     //   console.log("Failed to create product", response.status);
        alert("Failed to make product.");
    }
} catch (err) {
    console.log("Error during product creation:", err);

    if (err.response) {
    //    console.log("Response error data:", err.response.data);
     //   console.log("Response status:", err.response.status);
      //  console.log("Response headers:", err.response.headers);
    }

    if (err.request) {
        console.log("Request error:", err.request);
    }

    alert("Error occurred during product creation.");
}
}

  const handleMouseEnter = (value) => {
    setHoverRating(value);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  return (
    <div>
      <p>Rate this product</p>
      {[1, 2, 3, 4, 5].map((value) => (
        <span
          key={value}
          style={{
            color: value <= (hoverRating || displayRating) ? 'gold' : '#ddd',
            fontSize: '24px',
            cursor: 'pointer',
          }}
          onClick={() => handleRatingClick(value)}
          onMouseEnter={() => handleMouseEnter(value)}
          onMouseLeave={handleMouseLeave}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default StarRating;

