import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import "./index.css";
import Restaurant from "./Restaurant.js";
import FoodieList from "./FoodieList.js";
import { FaPizzaSlice } from "react-icons/fa6";
const FoodieReact = _ref => {
  let {
    GMapsApiKey,
    radius = 10000,
    autoStart = false,
    port = 8080
  } = _ref;
  const [currentRestaurant, setCurrentRestaurant] = useState(null);
  const [showFoodie, setShowFoodie] = useState(false);
  let containerName = "container ";
  containerName += showFoodie ? "visible" : "hidden";
  return _jsxs("div", {
    className: containerName,
    children: [_jsx(FaPizzaSlice, {
      className: "opener",
      onClick: () => setShowFoodie(!showFoodie)
    }), _jsx("h1", {
      className: "header",
      children: "Welcome to Foodie for React!"
    }), currentRestaurant ? _jsx(Restaurant, {
      restaurant: currentRestaurant,
      close: () => setCurrentRestaurant(null)
    }) : _jsx(FoodieList, {
      GMapsApiKey: GMapsApiKey,
      radius: radius,
      autoStart: autoStart,
      port: port,
      setCurrentRestaurant: setCurrentRestaurant,
      currentRestaurant: currentRestaurant
    })]
  });
};
export default FoodieReact;