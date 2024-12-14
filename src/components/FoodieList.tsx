import React, { useState, useEffect } from "react";
import { FoodieReactProps, FoodieRestaurant } from "../types";
import { LatLong, GoogleLatLong } from "../types";
import dummyData from "../dummy.json";
import SortOptions from "./SortOptions";

interface FoodieListProps {
  setCurrentRestaurant: React.Dispatch<React.SetStateAction<FoodieRestaurant>>;
  currentRestaurant: FoodieRestaurant;
  distanceToAndFromHaversine: (
    start: LatLong,
    stop: LatLong,
    placeId: string
  ) => number;
  latitude: number;
  longitude: number;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

const FoodieList: React.FC<FoodieListProps & FoodieReactProps> = ({
  setCurrentRestaurant,
  autoStart,
  devPort,
  GMapsApiKey,
  radius,
  distanceToAndFromHaversine,
  latitude,
  longitude,
  setError,
}) => {
  const [textSearch, setTextSearch] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initFoodieReact();
  }, [latitude, longitude]);

  const initFoodieReact = () => {
    if (latitude && longitude) {
      setError(null); // Clear previous errors if any
      if (autoStart) {
        fetchNearbyRestaurantsDummy();
      }
    } else {
      setError("Geolocation Not Found.");
    }
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
        ? `http://localhost:${devPort}/foodie/getRestaurant?place/details/json?placeid=${id}}&key=${GMapsApiKey}`
        : `https://maps.googleapis.com/maps/api/place/details/json?placeid=${id}}&key=${GMapsApiKey}`;

    try {
      const response = await fetch(URL);
      const data = await response.json();

      if (data.status === "OK") {
        // Process the restaurant data here
        setLoading(false);
        setCurrentRestaurant(data); // This will contain the list of nearby restaurants
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
    addDistanceToResultsAndFilter(
      dummyData.all_restuarants.results as unknown as FoodieRestaurant[]
    );
    setLoading(false);
  };

  const getRestaurantInfoDummy = async (id: string) => {
    setCurrentRestaurant(
      dummyData.restuarant_result.result as unknown as FoodieRestaurant
    );
    setLoading(false);
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
        return a[sortType] < b[sortType] ? -1 : 1;
      }
    });
    setRestaurants(res);
  };

  console.log("RESTAURANTS: ", restaurants);

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
      <SortOptions handleSort={handleSort} />
      {loading ? (
        <p>Fetching Restuarants...</p>
      ) : (
        <>
          {restaurants.length > 0 ? (
            <ul>
              {restaurants.map((restaurant, index) => {
                const { name, place_id, distance, rating } = restaurant;
                return (
                  <li
                    key={index}
                    onClick={() => getRestaurantInfoDummy(place_id)}
                  >
                    {name} ({distance} miles away) {rating}
                  </li>
                );
              })}
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
