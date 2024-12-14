import React from "react";
import { Review } from "../types";
import "../index.css";
interface ReviewsProps {
    reviews: Review[];
}
declare const Reviews: React.FC<ReviewsProps>;
export default Reviews;
