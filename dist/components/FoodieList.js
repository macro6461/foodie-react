var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa6";
import SortOptions from "./SortOptions.js";
import Error from "./Error.js";
const FoodieList = _ref => {
  let {
    setCurrentRestaurant,
    hide,
    devPort,
    GMapsApiKey,
    radius,
    distanceToAndFromHaversine,
    latitude,
    longitude,
    setError,
    error
  } = _ref;
  const [textSearch, setTextSearch] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (latitude && longitude) {
      initFoodieReact();
    } else {
      setError("Geolocation Not Found.");
    }
  }, [latitude, longitude]);
  const initFoodieReact = () => {
    setError(null); // Clear previous errors if any
    fetchNearbyRestaurants();
  };
  const fetchNearbyRestaurants = (lat, long) => __awaiter(void 0, void 0, void 0, function* () {
    setLoading(true);
    let thisLat = lat || latitude;
    let thisLong = long || longitude;
    const URL = process.env.NODE_ENV === "development" ? "http://localhost:".concat(devPort, "/foodie/getAll?latitude=").concat(thisLat, "&longitude=").concat(thisLong, "&radius=").concat(radius, "&type=restaurant&keyword=").concat(encodeURIComponent(textSearch), "&key=").concat(GMapsApiKey) : "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=".concat(thisLat, ",").concat(thisLong, "&radius=").concat(radius, "&type=restaurant&keyword=").concat(encodeURIComponent(textSearch), "&key=").concat(GMapsApiKey);
    try {
      const response = yield fetch(URL);
      const data = yield response.json();
      if (data.status === "OK") {
        // Process the restaurant data here
        setLoading(false);
        addDistanceToResultsAndFilter(data.results);
      } else {
        setLoading(false);
        setError("Error fetching data: " + data.status);
        return false;
      }
    } catch (error) {
      setLoading(false);
      setError("Error fetching data: " + error);
      return false;
    }
  });
  const getRestaurantInfo = id => __awaiter(void 0, void 0, void 0, function* () {
    const URL = process.env.NODE_ENV === "development" ? "http://localhost:".concat(devPort, "/foodie/getRestaurant?place_id=").concat(id, "&key=").concat(GMapsApiKey) : "https://maps.googleapis.com/maps/api/place/details/json?place_id=".concat(id, "&key=").concat(GMapsApiKey);
    try {
      const response = yield fetch(URL);
      const data = yield response.json();
      if (data.status === "OK") {
        // Process the restaurant data here
        setLoading(false);
        setCurrentRestaurant(data.result);
      } else {
        setLoading(false);
        setError("Error fetching data: " + data.status);
        return false;
      }
    } catch (error) {
      setLoading(false);
      setError("Error fetching data: " + error);
      return false;
    }
  });
  const handleChange = e => {
    setTextSearch(e.target.value);
  };
  const addDistanceToResultsAndFilter = results => {
    let res = results.map(restaurant => {
      const {
        geometry,
        place_id
      } = restaurant;
      let {
        lat,
        lng
      } = geometry.location;
      let distance = distanceToAndFromHaversine({
        latitude,
        longitude
      }, {
        latitude: lat,
        longitude: lng
      }, place_id);
      restaurant.distance = distance;
      return restaurant;
    }).sort((a, b) => {
      if (a.distance < b.distance) {
        return -1;
      } else {
        return 1;
      }
    });
    setRestaurants(res);
  };
  const handleSort = sortType => {
    let res = [...restaurants];
    setRestaurants([]);
    res.sort((a, b) => {
      if (sortType === "distance") {
        return a[sortType] < b[sortType] ? -1 : 1;
      } else {
        return a[sortType] > b[sortType] ? -1 : 1;
      }
    });
    setRestaurants(res);
  };
  console.log("HIDE: ", hide);
  return _jsxs("div", {
    className: "foodieListContainer",
    style: {
      display: hide ? "none" : "block"
    },
    children: [_jsxs("div", {
      className: "foodieListHeader",
      children: [_jsx("input", {
        id: "textInput",
        type: "text",
        value: textSearch,
        onChange: handleChange
      }), _jsx("button", {
        onClick: () => fetchNearbyRestaurants(),
        disabled: textSearch.length === 0,
        children: "Find Food"
      }), _jsx(SortOptions, {
        handleSort: handleSort
      })]
    }), error ? _jsx(Error, {
      error: error
    }) : null, loading ? _jsx("p", {
      children: "Fetching Restuarants..."
    }) : _jsx("div", {
      children: restaurants.length > 0 ? _jsx("ul", {
        children: restaurants.map((restaurant, index) => {
          const {
            name,
            place_id,
            distance,
            rating
          } = restaurant;
          return _jsxs("li", {
            onClick: () => getRestaurantInfo(place_id),
            children: [_jsxs("p", {
              children: [" ", index + 1, ". ", name, " ", _jsxs("span", {
                className: "ratingStarContainer",
                children: [rating, " ", _jsx(FaStar, {
                  className: "ratingStar"
                })]
              })]
            }), _jsxs("p", {
              children: ["\u00A0\u00A0\u00A0", distance, " miles away"]
            })]
          }, index);
        })
      }) : _jsx("p", {
        children: "No Results Found"
      })
    })]
  });
};
export default FoodieList;