import React, { useState, useEffect } from "react";
import { FoodieReactProps, FoodieRestaurant } from "./types";
import dummyData from "./dummy.json";

interface FoodieListProps {
  setCurrentRestaurant: React.Dispatch<React.SetStateAction<FoodieRestaurant>>;
  currentRestaurant: FoodieRestaurant;
}

const FoodieList: React.FC<FoodieListProps & FoodieReactProps> = ({
  setCurrentRestaurant,
  currentRestaurant,
  autoStart,
  port,
  GMapsApiKey,
  radius,
}) => {
  const [textSearch, setTextSearch] = useState("");
  const [latitude, setLatitude] = useState(37.7749);
  const [longitude, setLongitude] = useState(-122.4194);
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initFoodieReact();
  }, []);

  const initFoodieReact = () => {
    if (navigator.geolocation) {
      return navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setError(null); // Clear previous errors if any
          if (autoStart) {
            fetchNearbyRestaurantsDummy(
              position.coords.latitude,
              position.coords.longitude
            );
          }
        },
        (err) => {
          setLoading(false);
          setError("Failed to fetch location. " + err);
          return false;
        }
      );
    } else {
      setLoading(false);
      setError("Geolocation is not supported by your browser.");
      return false;
    }
  };

  const fetchNearbyRestaurants = async (lat?: number, long?: number) => {
    setLoading(true);
    let thisLat = lat || latitude;
    let thisLong = long || longitude;
    const URL =
      process.env.NODE_ENV === "development"
        ? `http://localhost:${port}/foodie/getAll?latitude=${thisLat}&longitude=${thisLong}&radius=${radius}&type=restaurant&keyword=${encodeURIComponent(
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
        setRestaurants(data.results); // This will contain the list of nearby restaurants
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
        ? `http://localhost:${port}/foodie/getRestaurant?place/details/json?placeid=${id}}&key=${GMapsApiKey}`
        : `https://maps.googleapis.com/maps/api/place/details/json?placeid=${id}}&key=${GMapsApiKey}`;

    try {
      const response = await fetch(URL);
      const data = await response.json();

      if (data.status === "OK") {
        // Process the restaurant data here
        setLoading(false);
        setRestaurants(data.results); // This will contain the list of nearby restaurants
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

  const fetchNearbyRestaurantsDummy = async (lat?: number, long?: number) => {
    setRestaurants(dummyData.all_restuarants.results);
    setLoading(false);
  };

  const getRestaurantInfoDummy = async (id: string) => {
    console.log(dummyData.restuarant_result.result);
    setCurrentRestaurant(
      dummyData.restuarant_result.result as unknown as FoodieRestaurant
    );
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextSearch(e.target.value);
  };
  return (
    <div>
      <input
        id="textInput"
        type="text"
        value={textSearch}
        onChange={handleChange} // Listen for changes to the input value
      />
      <button
        onClick={() => fetchNearbyRestaurantsDummy()}
        disabled={textSearch.length === 0}
      >
        Find Food
      </button>
      {loading ? (
        <p>Fetching Restuarants...</p>
      ) : (
        <>
          {error ? <p>ERROR: {error}</p> : null}
          {restaurants.length > 0 ? (
            <ul>
              {restaurants.map((restaurant, index) => (
                <li
                  key={index}
                  onClick={() => getRestaurantInfoDummy(restaurant.place_id)}
                >
                  {restaurant.name} ({restaurant.rating} based on{" "}
                  {restaurant.user_ratings_total} reviews)
                </li>
              ))}
            </ul>
          ) : (
            <p>No Results Found</p>
          )}
        </>
      )}
    </div>
  );
};

export default FoodieList;
