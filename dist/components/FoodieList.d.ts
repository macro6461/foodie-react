import React from "react";
import { FoodieReactProps, FoodieRestaurant } from "../types";
import { LatLong } from "../types";
interface FoodieListProps {
    setCurrentRestaurant: React.Dispatch<React.SetStateAction<FoodieRestaurant>>;
    distanceToAndFromHaversine: (start: LatLong, stop: LatLong, placeId: string) => number;
    latitude: number | null;
    longitude: number | null;
    setError: React.Dispatch<React.SetStateAction<string>>;
    hide: boolean;
    error: string | null;
}
declare const FoodieList: React.FC<FoodieListProps & FoodieReactProps>;
export default FoodieList;
