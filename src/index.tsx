import React, { useEffect, useState } from "react";

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

// Define the type for the props
interface FoodieReactProps {
  GMapsApiKey: string; // Prop is required and must be a string
  radius?: number;
  autoStart?: boolean;
  environment: string;
}

const FoodieReact: React.FC<FoodieReactProps> = ({
  GMapsApiKey,
  radius = 10000,
  autoStart = false,
  environment,
}) => {
  const [latitude, setLatitude] = useState(37.7749);
  const [longitude, setLongitude] = useState(-122.4194);
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initFoodieReact();
  }, []);

  const insertJsScriptElement = () => {
    const existingScript = document.querySelector(
      `script[src^="https://maps.googleapis.com/maps/api/js?key=${GMapsApiKey}&libraries=places"]`
    );
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
    } else {
      initFoodieReact();
    }
  };

  const initFoodieReact = () => {
    if (navigator.geolocation) {
      return navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setError(null); // Clear previous errors if any
          fetchNearbyRestaurants(latitude, longitude);
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

  const fetchNearbyRestaurants = async (latitude, longitude) => {
    const URL =
      environment === "development"
        ? `http://localhost:8080/api/nearbyRestaurants?latitude=${latitude}&longitude=${longitude}&radius=${radius}&apiKey=${GMapsApiKey}`
        : `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=restaurant&key=${GMapsApiKey}`;

    try {
      debugger;
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

  return (
    <div style={FoodieStyles.container}>
      <h1 style={FoodieStyles.heading}>Welcome to Foodie for React!</h1>
      {loading ? (
        <p>Fetching Restuarants...</p>
      ) : (
        <>
          {error ? <p>ERROR: {error}</p> : null}
          {restaurants.length > 0 ? (
            <ul>
              {restaurants.map((restaurant, index) => (
                <li key={index}>{restaurant.name}</li>
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

export default FoodieReact;
