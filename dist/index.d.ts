import React from "react";
interface FoodieReactProps {
    GMapsApiKey: string;
    radius?: number;
    autoStart?: boolean;
    environment: string;
}
declare const FoodieReact: React.FC<FoodieReactProps>;
export default FoodieReact;
