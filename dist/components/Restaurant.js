import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { FaSquarePhoneFlip, FaMapLocationDot, FaReply } from "react-icons/fa6";
import Reviews from "./Reviews.js";
const Restaurant = _ref => {
  let {
    restaurant,
    close,
    distanceMap
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
  debugger;
  return _jsxs("div", {
    children: [_jsxs("h1", {
      children: [name, " (", distanceMap[place_id] + " miles away", ")"]
    }), _jsx("p", {
      children: editorial_summary.overview
    }), _jsx(Reviews, {
      reviews: reviews
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