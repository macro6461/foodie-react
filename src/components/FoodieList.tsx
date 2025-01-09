import React, { useState, useEffect, useRef } from "react";
import { FoodieReactProps, FoodieRestaurant } from "../types";
import { LatLong } from "../types";
import { FaStar } from "react-icons/fa6";
import SortOptions from "./SortOptions";
import Error from "./Error";

interface FoodieListProps {
  setCurrentRestaurant: React.Dispatch<React.SetStateAction<FoodieRestaurant>>;
  distanceToAndFromHaversine: (
    start: LatLong,
    stop: LatLong,
    placeId: string
  ) => number;
  latitude: number | null;
  longitude: number | null;
  setError: React.Dispatch<React.SetStateAction<string>>;
  hide: boolean;
  error: string | null;
}

const FoodieList: React.FC<FoodieListProps & FoodieReactProps> = ({
  setCurrentRestaurant,
  hide,
  devPort,
  GMapsApiKey,
  radius,
  distanceToAndFromHaversine,
  latitude,
  longitude,
  setError,

  error,
}) => {
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
      fetchNearbyRestaurants()
  };

  const fetchNearbyRestaurants = async (lat?: number, long?: number) => {
    setLoading(true);
    let thisLat = lat || latitude;
    let thisLong = long || longitude;
    const URL =
      process.env.NODE_ENV === "development"
        ? `http://localhost:${devPort}/foodie/getAll?latitude=${thisLat}&longitude=${thisLong}&radius=${radius}&type=restaurant&keyword=${encodeURIComponent(
            textSearch
          )}&key=${GMapsApiKey}`
        : `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${thisLat},${thisLong}&radius=${radius}&type=restaurant&keyword=${encodeURIComponent(
            textSearch
          )}&key=${GMapsApiKey}`;

    try {
      const response = await fetch(URL);
      const data = await response.json();

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
  };

  const getRestaurantInfo = async (id: string) => {
    const URL =
      process.env.NODE_ENV === "development"
        ? `http://localhost:${devPort}/foodie/getRestaurant?place_id=${id}&key=${GMapsApiKey}`
        : `https://maps.googleapis.com/maps/api/place/details/json?place_id=${id}&key=${GMapsApiKey}`;

    try {
      const response = await fetch(URL);
      const data = await response.json();

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
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextSearch(e.target.value);
  };

  const addDistanceToResultsAndFilter = (results: FoodieRestaurant[]) => {
    let res = results
      .map((restaurant: FoodieRestaurant) => {
        const { geometry, place_id } = restaurant;
        let { lat, lng } = geometry.location;
        let distance = distanceToAndFromHaversine(
          { latitude, longitude },
          { latitude: lat, longitude: lng },
          place_id
        );
        restaurant.distance = distance;
        return restaurant;
      })
      .sort((a: FoodieRestaurant, b: FoodieRestaurant) => {
        if (a.distance < b.distance) {
          return -1;
        } else {
          return 1;
        }
      });
    setRestaurants(res);
  };

  const handleSort = (sortType: string) => {
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

  console.log("HIDE: ",hide);

  return (
    <div className="foodieListContainer" style={{display: hide ? "none" : "block"}}>
      <div className="foodieListHeader">
        <input
          id="textInput"
          type="text"
          value={textSearch}
          onChange={handleChange} // Listen for changes to the input value
        />
        <button
          onClick={() => fetchNearbyRestaurants()}
          disabled={textSearch.length === 0}
        >
          Find Food
        </button>
        <SortOptions handleSort={handleSort} />
      </div>
      {error ? <Error error={error} /> : null}
      {loading ? (
        <p>Fetching Restaurants...</p>
      ) : (
        <div>
          {restaurants.length > 0 ? (
            <ul>
              {restaurants.map((restaurant, index) => {
                const { name, place_id, distance, rating } = restaurant;
                return (
                  <li
                    key={index}
                    onClick={() => getRestaurantInfo(place_id)}
                  >
                    <p>
                      {" "}
                      {index + 1}. {name}{" "}
                      <span className="ratingStarContainer">
                        {rating} <FaStar className="ratingStar" />
                      </span>
                    </p>
                    <p>&nbsp;&nbsp;&nbsp;{distance} miles away</p>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>No Results Found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FoodieList;
