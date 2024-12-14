import React from "react";
import { FaSquarePhoneFlip, FaMapLocationDot, FaReply } from "react-icons/fa6";
import Reviews from "./Reviews";
import { FoodieRestaurant, Review, EditorialSummary } from "../types";

// Define the type for the props
interface RestaurantProps {
  restaurant: FoodieRestaurant;
  close: () => void;
  distanceMap: object;
}

const Restaurant: React.FC<RestaurantProps> = ({
  restaurant,
  close,
  distanceMap,
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
  debugger;
  return (
    <div>
      <h1>
        {name} ({distanceMap[place_id] + " miles away"})
      </h1>
      <p>{editorial_summary.overview}</p>
      <Reviews reviews={reviews} />
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
