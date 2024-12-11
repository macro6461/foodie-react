import React from "react";
import { FaSquarePhoneFlip, FaMapLocationDot, FaReply } from "react-icons/fa6";

interface EditorialSummary {
  overview: string;
}

interface Review {
  author_name: string;
  relative_time_description: string;
  text: string;
  rating: number;
}

interface FoodieRestaurant {
  url: string;
  name: string;
  formatted_address: string;
  international_phone_number: string;
  open_now: boolean;
  price_level: number;
  rating: number;
  reviews: Review[];
  editorial_summary: EditorialSummary;
  user_ratings_total: number;
}
// Define the type for the props
interface RestaurantProps {
  restaurant: FoodieRestaurant;
  close: () => void;
}

const Restaurant: React.FC<RestaurantProps> = ({ restaurant, close }) => {
  const { url, international_phone_number, name } = restaurant;
  const strippedPhone = international_phone_number.split("-").join("");
  debugger;
  return (
    <div>
      <h1>{name}</h1>
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
