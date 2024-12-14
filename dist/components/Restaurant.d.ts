import React from "react";
import { FoodieRestaurant } from "../types";
interface RestaurantProps {
    restaurant: FoodieRestaurant;
    close: () => void;
    distanceMap: object;
}
declare const Restaurant: React.FC<RestaurantProps>;
export default Restaurant;
