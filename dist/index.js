var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
const FoodieStyles = {
    container: {
        backgroundColor: "lightblue",
        padding: "20px",
        borderRadius: "5px",
    },
    heading: {
        color: "darkblue",
    },
};
const FoodieReact = ({ GMapsApiKey, radius = 10000, autoStart = false, environment, }) => {
    const [latitude, setLatitude] = useState(37.7749);
    const [longitude, setLongitude] = useState(-122.4194);
    const [restaurants, setRestaurants] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        initFoodieReact();
    }, []);
    const insertJsScriptElement = () => {
        const existingScript = document.querySelector(`script[src^="https://maps.googleapis.com/maps/api/js?key=${GMapsApiKey}&libraries=places"]`);
        if (!existingScript) {
            const script = document.createElement("script");
            script.src = `https://maps.googleapis.com/maps/api/js?key=${GMapsApiKey}&libraries=places`;
            script.async = true;
            script.onload = () => {
                // if (autoStart) {
                initFoodieReact();
                // }
            };
            document.body.appendChild(script);
        }
        else {
            initFoodieReact();
        }
    };
    const initFoodieReact = () => {
        if (navigator.geolocation) {
            return navigator.geolocation.getCurrentPosition((position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
                setError(null); // Clear previous errors if any
                fetchNearbyRestaurants(latitude, longitude);
            }, (err) => {
                setLoading(false);
                setError("Failed to fetch location. " + err);
                return false;
            });
        }
        else {
            setLoading(false);
            setError("Geolocation is not supported by your browser.");
            return false;
        }
    };
    const fetchNearbyRestaurants = (latitude, longitude) => __awaiter(void 0, void 0, void 0, function* () {
        const URL = environment === "development"
            ? `http://localhost:8080/api/nearbyRestaurants?latitude=${latitude}&longitude=${longitude}&radius=${radius}&apiKey=${GMapsApiKey}`
            : `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=restaurant&key=${GMapsApiKey}`;
        try {
            debugger;
            const response = yield fetch(URL);
            const data = yield response.json();
            if (data.status === "OK") {
                // Process the restaurant data here
                setLoading(false);
                setRestaurants(data.results); // This will contain the list of nearby restaurants
            }
            else {
                setLoading(false);
                setError("Error fetching data: " + data.status);
                return false;
            }
        }
        catch (error) {
            setLoading(false);
            setError("Error fetching data: " + error);
            return false;
        }
    });
    return (_jsxs("div", { style: FoodieStyles.container, children: [_jsx("h1", { style: FoodieStyles.heading, children: "Welcome to Foodie for React!" }), loading ? (_jsx("p", { children: "Fetching Restuarants..." })) : (_jsxs(_Fragment, { children: [error ? _jsxs("p", { children: ["ERROR: ", error] }) : null, restaurants.length > 0 ? (_jsx("ul", { children: restaurants.map((restaurant, index) => (_jsx("li", { children: restaurant.name }, index))) })) : (_jsx("p", { children: "No Results Found" }))] }))] }));
};
export default FoodieReact;
//# sourceMappingURL=index.js.map