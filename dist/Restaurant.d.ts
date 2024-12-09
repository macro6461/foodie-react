import React from "react";
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
interface RestaurantProps {
    restaurant: FoodieRestaurant;
    close: () => void;
}
declare const Restaurant: React.FC<RestaurantProps>;
export default Restaurant;
