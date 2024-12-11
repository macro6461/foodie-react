import React from "react";
import { FoodieReactProps, FoodieRestaurant } from "./types";
interface FoodieListProps {
    setCurrentRestaurant: React.Dispatch<React.SetStateAction<FoodieRestaurant>>;
    currentRestaurant: FoodieRestaurant;
}
declare const FoodieList: React.FC<FoodieListProps & FoodieReactProps>;
export default FoodieList;
