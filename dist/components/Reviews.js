import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { FaStar } from "react-icons/fa6";
import "../index.css";
const Reviews = _ref => {
  let {
    reviews,
    height
  } = _ref;
  const [openedReview, setOpenedReview] = useState(-1);
  const handleOpenedReview = index => {
    if (index === openedReview) {
      setOpenedReview(-1);
    } else {
      setOpenedReview(index);
    }
  };
  return _jsxs("div", {
    className: "reviewsContainer",
    children: [_jsxs("h3", {
      style: {
        marginBottom: 0
      },
      children: [reviews.length || "No", " Reviews"]
    }), _jsx("div", {
      className: "reviewsInnerContainer",
      style: {
        height
      },
      children: reviews.length > 0 ? _jsx(_Fragment, {
        children: reviews.map((review, i) => {
          const {
            author_name,
            relative_time_description,
            rating,
            text
          } = review;
          let reviewClassName = "reviewText";
          reviewClassName += i === openedReview ? " open" : " closed";
          return _jsxs("div", {
            children: [_jsxs("p", {
              className: "authorP",
              children: [_jsxs("span", {
                children: ["Author: ", author_name]
              }), _jsx("span", {
                children: relative_time_description
              })]
            }), _jsxs("p", {
              children: ["Rating: ", rating, " ", _jsx(FaStar, {
                className: "ratingStar"
              })]
            }), _jsx("button", {
              onClick: () => handleOpenedReview(i),
              children: "See Review"
            }), _jsx("p", {
              className: reviewClassName,
              children: text
            })]
          }, i);
        })
      }) : null
    })]
  });
};
export default Reviews;