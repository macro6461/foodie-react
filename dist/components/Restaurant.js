import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FaSquarePhoneFlip, FaMapLocationDot, FaReply } from "react-icons/fa6";
import Reviews from "./Reviews.js";
const Restaurant = _ref => {
  let {
    restaurant,
    close,
    distanceMap,
    height
  } = _ref;
  const {
    url,
    international_phone_number,
    name,
    reviews,
    place_id,
    editorial_summary
  } = restaurant;
  const strippedPhone = international_phone_number.split("-").join("");
  return _jsxs("div", {
    style: {
      height: height - 10 + "px"
    },
    children: [" ", _jsx("h2", {
      style: {
        margin: 10
      },
      children: name
    }), _jsxs("p", {
      children: [editorial_summary.overview, " (", distanceMap[place_id] + " miles away", ")"]
    }), _jsx(Reviews, {
      reviews: reviews,
      height: height - 230
    }), _jsxs("div", {
      className: "restaurant-footer",
      children: [_jsx(FaReply, {
        title: "Return to List",
        onClick: () => close()
      }), _jsx(FaSquarePhoneFlip, {
        title: "Call Restaurant",
        onClick: () => window.location.href = "tel:".concat(strippedPhone)
      }), _jsx(FaMapLocationDot, {
        title: "See on Google Maps",
        onClick: () => window.location.href = url
      })]
    })]
  });
};
export default Restaurant;