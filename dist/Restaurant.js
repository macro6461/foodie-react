import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FaSquarePhoneFlip, FaMapLocationDot, FaReply } from "react-icons/fa6";
const Restaurant = _ref => {
  let {
    restaurant,
    close
  } = _ref;
  const {
    url,
    international_phone_number
  } = restaurant;
  const strippedPhone = international_phone_number.split("-").join("");
  debugger;
  return _jsxs("div", {
    children: [_jsx(FaReply, {
      title: "Return to List",
      onClick: () => close()
    }), _jsx("button", {
      onClick: () => close(),
      children: "back to results"
    }), _jsx(FaSquarePhoneFlip, {
      title: "Call Restaurant",
      onClick: () => window.location.href = "tel:".concat(strippedPhone)
    }), _jsx(FaMapLocationDot, {
      title: "See on Google Maps",
      onClick: () => window.location.href = url
    })]
  });
};
export default Restaurant;