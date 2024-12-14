import React from "react";
import { FoodieReactProps, FoodieRestaurant } from "../types";
import { LatLong } from "../types";
interface FoodieListProps {
    setCurrentRestaurant: React.Dispatch<React.SetStateAction<FoodieRestaurant>>;
    currentRestaurant: FoodieRestaurant;
    distanceToAndFromHaversine: (start: LatLong, stop: LatLong, placeId: string) => number;
    latitude: number;
    longitude: number;
    setError: React.Dispatch<React.SetStateAction<string>>;
}
declare const FoodieList: React.FC<FoodieListProps & FoodieReactProps>;
export default FoodieList;
