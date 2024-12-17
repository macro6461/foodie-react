import React from "react";
import { FaSquarePhoneFlip, FaMapLocationDot, FaReply } from "react-icons/fa6";
import Reviews from "./Reviews";
import { FoodieRestaurant } from "../types";

// Define the type for the props
interface RestaurantProps {
  restaurant: FoodieRestaurant;
  close: () => void;
  distanceMap: object;
  height: number;
}

const Restaurant: React.FC<RestaurantProps> = ({
  restaurant,
  close,
  distanceMap,
  height,
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
      {" "}
      {/* make it 10px shorter than parent container to allow for margin in header without overflow.*/}
      <h2 style={{ margin: 10 }}>{name}</h2>
      <p>
        {editorial_summary.overview} ({distanceMap[place_id] + " miles away"})
      </p>
      <Reviews reviews={reviews} height={height - 230} />
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
