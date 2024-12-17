import React, { useEffect, useState, useRef } from "react";
import "./index.css";
import { FoodieReactProps, FoodieRestaurant, LatLong } from "./types";
import Restaurant from "./components/Restaurant";
import FoodieList from "./components/FoodieList";
import Splash from "./components/Splash";
import { FaPizzaSlice } from "react-icons/fa6";

const FoodieReact: React.FC<FoodieReactProps> = ({
  GMapsApiKey,
  radius = 10000,
  autoStart = false,
  devPort = 8080,
}) => {
  const [currentRestaurant, setCurrentRestaurant] =
    useState<FoodieRestaurant | null>(null);
  const [showFoodie, setShowFoodie] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  const [latitude, setLatitude] = useState(37.7749); // default to NYC
  const [longitude, setLongitude] = useState(-122.4194); // default to NYC
  const [error, setError] = useState(null);
  // Ref to store the map
  const distanceMap = useRef<object>({});
  const heightRef = useRef<number>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      return navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setError(null); // Clear previous errors if any
        },
        (err) => {
          setError("Failed to fetch location. " + err);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }, []);

  useEffect(() => {
    handleHeight();
  }, [window.innerHeight]);

  useEffect(() => {
    if (showFoodie) {
      runSplash();
    }
  }, [showFoodie]);

  const handleHeight = () => {
    let height = window.innerHeight - 20;
    let cont = document.getElementsByClassName("container")[0] as HTMLElement;
    if (cont) {
      cont.style.height = `${height}px`;
      heightRef.current = height;
    }
  };

  const runSplash = () => {
    setShowSplash(true);
    setTimeout(() => {
      setShowSplash(false);
      handleHeight();
    }, 6000);
  };

  const toRadians = (degrees: number): number => {
    return degrees * (Math.PI / 180);
  };

  const distanceToAndFromHaversine = (
    start: LatLong,
    stop: LatLong,
    placeId: string
  ): number => {
    const R = 3958.8; // Radius of the Earth in miles

    const dLat = toRadians(stop.latitude - start.latitude);
    const dLon = toRadians(stop.longitude - start.longitude);

    const radLat1 = toRadians(start.latitude);
    const radLat2 = toRadians(stop.longitude);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(radLat1) *
        Math.cos(radLat2) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Update distanceMap here so we don't have to later.

    // distanceMap is stored in useRef so it doesn't trigger a re-render everytime we add a distance references
    let map = distanceMap.current;
    map[placeId] = (R * c).toFixed(2);

    return parseFloat((R * c).toFixed(2));
  };

  let containerName = "container ";

  containerName += showFoodie ? "visible" : "hidden";

  return (
    <div className={containerName}>
      <FaPizzaSlice
        className="opener"
        onClick={() => setShowFoodie(!showFoodie)}
      />
      {showSplash ? (
        <Splash />
      ) : (
        <>
          {error ? (
            <h3 style={{ color: "red" }}>{error}</h3>
          ) : (
            <>
              {currentRestaurant ? (
                <Restaurant
                  restaurant={currentRestaurant}
                  close={() => setCurrentRestaurant(null)}
                  distanceMap={distanceMap.current}
                  height={heightRef.current}
                />
              ) : (
                <FoodieList
                  GMapsApiKey={GMapsApiKey}
                  radius={radius}
                  autoStart={autoStart}
                  devPort={devPort}
                  setCurrentRestaurant={setCurrentRestaurant}
                  currentRestaurant={currentRestaurant}
                  distanceToAndFromHaversine={distanceToAndFromHaversine}
                  setError={setError}
                  latitude={latitude}
                  longitude={longitude}
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default FoodieReact;
