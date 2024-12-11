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
import "./index.css";
import dummyData from "./dummy.json";
const FoodieReact = ({ GMapsApiKey, radius = 10000, autoStart = false, port = 8080, }) => {
    const [textSearch, setTextSearch] = useState("");
    const [latitude, setLatitude] = useState(37.7749);
    const [longitude, setLongitude] = useState(-122.4194);
    const [restaurants, setRestaurants] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentRestaurant, setCurrentRestaurant] = useState(null);
    const [showFoodie, setShowFoodie] = useState(false);
    useEffect(() => {
        initFoodieReact();
    }, []);
    const initFoodieReact = () => {
        if (navigator.geolocation) {
            return navigator.geolocation.getCurrentPosition((position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
                setError(null); // Clear previous errors if any
                if (autoStart) {
                    fetchNearbyRestaurantsDummy(position.coords.latitude, position.coords.longitude);
                }
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
    const fetchNearbyRestaurants = (lat, long) => __awaiter(void 0, void 0, void 0, function* () {
        setLoading(true);
        let thisLat = lat || latitude;
        let thisLong = long || longitude;
        const URL = process.env.NODE_ENV === "development"
            ? `http://localhost:${port}/foodie/getAll?latitude=${thisLat}&longitude=${thisLong}&radius=${radius}&type=restaurant&keyword=${encodeURIComponent(textSearch)}&key=${GMapsApiKey}`
            : `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${thisLat},${thisLong}&radius=${radius}&type=restaurant&keyword=${encodeURIComponent(textSearch)}&key=${GMapsApiKey}`;
        try {
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
    const getRestaurantInfo = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const URL = process.env.NODE_ENV === "development"
            ? `http://localhost:${port}/foodie/getRestaurant?place/details/json?placeid=${id}}&key=${GMapsApiKey}`
            : `https://maps.googleapis.com/maps/api/place/details/json?placeid=${id}}&key=${GMapsApiKey}`;
        try {
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
    const fetchNearbyRestaurantsDummy = (lat, long) => __awaiter(void 0, void 0, void 0, function* () {
        setRestaurants(dummyData.all_restuarants.results);
        setLoading(false);
    });
    const getRestaurantInfoDummy = (id) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(dummyData.restuarant_result.result);
        setCurrentRestaurant(dummyData.restuarant_result.result);
        setLoading(false);
    });
    const handleChange = (e) => {
        setTextSearch(e.target.value);
    };
    let containerName = "container ";
    containerName += showFoodie ? "visible" : "hidden";
    return (_jsxs("div", { className: containerName, children: [_jsx("button", { className: "opener", onClick: () => setShowFoodie(!showFoodie), children: showFoodie ? "CLOSE" : "OPEN" }), _jsx("h1", { className: "header", children: "Welcome to Foodie for React!" }), _jsx("input", { id: "textInput", type: "text", value: textSearch, onChange: handleChange }), _jsx("button", { onClick: () => fetchNearbyRestaurantsDummy(), disabled: textSearch.length === 0, children: "Find Food" }), loading ? (_jsx("p", { children: "Fetching Restuarants..." })) : (_jsxs(_Fragment, { children: [error ? _jsxs("p", { children: ["ERROR: ", error] }) : null, restaurants.length > 0 ? (_jsx("ul", { children: restaurants.map((restaurant, index) => (_jsxs("li", { onClick: () => getRestaurantInfoDummy(restaurant.place_id), children: [restaurant.name, " (", restaurant.rating, " based on", " ", restaurant.user_ratings_total, " reviews)"] }, index))) })) : (_jsx("p", { children: "No Results Found" }))] }))] }));
};
export default FoodieReact;
//# sourceMappingURL=index.js.map