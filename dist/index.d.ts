import React from "react";
import "./index.css";
interface FoodieReactProps {
    GMapsApiKey: string;
    radius?: number;
    autoStart?: boolean;
    port?: number;
}
declare const FoodieReact: React.FC<FoodieReactProps>;
export default FoodieReact;
