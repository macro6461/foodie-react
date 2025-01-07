import React from "react";
import { FaSquarePhoneFlip, FaMapLocationDot, FaReply } from "react-icons/fa6";
import Reviews from "./Reviews";
import { FoodieRestaurant } from "../types";
import Error from "./Error";

// Define the type for the props
interface RestaurantProps {
  restaurant: FoodieRestaurant;
  close: () => void;
  distanceMap: object;
  height: number;
  error: string | null;
}

const Restaurant: React.FC<RestaurantProps> = ({
  restaurant,
  close,
  distanceMap,
  height,
  error,
}) => {
  const {
    url,
    international_phone_number,
    name,
    reviews,
    place_id,
    editorial_summary,
  } = restaurant;

  const strippedPhone = international_phone_number.split("-").join("");

  return (
    <div style={{ height: height - 10 + "px" }}>
      {error ? <Error error={error} /> : (
        <>
        <h2 style={{ margin: 10 }}>{name}</h2>
      <p>
        {editorial_summary.overview} ({distanceMap[place_id] + " miles away"})
      </p>
      <Reviews reviews={reviews} height={height - 230} />
      </>)}
      <div className="restaurant-footer">
        <FaReply title="Return to List" onClick={() => close()} />
        <FaSquarePhoneFlip
          title="Call Restaurant"
          onClick={() => (window.location.href = `tel:${strippedPhone}`)}
        />
        <FaMapLocationDot
          title="See on Google Maps"
          onClick={() => (window.location.href = url)}
        />
      </div>
    </div>
  );
};

export default Restaurant;
