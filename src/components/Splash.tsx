import React from "react";
import { FaPizzaSlice, FaHandshakeSimple } from "react-icons/fa6";

const Splash = () => {
  return (
    <div className="splash">
      <h1>Welcome to Foodie for React!</h1>
      <FaPizzaSlice className="splashPizza" />
      <h4 className="splashSubtitle">
        <span>Hungry</span> <FaHandshakeSimple className="splashHandshake" />{" "}
        <span>Happy</span>
      </h4>
    </div>
  );
};

export default Splash;
