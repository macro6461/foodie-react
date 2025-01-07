import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FaBowlFood, FaHandshakeSimple } from "react-icons/fa6";
const Splash = () => {
  return _jsxs("div", {
    className: "splash",
    children: [_jsx("h1", {
      children: "Welcome to Foodie for React!"
    }), _jsx(FaBowlFood, {
      className: "splashPizza"
    }), _jsxs("h4", {
      className: "splashSubtitle",
      children: [_jsx("span", {
        children: "Hungry"
      }), " ", _jsx(FaHandshakeSimple, {
        className: "splashHandshake"
      }), " ", _jsx("span", {
        children: "Happy"
      })]
    })]
  });
};
export default Splash;