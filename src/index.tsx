import React, { useEffect, useState } from "react";
import "./index.css";
import { FoodieReactProps, FoodieRestaurant } from "./types";
import Restaurant from "./Restaurant";
import FoodieList from "./FoodieList";
import { FaPizzaSlice } from "react-icons/fa6";

const FoodieReact: React.FC<FoodieReactProps> = ({
  GMapsApiKey,
  radius = 10000,
  autoStart = false,
  port = 8080,
}) => {
  const [currentRestaurant, setCurrentRestaurant] =
    useState<FoodieRestaurant | null>(null);
  const [showFoodie, setShowFoodie] = useState(false);

  let containerName = "container ";

  containerName += showFoodie ? "visible" : "hidden";

  return (
    <div className={containerName}>
      <FaPizzaSlice
        className="opener"
        onClick={() => setShowFoodie(!showFoodie)}
      />
      <h1 className="header">Welcome to Foodie for React!</h1>
      {currentRestaurant ? (
        <Restaurant
          restaurant={currentRestaurant}
          close={() => setCurrentRestaurant(null)}
        />
      ) : (
        <FoodieList
          GMapsApiKey={GMapsApiKey}
          radius={radius}
          autoStart={autoStart}
          port={port}
          setCurrentRestaurant={setCurrentRestaurant}
          currentRestaurant={currentRestaurant}
        />
      )}
    </div>
  );
};

export default FoodieReact;
