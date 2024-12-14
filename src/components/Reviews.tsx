import React, { useEffect, useState } from "react";
import { Review } from "../types";
import { FaStar } from "react-icons/fa6";
import "../index.css";
interface ReviewsProps {
  reviews: Review[];
}

const Reviews: React.FC<ReviewsProps> = ({ reviews }) => {
  const [openedReview, setOpenedReview] = useState(-1);

  const handleOpenedReview = (index: number) => {
    if (index === openedReview) {
      setOpenedReview(-1);
    } else {
      setOpenedReview(index);
    }
  };

  return (
    <div className="reviewsContainer">
      <h3>{reviews.length || "No"} Reviews</h3>
      <div>
        {reviews.length > 0 ? (
          <div>
            {reviews.map((review: Review, i: number) => {
              const { author_name, relative_time_description, rating, text } =
                review;
              let reviewClassName = "reviewText";
              reviewClassName += i === openedReview ? " open" : " closed";
              return (
                <div key={i}>
                  <p className="authorP">
                    <span>Author: {author_name}</span>
                    <span>{relative_time_description}</span>
                  </p>
                  <p>
                    Rating: {rating} <FaStar color="yellow" />
                  </p>
                  <button onClick={() => handleOpenedReview(i)}>
                    See Review
                  </button>
                  <p className={reviewClassName}>{text}</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Reviews;
